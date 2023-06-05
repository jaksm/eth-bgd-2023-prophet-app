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
});
