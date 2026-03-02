"use client";

import { useSuspenseExecutions } from "@/hooks/executions/use-executions";
import { EntityList } from "../shared/entity-components";
import { Executions } from "@/generated/prisma/client";
import { ExecutionItem } from "./ExecutionItem";
import { ExecutionsEmpty } from "./ExecutionsEmpty";

export const ExecutionsList = () => {
  const [data] = useSuspenseExecutions();

  return (
    <EntityList
      items={data.items}
      getKey={(
        execution: Executions & { workflow: { id: string; name: string } },
      ) => execution.id}
      renderItem={(
        execution: Executions & { workflow: { id: string; name: string } },
      ) => <ExecutionItem data={execution} />}
      emptyView={<ExecutionsEmpty />}
    />
  );
};
