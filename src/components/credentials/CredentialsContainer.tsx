"use client";

import { EntityContainer } from "../shared/entity-components";
import { CredentialsHeader } from "./CredentialsHeader";
import { CredentialsPagination } from "./CredentialsPagination";
import { CredentialsSearch } from "./CredentialsSearch";

export const CredentialsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<CredentialsHeader />}
      search={<CredentialsSearch />}
      pagination={<CredentialsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
