import { trpc } from "@/components/providers/QueryProvider";
import { useWorkflowsParams } from "./use-workflows-params";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
  const [params] = useWorkflowsParams();
  return trpc.workflows.getWorkflows.useSuspenseQuery(params);
};

export const useCreateWorkflow = () => {
  const utils = trpc.useUtils();
  return trpc.workflows.createWorkflow.useMutation({
    onSuccess: () => {
      toast.success("Workflow created successfully");
      void utils.workflows.getWorkflows.invalidate();
    },
    onError: () => {
      toast.error("Failed to create workflow");
    },
  });
};

export const useRemoveWorkflow = () => {
  const utils = trpc.useUtils();
  return trpc.workflows.removeWorkflow.useMutation({
    onSuccess: () => {
      toast.success("Workflow removed successfully");
      void utils.workflows.getWorkflows.invalidate();
    },
    onError: () => {
      toast.error("Failed to remove workflow");
    },
  });
};

export const useWorkflowById = (workflowId: string) => {
  return trpc.workflows.getWorkflowById.useSuspenseQuery({ id: workflowId });
};

export const useUpdateWorkflowName = () => {
  const utils = trpc.useUtils();
  return trpc.workflows.updateName.useMutation({
    onSuccess: (_, variables) => {
      toast.success("Workflow name updated successfully");
      void utils.workflows.getWorkflowById.invalidate({ id: variables.id });
      void utils.workflows.getWorkflows.invalidate();
    },
    onError: () => {
      toast.error("Failed to update workflow name");
    },
  });
};
