"use client";

import { EntityContainer } from "../shared/entity-components";
import { ExecutionsHeader } from "./ExecutionsHeader";
import { ExecutionsPagination } from "./ExecutionsPagination";

export const ExecutionsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<ExecutionsHeader />}
      pagination={<ExecutionsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
