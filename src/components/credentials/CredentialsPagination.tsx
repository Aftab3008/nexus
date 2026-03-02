"use client";

import { useSuspenseCredentials } from "@/hooks/credentials/use-credentials";
import { useCredentialsParams } from "@/hooks/credentials/use-credentials-params";
import { EntityPagination } from "../shared/entity-components";

export const CredentialsPagination = () => {
  const [data] = useSuspenseCredentials();
  const [params, setParams] = useCredentialsParams();

  if (data.totalCount <= 0) return null;

  return (
    <EntityPagination
      totalPages={data.totalPages}
      page={data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};
