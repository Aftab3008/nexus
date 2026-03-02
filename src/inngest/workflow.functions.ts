import db from "@/lib/db/db";
import { getExecutor } from "@/lib/executions/executor-registry";
import { NonRetriableError } from "inngest";
import { anthropicChannel } from "./channels/anthropic";
import { geminiChannel } from "./channels/gemini";
import { googleFormTriggerChannel } from "./channels/google-form-trigger";
import { httpRequestChannel } from "./channels/http-request";
import { manualTriggerChannel } from "./channels/manual-trigger";
import { openAiChannel } from "./channels/openai";
import { stripeTriggerChannel } from "./channels/stripe-trigger";
import { inngest } from "./client";
import { getSortedNodes } from "./utils";
import { discordChannel } from "./channels/discord";
import { slackChannel } from "./channels/slack";
import { ExecutionStatus } from "@/generated/prisma/enums";

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    retries: process.env.NODE_ENV === "production" ? 3 : 0,
    onFailure: async ({ event }) => {
      return db.executions.update({
        where: { inngestEventId: event.data.event.id },
        data: {
          status: ExecutionStatus.FAILED,
          error: event.data.error.message,
          errorStack: event.data.error.stack,
        },
      });
    },
  },
  {
    event: "workflows/execute.workflow",
    channels: [
      httpRequestChannel(),
      manualTriggerChannel(),
      googleFormTriggerChannel(),
      stripeTriggerChannel(),
      geminiChannel(),
      openAiChannel(),
      anthropicChannel(),
      discordChannel(),
      slackChannel(),
    ],
  },
  async ({ event, step, publish }) => {
    const inngestEventId = event.id;
    const workflowId = event.data.workflowId;

    if (!inngestEventId || !workflowId) {
      throw new NonRetriableError("Event ID or Workflow ID is missing");
    }

    await step.run("create-execution", async () => {
      return db.executions.create({ data: { workflowId, inngestEventId } });
    });

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await db.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      if (!workflow) {
        throw new NonRetriableError("Workflow not found");
      }

      return getSortedNodes(workflow.nodes, workflow.connections);
    });

    const userId = await step.run("find-user-id", async () => {
      const workflow = await db.workflow.findUniqueOrThrow({
        where: { id: workflowId },
        select: { userId: true },
      });

      return workflow.userId;
    });

    let context = event.data.initialData || {};

    for (const node of sortedNodes) {
      const executor = getExecutor(node.type);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
        userId,
        publish,
      });
    }

    await step.run("update-execution", async () => {
      return db.executions.update({
        where: { inngestEventId, workflowId },
        data: {
          status: ExecutionStatus.SUCCESS,
          completedAt: new Date(),
          output: context,
        },
      });
    });

    return { workflowId, result: context };
  },
);
