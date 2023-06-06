import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";

import { Grid } from "../components/Grid";
import { Search } from "../components/Search";
import { AuctionCard } from "../components/cards/AuctionCard";
import { useSearchAuctions } from "../hooks/useSearch";

const Home: NextPage = () => {
  const auctions = api.auctions.getAll.useQuery();

  const search = useSearchAuctions();

  return (
    <>
      <Head>
        <title>Prophet | Auctions</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-center">
        <div className="container mx-auto flex flex-col justify-center gap-12 px-4">
          <h1 className="text-4xl font-bold text-white">🔥 On Sale Now</h1>

          <Search onChange={search.setValue} />

          {search.results?.length > 0 && (
            <div className="flex flex-col gap-12 pb-12">
              <h2 className="text-2xl text-white">
                Found {search.results.length} auctions
              </h2>

              <Grid
                items={search.results || []}
                renderItem={(auction) => (
                  <AuctionCard
                    key={auction.informationCID}
                    title={auction.information.title}
                    description={auction.information.description}
                    informationCID={auction.informationCID}
                    sellerAddress={auction.information.ownerAddress}
                    sellerReputation={Math.random() * 10}
                    highestBid={Math.random() * 100}
                  />
                )}
              />
            </div>
          )}

          <Grid
            items={auctions.data || []}
            renderItem={(auction) => (
              <AuctionCard
                key={auction.informationCID}
                title={auction.information.title}
                description={auction.information.description}
                informationCID={auction.informationCID}
                sellerAddress={auction.information.ownerAddress}
                sellerReputation={Math.random() * 10}
                highestBid={Math.random() * 100}
              />
            )}
          />
          <p className="text-2xl text-white">
            {auctions.data ? "" : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
