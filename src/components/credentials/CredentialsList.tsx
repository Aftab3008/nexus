"use client";

import { useSuspenseCredentials } from "@/hooks/credentials/use-credentials";
import { EntityList } from "../shared/entity-components";
import { Credential } from "@/generated/prisma/client";
import { CredentialItem } from "./CredentialItem";
import { CredentialsEmpty } from "./CredentialsEmpty";

export const CredentialsList = () => {
  const [data] = useSuspenseCredentials();

  return (
    <EntityList
      items={data.items}
      getKey={(credential: Credential) => credential.id}
      renderItem={(credential: Credential) => (
        <CredentialItem data={credential} />
      )}
      emptyView={<CredentialsEmpty />}
    />
  );
};
