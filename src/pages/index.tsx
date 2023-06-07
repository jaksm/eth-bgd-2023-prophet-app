import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";

import { Grid } from "../components/Grid";
import { Search } from "../components/Search";
import { useSearchAuctions } from "../hooks/useSearch";

import { type BigNumber } from "ethers";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AuctionCard } from "../components/cards/AuctionCard";
import { AuctionListCard } from "../components/cards/AuctionListCard";
import { CreateBidDialog } from "../components/dialogs/CreateBidDialog";
import { CreateSoldDialog } from "../components/dialogs/CreateSoldModal";
import { LayoutSidebar } from "../components/layouts/LayoutSidebar";

const Home: NextPage = () => {
  const auctions = api.auctions.getAll.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [soldModalOpen, setSoldModalOpen] = useState<
    { dealId: BigNumber; highestBidder: string } | undefined
  >();
  const [dealId, setDealId] = useState<BigNumber>();

  const search = useSearchAuctions();

  return (
    <>
      <Head>
        <title>Prophet | Buy</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutSidebar>
        <main className="flex min-h-screen flex-col justify-center">
          <CreateBidDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            dealId={dealId as BigNumber}
          />

          <CreateSoldDialog
            dealId={soldModalOpen?.dealId}
            isOpen={Boolean(soldModalOpen)}
            onClose={() => setSoldModalOpen(undefined)}
            pubKey=""
          />
          <div className="container mx-auto flex flex-col justify-center gap-12 px-4">
            <Search onChange={search.setValue} />

            <AnimatePresence>
              {search.results?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-12 pb-12"
                >
                  <h2 className="text-3xl font-semibold tracking-wide text-white">
                    🔍 Found {search.results.length} auctions
                  </h2>

                  <motion.div className="flex flex-col gap-4">
                    {(search.results || []).map((auction, i) => (
                      <motion.div key={i}>
                        <AuctionListCard
                          index={auction.id}
                          title={auction.information.title}
                          description={auction.information.description}
                          totalBids={auction.bids.length}
                          createdAt={auction.createdAt}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <h1 className="text-3xl font-semibold tracking-wide text-white">
              🔥 Available for bidding
            </h1>

            <Grid
              items={auctions.data || []}
              renderItem={(auction, i) => (
                <AuctionCard
                  isSoldModalOpen={Boolean(soldModalOpen)}
                  index={auction.id}
                  key={i}
                  title={auction.information.title}
                  description={auction.information.description}
                  onClick={(dealId) => {
                    setDealId(dealId);
                    setIsOpen(true);
                  }}
                  onSold={(dealId, highestBidder) => {
                    setSoldModalOpen({ dealId, highestBidder });
                  }}
                />
              )}
            />
            <p className="text-2xl text-white">
              {auctions.data ? "" : "Loading tRPC query..."}
            </p>
          </div>
        </main>
      </LayoutSidebar>
    </>
  );
};

export default Home;
