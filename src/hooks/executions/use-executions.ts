import { trpc } from "@/components/providers/QueryProvider";
import { useExecutionsParams } from "./use-execution-params";

/**
 * Hook to fetch all executions using suspense
 */
export const useSuspenseExecutions = () => {
  const [params] = useExecutionsParams();

  return trpc.executions.getExecutions.useSuspenseQuery(params);
};

/**
 * Hook to fetch a single execution using suspense
 */
export const useSuspenseExecution = (id: string) => {
  return trpc.executions.getExecutionById.useSuspenseQuery({ id });
};
