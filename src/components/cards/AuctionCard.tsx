import { IconCircleDotFilled } from "@tabler/icons-react";
import { Avatar } from "../Avatar";
import { ButtonLink } from "../Button";
import { Copy } from "../Copy";
import { Price } from "../Price";
import { Rating } from "../Rating";

type AuctionProps = {
  informationCID: string;
  title: string;
  description: string;
  sellerAddress: string;
  sellerReputation: number;
  highestBid: number;
};

export const AuctionCard = ({
  title,
  description,
  sellerAddress,
  sellerReputation,
  highestBid = 0,
}: AuctionProps) => {
  return (
    <figure className="cursor-default rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex h-full flex-col justify-between gap-16">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4 ">
            <Avatar seed={sellerAddress} size="medium" />
            <h3 className="text-xl font-medium">{title}</h3>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Rating value={sellerReputation} total={139} />
            <Copy>{sellerAddress}</Copy>
          </div>

          <p className="text text-white/75">{description}</p>
        </section>

        <section className="flex items-center justify-end">
          <ButtonLink href="/auctions/1">
            <Price amount={highestBid} />

            <IconCircleDotFilled size="0.75em" className="mx-2 text-white/75" />

            <span>View more</span>
          </ButtonLink>
        </section>
      </div>
    </figure>
  );
};
