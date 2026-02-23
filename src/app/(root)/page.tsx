import { caller } from "@/trpc/server";

export default async function Home() {
  const user = await caller.usersRouter.getUser();
  return <>{JSON.stringify(user)}</>;
}
