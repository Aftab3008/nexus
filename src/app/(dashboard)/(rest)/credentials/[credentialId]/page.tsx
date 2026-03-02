import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient, trpc } from "@/trpc/server";
import { CredentialsError } from "@/components/credentials/CredentialsError";
import { CredentialsLoading } from "@/components/credentials/CredentialsLoading";
import { CredentialView } from "@/components/credentials/CredentialForm";

interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { credentialId } = await params;
  void trpc.credentials.getCredentialById.prefetch({
    id: credentialId,
  });

  return (
    <div className="h-full p-4 md:px-10 md:py-6">
      <div className="flex flex-col w-full h-full max-w-3xl mx-auto gap-y-8">
        <HydrateClient>
          <ErrorBoundary fallback={<CredentialsError />}>
            <Suspense fallback={<CredentialsLoading />}>
              <CredentialView credentialId={credentialId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  );
};

export default Page;
