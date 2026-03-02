import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient, trpc } from "@/trpc/server";
import { ExecutionsError } from "@/components/executions/ExecutionsError";
import { ExecutionsLoading } from "@/components/executions/ExecutionsLoading";
import { ExecutionView } from "@/components/executions/ExecutionView";
interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { executionId } = await params;
  void trpc.executions.getExecutionById.prefetch({ id: executionId });

  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="flex flex-col w-full h-full max-w-3xl mx-auto gap-y-8">
        <HydrateClient>
          <ErrorBoundary fallback={<ExecutionsError />}>
            <Suspense fallback={<ExecutionsLoading />}>
              <ExecutionView executionId={executionId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  );
};

export default Page;
