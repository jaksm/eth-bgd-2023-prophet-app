import { IconCircleDotFilled } from "@tabler/icons-react";
import { useCall } from "@usedapp/core";
import { memo } from "react";
import { useSignedContract } from "../../hooks/useSIgnedContract";
import { Avatar } from "../Avatar";
import { ButtonLink } from "../Button";
import { Copy } from "../Copy";
import { Price } from "../Price";
import { Rating } from "../Rating";

type AuctionProps = {
  index: number;
  title: string;
  description: string;
  sellerReputation?: number;
};

export const AuctionCard = memo(
  ({ index, title, description, sellerReputation = 5 }: AuctionProps) => {
    const { contract } = useSignedContract();
    const { value, error } =
      useCall({
        method: "deals",
        contract,
        args: [index],
      }) ?? {};

    return (
      <figure className="cursor-default rounded-3xl border border-white/20 bg-stone-800/20 p-4 text-white">
        <div className="flex h-full flex-col justify-between gap-16">
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-4 ">
              <Avatar seed={value?.seller || ""} size="medium" />
              <h3 className="line-clamp-2 text-ellipsis text-lg font-medium">
                {title}
              </h3>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Rating value={sellerReputation} total={139} />
              <Copy>{value?.seller || ""}</Copy>
            </div>

            <p className="text tracking-wide text-white/75">{description}</p>
          </section>

          <section className="flex items-center justify-end">
            <ButtonLink href="/auctions/1">
              <Price amount={value?.highestBid} />

              <IconCircleDotFilled
                size="0.75em"
                className="mx-2 text-white/75"
              />

              <span>Place a bid</span>
            </ButtonLink>
          </section>
        </div>
      </figure>
    );
  }
);
