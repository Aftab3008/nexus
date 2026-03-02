"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DiscordFormSchema,
  DiscordFormTypes,
} from "@/lib/schema/discord.schema";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: DiscordFormTypes) => void;
  defaultValues?: Partial<DiscordFormTypes>;
}

export const DiscordDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<DiscordFormTypes>({
    resolver: zodResolver(DiscordFormSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      username: defaultValues.username || "",
      content: defaultValues.content || "",
      webhookUrl: defaultValues.webhookUrl || "",
    },
  });

  // Reset form values when dialog opens with new defaults
  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        username: defaultValues.username || "",
        content: defaultValues.content || "",
        webhookUrl: defaultValues.webhookUrl || "",
      });
    }
  }, [defaultValues, form, open]);

  const formVariableName = form.watch("variableName") || "myDiscord";

  const handleSubmit = (values: DiscordFormTypes) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discord Configuration</DialogTitle>
          <DialogDescription>
            Configure the Discord webhook settings for this node.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-4 space-y-8"
        >
          <Controller
            control={form.control}
            name="variableName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Variable Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="myDiscord"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Use this name to reference the result in the other nodes:{" "}
                  {`{{${formVariableName}.text}}`}
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="webhookUrl"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Webhook URL</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="https://discord.com/api/webhooks/..."
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Get this from Discord: Channel Settings &rarr; Integrations
                  &rarr; Webhooks
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Message Content</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Summary {{myGemini.text}}"
                  className="min-h-[80px] font-mono text-sm"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  The message to send. Use {"{{variables}}"} for simple values
                  or {"{{json variable}}"} to stringify objects
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Bot Username (Optional)
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Workflow Bot"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Override the webhook&apos;s default username
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <DialogFooter className="mt-4">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
