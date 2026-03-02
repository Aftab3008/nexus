import { AnthropicNode } from "@/components/executions/anthropic/node";
import { DiscordNode } from "@/components/executions/discord/node";
import { GeminiNode } from "@/components/executions/gemini/node";
import { HttpRequestNode } from "@/components/executions/http-request/node";
import { OpenAiNode } from "@/components/executions/open-ai/node";
import { SlackNode } from "@/components/executions/slack/node";
import { InitialNode } from "@/components/nodes/InitialNode";
import { GoogleFormTriggerNode } from "@/components/triggers/google-form-trigger/node";
import { ManualTriggerNode } from "@/components/triggers/manual-trigger/node";
import { StripeTriggerNode } from "@/components/triggers/stripe-trigger/node";
import { NodeType } from "@/generated/prisma/enums";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.OPENAI]: OpenAiNode,
  [NodeType.ANTHROPIC]: AnthropicNode,
  [NodeType.DISCORD]: DiscordNode,
  [NodeType.SLACK]: SlackNode,
} as const satisfies NodeTypes;

export type RegisteredNodeTypes = keyof typeof nodeComponents;
