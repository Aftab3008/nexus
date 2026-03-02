import { trpc } from "@/components/providers/QueryProvider";
import { useCredentialsParams } from "./use-credentials-params";
import { toast } from "sonner";
import { CredentialType } from "@/generated/prisma/enums";

export const useSuspenseCredentials = () => {
  const [params] = useCredentialsParams();
  return trpc.credentials.getCredentials.useSuspenseQuery(params);
};

export const useCreateCredential = () => {
  const utils = trpc.useUtils();
  return trpc.credentials.createCredential.useMutation({
    onSuccess: () => {
      toast.success("Credential created successfully");
      void utils.credentials.getCredentials.invalidate();
    },
    onError: () => {
      toast.error("Failed to create workflow");
    },
  });
};

export const useRemoveCredential = () => {
  const utils = trpc.useUtils();
  return trpc.credentials.removeCredential.useMutation({
    onSuccess: () => {
      toast.success("Credential removed successfully");
      void utils.credentials.getCredentials.invalidate();
    },
    onError: () => {
      toast.error("Failed to remove credential");
    },
  });
};

export const useCredentialById = (credentialId: string) => {
  return trpc.credentials.getCredentialById.useSuspenseQuery({
    id: credentialId,
  });
};

export const useUpdateCredential = () => {
  const utils = trpc.useUtils();
  return trpc.credentials.updateCredential.useMutation({
    onSuccess: (data) => {
      toast.success("Workflow name updated successfully");
      void utils.workflows.getWorkflowById.invalidate({ id: data.id });
      void utils.workflows.getWorkflows.invalidate();
    },
    onError: () => {
      toast.error("Failed to update workflow name");
    },
  });
};

export const useUpdateCredentialById = () => {
  const utils = trpc.useUtils();

  return trpc.credentials.updateCredential.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.name} saved successfully`);
      void utils.credentials.getCredentials.invalidate();
      void utils.credentials.getCredentialById.invalidate({ id: data.id });
    },
    onError: (error) => {
      toast.error(`Failed to save: ${error.message}`);
    },
  });
};

export const useCredentialsByType = (type: CredentialType) => {
  return trpc.credentials.getCredentialsByType.useQuery({ type });
};
