import { formatEther } from "@ethersproject/units";
import { IconCurrencyEthereum, IconTriangle } from "@tabler/icons-react";
import { useCall } from "@usedapp/core";
import { formatDistanceToNow, subMinutes } from "date-fns";
import { memo } from "react";
import { useSignedContract } from "../../hooks/useSIgnedContract";
import { ButtonLink } from "../Button";

type AuctionProps = {
  index: number;
  title: string;
  description: string;
  totalBids?: number;
  createdAt?: Date;
};

// eslint-disable-next-line react/display-name
export const AuctionListCard = memo(
  ({ index, title, description, totalBids, createdAt }: AuctionProps) => {
    const { contract } = useSignedContract();
    const { value } =
      useCall({
        method: "deals",
        contract,
        args: [index],
      }) ?? {};

    return (
      <figure className="cursor-default rounded-3xl border border-white/20 bg-stone-800/5 px-5 py-6 text-white">
        <div className="flex h-full items-center justify-between gap-4">
          <div className="flex flex-col items-baseline gap-2">
            <div className="flex items-center gap-2">
              {value?.highestBid && (
                <>
                  <IconCurrencyEthereum size="36px" className="text-white" />
                  <h1 className="text-xl font-bold text-white">
                    {formatEther(value?.highestBid || 0)} ETH
                  </h1>
                </>
              )}
            </div>
            <div className="flex w-full items-center justify-end gap-2">
              {totalBids && (
                <IconTriangle size="1em" className="text-green-500" />
              )}
              <span className="text-xs text-white/50">
                {/* @TODO: add totalBids the chain */}
                {totalBids && `${totalBids} bids`}
                {createdAt &&
                  formatDistanceToNow(subMinutes(createdAt, 2), {
                    addSuffix: true,
                  })}
              </span>
            </div>
          </div>

          <div className="mx-8 h-full border"></div>

          <section className="flex flex-1 flex-grow flex-col gap-4">
            <div className="flex items-center gap-4 ">
              <h3 className="text-xl font-medium text-white">{title}</h3>
            </div>

            <p className="text tracking-wide text-white/75">{description}</p>
          </section>

          <section className="-mr-2 flex min-w-max flex-col items-center justify-end ">
            <ButtonLink href="/auctions/1" variant="text">
              <span>View Auction</span>
            </ButtonLink>
          </section>
        </div>
      </figure>
    );
  }
);
