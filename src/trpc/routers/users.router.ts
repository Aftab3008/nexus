import db from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const usersRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.auth.user.id);
    const user = db.user.findUnique({
      where: {
        id: ctx.auth.user.id,
      },
    });
    return user;
  }),
});
