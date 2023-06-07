import { generateKeyPair } from "crypto";
import { promisify } from "util";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const generateKeyPairAsync = promisify(generateKeyPair);

export const userRouter = createTRPCRouter({
  me: publicProcedure
    .input(
      z.object({
        address: z.string().nonempty("Address cannot be empty"),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          walletAddress: input.address,
        },
      });
    }),

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
  generateKeys: publicProcedure
    .input(
      z.object({
        address: z.string().nonempty("Address cannot be empty"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          walletAddress: input.address,
        },
      });

      if (user?.privateKey || user?.publicKey) {
        return user;
      }

      const { publicKey, privateKey } = await generateKeyPairAsync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
          cipher: "aes-256-cbc",
          passphrase: Math.random().toString(36),
        },
      });

      return ctx.prisma.user.update({
        where: {
          walletAddress: input.address,
        },
        data: {
          publicKey,
          privateKey,
        },
      });
    }),
});
