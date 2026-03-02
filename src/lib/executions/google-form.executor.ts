import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";
import { NodeExecutor } from "@/types/executions.types";
import Handlebars from "handlebars";

Handlebars.registerHelper("json", (value) => {
  const jsonString = JSON.stringify(value, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type GoogleFormTriggerData = Record<string, unknown>;

export const googleFormTriggerExecutor: NodeExecutor<
  GoogleFormTriggerData
> = async ({ nodeId, context, step, publish }) => {
  await publish(
    googleFormTriggerChannel().status({ nodeId, status: "loading" }),
  );

  const result = await step.run("google-form-trigger", async () => context);

  await publish(
    googleFormTriggerChannel().status({ nodeId, status: "success" }),
  );

  return result;
};
