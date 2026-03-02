"use client";

import { useSuspenseExecutions } from "@/hooks/executions/use-executions";
import { useExecutionsParams } from "@/hooks/executions/use-execution-params";
import { EntityPagination } from "../shared/entity-components";

export const ExecutionsPagination = () => {
  const [data] = useSuspenseExecutions();
  const [params, setParams] = useExecutionsParams();

  if (data.totalCount <= 0) return null;

  return (
    <EntityPagination
      totalPages={data.totalPages}
      page={data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};
