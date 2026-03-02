import { Suspense } from "react";
import { SearchParams } from "nuqs";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient, trpc } from "@/trpc/server";
import { executionsParamsLoader } from "@/lib/params-server";
import { ExecutionsContainer } from "@/components/executions/ExecutionsContainer";
import { ExecutionsError } from "@/components/executions/ExecutionsError";
import { ExecutionsList } from "@/components/executions/ExecutionsList";
import { ExecutionsLoading } from "@/components/executions/ExecutionsLoading";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Executions = async ({ searchParams }: Props) => {
  const params = await executionsParamsLoader(searchParams);
  void trpc.executions.getExecutions.prefetch(params);

  return (
    <ExecutionsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<ExecutionsError />}>
          <Suspense fallback={<ExecutionsLoading />}>
            <ExecutionsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </ExecutionsContainer>
  );
};

export default Executions;
