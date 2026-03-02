import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";
import { NodeExecutor } from "@/types/executions.types";
import Handlebars from "handlebars";

Handlebars.registerHelper("json", (value) => {
  const jsonString = JSON.stringify(value, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(manualTriggerChannel().status({ nodeId, status: "loading" }));

  const result = await step.run("manual-trigger", async () => context);

  await publish(manualTriggerChannel().status({ nodeId, status: "success" }));

  return result;
};
