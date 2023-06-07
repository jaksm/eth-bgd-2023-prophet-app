import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  updateAddress: publicProcedure
    .input(
      z.object({
        address: z.string().nonempty("Address cannot be empty"),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.upsert({
        where: {
          walletAddress: input.address,
        },
        update: {
          walletAddress: input.address,
        },
        create: {
          walletAddress: input.address,
        },
      });
    }),
});
