import { IconCurrencyEthereum, IconTriangle } from "@tabler/icons-react";
import { formatDistanceToNow, subMinutes } from "date-fns";
import { ButtonLink } from "../Button";
import { currency } from "../formatter";

type AuctionProps = {
  informationCID: string;
  title: string;
  description: string;
  highestBid: number;
};

export const AuctionListCard = ({
  title,
  description,
  highestBid = 0,
}: AuctionProps) => {
  return (
    <figure className="cursor-default rounded-3xl border border-white/20 bg-stone-800/5 px-5 py-6 text-white">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="flex flex-col items-baseline gap-2">
          <div className="flex items-center gap-2">
            <IconCurrencyEthereum size="36px" className="text-white" />
            <h1 className="text-xl font-bold text-white">
              {currency.format(highestBid, 10)} ETH
            </h1>
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <IconTriangle size="1em" className="text-green-500" />
            <span className="text-xs text-white/50">
              200 bids{", "}
              {formatDistanceToNow(subMinutes(new Date(), 2), {
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
};
