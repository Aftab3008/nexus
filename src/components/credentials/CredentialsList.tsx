"use client";

import { useSuspenseCredentials } from "@/hooks/credentials/use-credentials";
import { EntityList } from "../shared/entity-components";
import { CredentialItem } from "./CredentialItem";
import { CredentialsEmpty } from "./CredentialsEmpty";

type CredentialData = ReturnType<
  typeof useSuspenseCredentials
>[0]["items"][number];

export const CredentialsList = () => {
  const [data] = useSuspenseCredentials();

  return (
    <EntityList
      items={data.items}
      getKey={(credential: CredentialData) => credential.id}
      renderItem={(credential: CredentialData) => (
        <CredentialItem data={credential} />
      )}
      emptyView={<CredentialsEmpty />}
    />
  );
};
