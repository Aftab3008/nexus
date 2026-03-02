import { CredentialType } from "@/generated/prisma/enums";
import z from "zod";

export const CredentialFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(CredentialType),
  value: z.string().min(1, "API key is required"),
});

export type CredentialFormTypes = z.infer<typeof CredentialFormSchema>;
