import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const WALLETS = {
  BUYER_A: "BUYER-A-0x0000000",
  BUYER_B: "BUYER-B-0x0000000",
  SELLER_A: "SELLER-A-0x0000000",
};

async function main() {
  await db.user.createMany({
    data: [
      { walletAddress: WALLETS.BUYER_A },
      { walletAddress: WALLETS.BUYER_B },
      { walletAddress: WALLETS.SELLER_A },
    ],
  });

  await db.seller.create({
    data: { walletAddress: WALLETS.SELLER_A },
  });

  await db.buyer.createMany({
    data: [
      { walletAddress: WALLETS.BUYER_A },
      { walletAddress: WALLETS.BUYER_B },
    ],
  });

  await db.information.createMany({
    data: [
      {
        CID: "QmZ",
        title: "This is a title",
        description: "This is a description",
        ownerAddress: WALLETS.SELLER_A,
      },
    ],
  });

  await db.transaction.create({
    data: {
      information: {
        connect: {
          CID: "QmZ",
        },
      },
      seller: {
        connect: {
          walletAddress: WALLETS.SELLER_A,
        },
      },
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
