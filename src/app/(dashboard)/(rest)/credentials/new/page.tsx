import { CredentialForm } from "@/components/credentials/CredentialForm";

const Page = async () => {
  return (
    <div className="h-full p-4 md:px-10 md:py-6">
      <div className="flex flex-col w-full h-full max-w-3xl mx-auto gap-y-8">
        <CredentialForm />
      </div>
    </div>
  );
};

export default Page;
