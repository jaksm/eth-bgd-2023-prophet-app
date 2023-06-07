import { IconCircleDotFilled } from "@tabler/icons-react";
import { useCall } from "@usedapp/core";
import { type BigNumber } from "ethers";
import { memo, useEffect } from "react";
import { useSignedContract } from "../../hooks/useSIgnedContract";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Copy } from "../Copy";
import { Price } from "../Price";
import { Rating } from "../Rating";

type AuctionProps = {
  index: string;
  title: string;
  description: string;
  sellerReputation?: number;
  isSoldModalOpen?: boolean;
  onClick?: (dealId: BigNumber) => void;
  onSold?: (
    dealId: BigNumber,
    highestBidder: string,
    buyerPubKey: string
  ) => void;
};

export const getStatus = (status?: number) => {
  switch (status) {
    case 0:
      return "Active";
    case 1:
      return "Closed";
    case 2:
      return "Sold";
  }
};

// eslint-disable-next-line react/display-name
export const AuctionCard = memo(
  ({
    index,
    title,
    description,
    sellerReputation = 5,
    onClick,
    onSold,
    isSoldModalOpen,
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

    useEffect(() => {
      if (isSoldModalOpen) return;

      if (getStatus(value?.status) === "Closed") {
        if (dealId && value?.highestBidder && value?.highestBiddersPK) {
          console.log(dealId[0], value?.highestBidder, value?.highestBiddersPK);
          onSold?.(dealId[0], value?.highestBidder, value?.highestBiddersPK);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

            <div className="flex items-center gap-4">
              <span className="rounded-full bg-orange-500 p-2 px-4 text-sm text-white">
                {getStatus(value?.status)}
              </span>
            </div>

            <p className="text tracking-wide text-white/75">{description}</p>
          </section>

          <section className="flex items-center justify-end">
            {dealId?.[0] && (
              <>
                <Button onClick={() => onClick?.(dealId[0])}>
                  <Price amount={value?.highestBid} />

                  <IconCircleDotFilled
                    size="0.75em"
                    className="mx-2 text-white/75"
                  />

                  <span>Place a bid</span>
                </Button>
              </>
            )}
          </section>
        </div>
      </figure>
    );
  }
);
