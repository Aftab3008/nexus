import db from "@/lib/db";

export default async function Home() {
  const users = await db.user.findMany();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>Users: {users.length}</p>
    </div>
  );
}
