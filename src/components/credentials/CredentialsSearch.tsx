"use client";

import { useEntitySearch } from "@/hooks/use-entity-search";
import { useCredentialsParams } from "@/hooks/credentials/use-credentials-params";
import { EntitySearch } from "../shared/entity-components";

export const CredentialsSearch = () => {
  const [params, setParams] = useCredentialsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search credentials"
    />
  );
};
