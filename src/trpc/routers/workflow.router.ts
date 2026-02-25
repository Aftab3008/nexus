import db from "@/lib/db/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import { PAGINATION } from "@/constants";
import { TRPCError } from "@trpc/server";
import { NodeType } from "@/generated/prisma/enums";
import type { Edge, Node } from "@xyflow/react";

export const workflowRouter = createTRPCRouter({
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    const workflow = await db.workflow.create({
      data: {
        name: "Untitled Workflow",
        userId: ctx.auth.user.id,
        nodes: {
          create: {
            name: NodeType.INITIAL,
            type: NodeType.INITIAL,
            position: {
              x: 0,
              y: 0,
            },
          },
        },
      },
    });
    return workflow;
  }),

  removeWorkflow: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const workflow = await db.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
      return workflow;
    }),

  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Name must be at least 1 character long"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const workflow = await db.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      });
      return workflow;
    }),

  getWorkflowById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const workflow = await db.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      if (!workflow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        });
      }

      const nodes: Node[] = workflow.nodes.map((node) => {
        return {
          id: node.id,
          type: node.type,
          position: node.position as { x: number; y: number },
          data: (node.data as Record<string, unknown>) || {},
        };
      });

      const edges: Edge[] = workflow.connections.map((connection) => {
        return {
          id: connection.id,
          source: connection.fromNodeId,
          target: connection.toNodeId,
          sourceHandle: connection.fromOutput,
          targetHandle: connection.toInput,
        };
      });

      return {
        id: workflow.id,
        name: workflow.name,
        nodes,
        edges,
      };
    }),

  getWorkflows: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .max(PAGINATION.MAX_PAGE_SIZE)
          .min(PAGINATION.MIN_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const where = {
        userId: ctx.auth.user.id,
        name: { contains: search, mode: "insensitive" as const },
      };

      const [items, totalCount] = await db.$transaction([
        db.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where,
          orderBy: { updatedAt: "desc" },
        }),
        db.workflow.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        workflows: items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
