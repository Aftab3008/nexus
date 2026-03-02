import { createTRPCRouter } from "../init";
import { usersRouter } from "./users.router";
import { workflowRouter } from "./workflow.router";
import { credentialsRouter } from "./credentials.router";
import { executionsRouter } from "./executions.router";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  workflows: workflowRouter,
  credentials: credentialsRouter,
  executions: executionsRouter,
});

export type AppRouter = typeof appRouter;
