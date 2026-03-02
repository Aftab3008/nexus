import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "@/types/executions.types";
import {
  googleFormTriggerExecutor,
  httpRequestExecutor,
  initialExecutor,
  manualTriggerExecutor,
  stripeTriggerExecutor,
} from "./executor";

export const executorRegistry = new Map<NodeType, NodeExecutor<any>>([
  [NodeType.INITIAL, initialExecutor],
  [NodeType.HTTP_REQUEST, httpRequestExecutor],
  [NodeType.MANUAL_TRIGGER, manualTriggerExecutor],
  [NodeType.GOOGLE_FORM_TRIGGER, googleFormTriggerExecutor],
  [NodeType.STRIPE_TRIGGER, stripeTriggerExecutor],
]);

export const getExecutor = (nodeType: NodeType): NodeExecutor<any> => {
  const executor = executorRegistry.get(nodeType);

  if (!executor) {
    throw new Error(`No executor found for node type ${nodeType}`);
  }

  return executor;
};
