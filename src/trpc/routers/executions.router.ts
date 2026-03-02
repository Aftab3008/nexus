import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db from "@/lib/db/db";
import { PAGINATION } from "@/constants";

export const executionsRouter = createTRPCRouter({
  getExecutionById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return db.executions.findUniqueOrThrow({
        where: { id: input.id, workflow: { userId: ctx.auth.user.id } },
        include: { workflow: { select: { id: true, name: true } } },
      });
    }),

  getExecutions: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;

      const where = { workflow: { userId: ctx.auth.user.id } };

      const [items, totalCount] = await db.$transaction([
        db.executions.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where,
          orderBy: { startedAt: "desc" },
          include: { workflow: { select: { id: true, name: true } } },
        }),
        db.executions.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      const result = {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };

      return result;
    }),
});
