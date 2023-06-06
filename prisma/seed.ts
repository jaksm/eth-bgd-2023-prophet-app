import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const WALLETS = {
  BUYER_1: "BUYER-1-0x0000001",
  BUYER_2: "BUYER-2-0x0000002",
  BUYER_3: "BUYER-3-0x0000003",
  BUYER_4: "BUYER-4-0x0000004",
  BUYER_5: "BUYER-5-0x0000005",
  BUYER_6: "BUYER-6-0x0000006",
  BUYER_7: "BUYER-7-0x0000007",
  BUYER_8: "BUYER-8-0x0000008",
  BUYER_9: "BUYER-9-0x0000009",
  BUYER_10: "BUYER-10-0x0000010",
  SELLER_1: "SELLER-1-0x0000001",
  SELLER_2: "SELLER-2-0x0000002",
  SELLER_3: "SELLER-3-0x0000003",
  SELLER_4: "SELLER-4-0x0000004",
};

async function main() {
  const addresses = Object.values(WALLETS);
  const sellers = addresses.filter((walletAddress) =>
    walletAddress.includes("SELLER")
  );
  const buyers = addresses.filter((walletAddress) =>
    walletAddress.includes("BUYER")
  );

  await db.user.createMany({
    data: addresses.map((walletAddress) => ({
      walletAddress,
    })),
  });

  await db.seller.create({
    data: sellers.map((walletAddress) => ({
      walletAddress,
    }))[0],
  });

  await db.buyer.createMany({
    data: buyers.map((walletAddress) => ({
      walletAddress,
    })),
  });

  const CIDs = Array.from({ length: 40 }, () => faker.string.uuid());

  await db.information.createMany({
    data: CIDs.map((CID) => ({
      CID,
      description: faker.lorem.paragraph(),
      ownerAddress:
        sellers[faker.datatype.number({ min: 0, max: sellers.length - 1 })],
      title: faker.lorem.sentence(),
    })),
  });

  await db.transaction.createMany({
    data: CIDs.map((CID) => ({
      informationCID: CID,
      sellerAddress:
        sellers[faker.datatype.number({ min: 0, max: sellers.length - 1 })],
    })),
  });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
