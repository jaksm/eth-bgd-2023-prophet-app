import { IconDownload, IconTrash } from "@tabler/icons-react";
import { Avatar } from "../Avatar";
import { ButtonLink } from "../Button";

type OwnedItemCardProps = {
  informationCID: string;
  title: string;
  description: string;
  sellerAddress: string;
};

export const OwnedItemCard = ({
  title,
  description,
  sellerAddress,
}: OwnedItemCardProps) => {
  return (
    <figure className="cursor-default rounded-3xl border border-white/20 bg-stone-800/20 p-4 text-white">
      <div className="flex h-full flex-col justify-between gap-16">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4 ">
            <Avatar seed={sellerAddress} size="medium" />
            <h3 className="line-clamp-2 text-ellipsis text-lg font-medium">
              {title}
            </h3>
          </div>

          <p className="text tracking-wide text-white/75">{description}</p>
        </section>

        <section className="flex items-center justify-between gap-2">
          <ButtonLink
            href="/auctions/1"
            variant="text"
            icon={<IconTrash size="1.75em" className="text-white/75" />}
            reverse
          >
            Destroy
          </ButtonLink>

          <ButtonLink variant="text" href="/auctions/1" icon={<IconDownload />}>
            Download
          </ButtonLink>
        </section>
      </div>
    </figure>
  );
};
