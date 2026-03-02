import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";
import { NodeExecutor } from "@/types/executions.types";
import Handlebars from "handlebars";

Handlebars.registerHelper("json", (value) => {
  const jsonString = JSON.stringify(value, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type StripeTriggerData = Record<string, unknown>;

export const stripeTriggerExecutor: NodeExecutor<StripeTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(stripeTriggerChannel().status({ nodeId, status: "loading" }));

  const result = await step.run("stripe-trigger", async () => context);

  await publish(stripeTriggerChannel().status({ nodeId, status: "success" }));

  return result;
};
