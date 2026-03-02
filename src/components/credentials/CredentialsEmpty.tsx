"use client";

import { useRouter } from "next/navigation";
import { EmptyView } from "../shared/entity-components";

export const CredentialsEmpty = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/credentials/new");
  };

  return (
    <EmptyView
      message="You haven't created any credentials yet. Get started by creating your first credential"
      onNew={handleCreate}
    />
  );
};
