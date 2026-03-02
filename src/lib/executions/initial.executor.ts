import { NodeExecutor } from "@/types/executions.types";
import Handlebars from "handlebars";

Handlebars.registerHelper("json", (value) => {
  const jsonString = JSON.stringify(value, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type InitialData = Record<string, unknown>;

export const initialExecutor: NodeExecutor<InitialData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  const result = await step.run("initial", async () => context);

  return result;
};
