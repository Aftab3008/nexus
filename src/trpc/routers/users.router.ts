import db from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const usersRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: {
        id: ctx.auth.user.id,
      },
    });
    return user;
  }),
});
