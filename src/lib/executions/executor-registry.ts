import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "@/types/executions.types";
import { initialExecutor } from "./initial.executor";
import { httpRequestExecutor } from "./http-request.executor";
import { manualTriggerExecutor } from "./manual-trigger.executor";
import { googleFormTriggerExecutor } from "./google-form.executor";
import { stripeTriggerExecutor } from "./stripe-trigger.executor";
import { anthropicExecutor } from "./anthropic.executor";
import { discordExecutor } from "./discord.executor";
import { slackExecutor } from "./slack.executor";

export const executorRegistry = new Map<NodeType, NodeExecutor<any>>([
  [NodeType.INITIAL, initialExecutor],
  [NodeType.HTTP_REQUEST, httpRequestExecutor],
  [NodeType.MANUAL_TRIGGER, manualTriggerExecutor],
  [NodeType.GOOGLE_FORM_TRIGGER, googleFormTriggerExecutor],
  [NodeType.STRIPE_TRIGGER, stripeTriggerExecutor],
  [NodeType.ANTHROPIC, anthropicExecutor],
  [NodeType.DISCORD, discordExecutor],
  [NodeType.SLACK, slackExecutor],
]);

export const getExecutor = (nodeType: NodeType): NodeExecutor<any> => {
  const executor = executorRegistry.get(nodeType);

  if (!executor) {
    throw new Error(`No executor found for node type ${nodeType}`);
  }

  return executor;
};
