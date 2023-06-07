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
        bids: true,
      },
    });
  }),
  searchByTitle: publicProcedure
    .input(z.string().nonempty("Search value cannot be empty"))
    .query(({ ctx, input }) => {
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
          bids: true,
        },
      });
    }),
  save: publicProcedure
    .input(
      z.object({
        transactionId: z.string().nonempty("Transaction ID cannot be empty"),
        title: z.string().nonempty("Title cannot be empty"),
        description: z.string().nonempty("Description cannot be empty"),
        sellerAddress: z.string().nonempty("Seller address cannot be empty"),
        cid: z.string().default("GEN_CID"),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.$transaction([
        ctx.prisma.user.upsert({
          where: {
            walletAddress: input.sellerAddress,
          },
          create: {
            walletAddress: input.sellerAddress,
            seller: {
              create: {
                reputation: 0,
              },
            },
          },
          update: {
            walletAddress: input.sellerAddress,
            seller: {
              connect: {
                walletAddress: input.sellerAddress,
              },
            },
          },
        }),
        ctx.prisma.transaction.create({
          data: {
            informationCID: input.cid,
            seller: {
              connect: {
                walletAddress: input.sellerAddress,
              },
            },
            information: {
              create: {
                id: input.transactionId,
                title: input.title,
                description: input.description,
                CID: input.cid,
                owner: {
                  connect: {
                    walletAddress: input.sellerAddress,
                  },
                },
              },
            },
          },
        }),
      ]);
    }),
});
