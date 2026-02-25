import { trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient } from "@/trpc/server";
import { EditorError } from "@/components/workflowId/editor/EditorError";
import { EditorLoading } from "@/components/workflowId/editor/EditorLoading";
import Editor from "@/components/workflowId/editor/Editor";
import { EditorHeader } from "@/components/workflowId/editor/EditorHeader";

interface Props {
  params: Promise<{ workflowId: string }>;
}

export default async function page({ params }: Props) {
  const { workflowId } = await params;

  void trpc.workflows.getWorkflowById.prefetch({
    id: workflowId,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
