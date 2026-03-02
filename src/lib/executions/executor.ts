import { NodeExecutor } from "@/types/executions.types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";
import Handlebars from "handlebars";
import { httpRequestChannel } from "@/inngest/channels/http-request";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";

Handlebars.registerHelper("json", (value) => {
  const jsonString = JSON.stringify(value, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type ManualTriggerData = Record<string, unknown>;
type GoogleFormTriggerData = Record<string, unknown>;

type HttpRequestData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

type InitialData = Record<string, unknown>;
type StripeTriggerData = Record<string, unknown>;

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

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(httpRequestChannel().status({ nodeId, status: "loading" }));

  try {
    const result = await step.run("http-request", async () => {
      if (!data.endpoint) {
        await publish(httpRequestChannel().status({ nodeId, status: "error" }));
        throw new NonRetriableError(
          "HTTP Request node: No endpoint configured",
        );
      }

      if (!data.variableName) {
        await publish(httpRequestChannel().status({ nodeId, status: "error" }));
        throw new NonRetriableError("Variable name not configured");
      }

      if (!data.method) {
        await publish(httpRequestChannel().status({ nodeId, status: "error" }));
        throw new NonRetriableError("Method not configured");
      }

      const endpoint = Handlebars.compile(data.endpoint)(context);
      const method = data.method;

      const options: KyOptions = { method };

      if (["POST", "PUT", "PATCH"].includes(method)) {
        const resolved = Handlebars.compile(data.body || "{}")(context);
        JSON.parse(resolved);
        options.body = resolved;
        options.headers = {
          "Content-Type": "application/json",
        };
      }

      const response = await ky(endpoint, options);
      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      const responsePayload = {
        httpResponse: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        },
      };

      return { ...context, [data.variableName]: responsePayload };
    });

    await publish(httpRequestChannel().status({ nodeId, status: "success" }));

    return result;
  } catch (error) {
    await publish(httpRequestChannel().status({ nodeId, status: "error" }));
    throw error;
  }
};

export const initialExecutor: NodeExecutor<InitialData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  const result = await step.run("initial", async () => context);

  return result;
};

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
