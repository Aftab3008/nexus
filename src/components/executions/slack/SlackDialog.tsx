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
import { SlackFormSchema, SlackFormTypes } from "@/lib/schema/slack.schema";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: SlackFormTypes) => void;
  defaultValues?: Partial<SlackFormTypes>;
}

export const SlackDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<SlackFormTypes>({
    resolver: zodResolver(SlackFormSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      content: defaultValues.content || "",
      webhookUrl: defaultValues.webhookUrl || "",
    },
  });

  // Reset form values when dialog opens with new defaults
  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        content: defaultValues.content || "",
        webhookUrl: defaultValues.webhookUrl || "",
      });
    }
  }, [defaultValues, form, open]);

  const formVariableName = form.watch("variableName") || "mySlack";

  const handleSubmit = (values: SlackFormTypes) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Slack Configuration</DialogTitle>
          <DialogDescription>
            Configure the Slack webhook settings for this node.
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
                  placeholder="mySlack"
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
                  placeholder="https://hooks.slack.com/services/..."
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Get this from Slack: Workspace Settings &rarr; Workflows
                  &rarr; Webhooks
                </FieldDescription>
                <FieldDescription>
                  Ensure your Slack webhook is configured to accept a
                  &quot;content&quot; variable in the workflow settings
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
          <DialogFooter className="mt-4">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
