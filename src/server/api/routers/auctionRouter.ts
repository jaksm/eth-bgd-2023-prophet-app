import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const auctionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        buyer: null,
        closedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        information: true,
        seller: true,
      },
    });
  }),
  searchByTitle: publicProcedure
    .input(z.string().nonempty("Search value cannot be empty"))
    .query(({ ctx, input }) => {
      console.log(input);
      return ctx.prisma.transaction.findMany({
        where: {
          information: {
            title: {
              search: input,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          information: true,
          seller: true,
          _count: true,
        },
      });
    }),
});
