import { createTRPCRouter } from "../init";
import { usersRouter } from "./users.router";

export const appRouter = createTRPCRouter({
  usersRouter,
});

export type AppRouter = typeof appRouter;
