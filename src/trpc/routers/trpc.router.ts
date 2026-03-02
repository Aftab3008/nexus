import { createTRPCRouter } from "../init";
import { usersRouter } from "./users.router";
import { workflowRouter } from "./workflow.router";
import { credentialsRouter } from "./credentials.router";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  workflows: workflowRouter,
  credentials: credentialsRouter,
});

export type AppRouter = typeof appRouter;
