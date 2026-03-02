import { Suspense } from "react";
import { SearchParams } from "nuqs";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient, trpc } from "@/trpc/server";
import { CredentialsContainer } from "@/components/credentials/CredentialsContainer";
import { CredentialsError } from "@/components/credentials/CredentialsError";
import { CredentialsList } from "@/components/credentials/CredentialsList";
import { CredentialsLoading } from "@/components/credentials/CredentialsLoading";
import { credentialsParamsLoader } from "@/lib/params-server";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Credentials = async ({ searchParams }: Props) => {
  const params = await credentialsParamsLoader(searchParams);
  void trpc.credentials.getCredentials.prefetch(params);

  return (
    <CredentialsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<CredentialsError />}>
          <Suspense fallback={<CredentialsLoading />}>
            <CredentialsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </CredentialsContainer>
  );
};

export default Credentials;
