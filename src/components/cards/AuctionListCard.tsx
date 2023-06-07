import { formatEther } from "@ethersproject/units";
import { IconCircle, IconCurrencyEthereum } from "@tabler/icons-react";
import { useCall } from "@usedapp/core";
import { formatDistanceToNow, subMinutes } from "date-fns";
import { type BigNumber } from "ethers";
import { memo } from "react";
import { useSignedContract } from "../../hooks/useSIgnedContract";
import { Button } from "../Button";
import { getStatus } from "./AuctionCard";

type AuctionProps = {
  index: string;
  title: string;
  description: string;
  totalBids?: number;
  createdAt?: Date;
  onCloseAuction?: (dealId: BigNumber) => void;
};

// eslint-disable-next-line react/display-name
export const AuctionListCard = memo(
  ({
    index,
    title,
    description,
    totalBids,
    createdAt,
    onCloseAuction,
  }: AuctionProps) => {
    const { contract } = useSignedContract();
    const { value: dealId } =
      useCall({
        method: "dealIdByHash",
        contract,
        args: [index],
      }) ?? {};

    const { value, error } =
      useCall({
        method: "deals",
        contract,
        args: dealId?.[0] ? [dealId[0]] : [0],
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
              {getStatus(value?.status) === "Active" && (
                <IconCircle size="1em" className="text-green-500" />
              )}
              {getStatus(value?.status) === "Closed" && (
                <IconCircle size="1em" className="text-yellow-500" />
              )}
              {getStatus(value?.status) === "Sold" && (
                <IconCircle size="1em" className="text-red-500" />
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
            {onCloseAuction &&
              value?.dealIndex &&
              getStatus(value?.status) === "Active" && (
                <Button
                  onClick={() => onCloseAuction(value.dealIndex)}
                  variant="text"
                >
                  <span>Close Auction</span>
                </Button>
              )}
          </section>
        </div>
      </figure>
    );
  }
);
