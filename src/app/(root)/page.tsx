"use client";

import { trpc } from "@/components/providers/QueryProvider";
import { Button } from "@/components/ui/button";

export default function Home() {
  const utils = trpc.useUtils();
  const workflows = trpc.workflowRouter.getWorkflow.useQuery();
  const createWorkflow = trpc.workflowRouter.createWorkflow.useMutation({
    onSuccess: () => {
      utils.workflowRouter.getWorkflow.invalidate();
    },
  });
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      {workflows.data?.map((workflow: any) => (
        <div key={workflow.id}>{JSON.stringify(workflow)}</div>
      ))}
      <Button
        onClick={() => createWorkflow.mutate()}
        disabled={createWorkflow.isPending}
      >
        {createWorkflow.isPending ? "Creating..." : "Create Workflow"}
      </Button>
    </div>
  );
}
