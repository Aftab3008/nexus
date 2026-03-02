import z from "zod";

export const SlackFormSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter, underscore, or dollar sign and contain only letters, numbers, underscores, or dollar signs",
    }),
  content: z
    .string()
    .min(1, "Message content is required")
    .max(4000, "Slack messages cannot exceed 4000 characters"),
  webhookUrl: z.string().min(1, "Webhook URL is required"),
});

export type SlackFormTypes = z.infer<typeof SlackFormSchema>;
