import { Dialog } from "@headlessui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useState } from "react";
import { useSignedContract } from "../../hooks/useSIgnedContract";
import { api } from "../../utils/api";

type CreateAuctionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const hash = (val: string) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(val)).then((h) => {
    const hexes: any[] = [];
    const view = new DataView(h);

    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join("");
  });

export function CreateAuctionDialog({
  isOpen,
  onClose,
}: CreateAuctionDialogProps) {
  const { account: sellerAddress } = useEthers();
  const { contract } = useSignedContract();
  const createDeal = useContractFunction(contract, "createDeal", {
    transactionName: "auction/create",
  });

  const auctionsQuery = api.auctions.getAll.useQuery();
  const auctionSaveMutation = api.auctions.save.useMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startPrice, setStartPrice] = useState("");

  const onSave = async () => {
    try {
      if (!sellerAddress) {
        throw new Error("No seller address");
      }

      const titleHash = await hash(title);
      const descriptionHash = await hash(description);

      const receipt = await createDeal.send(
        titleHash,
        descriptionHash,
        utils.parseEther(startPrice)
      );

      if (receipt) {
        await auctionSaveMutation.mutateAsync({
          transactionId: titleHash,
          title,
          description,
          sellerAddress,
          cid: titleHash,
        });
        await auctionsQuery.refetch();
      }

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => onClose()}>
      <Dialog.Backdrop
        onClick={() => onClose()}
        className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-500/60"
      >
        <Dialog.Panel className="flex flex-col gap-8 rounded-3xl bg-black px-6 py-4 text-white">
          <Dialog.Title className="text-2xl font-medium">
            Create Auction
          </Dialog.Title>

          <div className="max-h-[calc(100vh * 0.8)] flex flex-col gap-4 overflow-y-scroll">
            <div className="flex flex-col gap-4">
              <h3>Public content</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="rounded-2xl border border-purple-500 bg-black p-4 text-sm text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Starting price"
                  className="rounded-2xl border border-purple-500 bg-black p-4 text-sm text-white"
                  value={startPrice}
                  onChange={(e) => setStartPrice(e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  maxLength={500}
                  rows={10}
                  className="col-span-2 rounded-2xl border border-purple-500 bg-black p-4 text-sm text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={onSave}
              disabled={createDeal.state.status === "Mining"}
              className="rounded-full bg-purple-500 py-3 heropattern-topography-white/10"
            >
              {createDeal.state.status === "Success" && "Created Auction"}
              {createDeal.state.status === "Mining" && "Mining..."}
              {createDeal.state.status === "Fail" && "Failed"}
              {createDeal.state.status === "PendingSignature" && "Sign"}
              {createDeal.state.status === "None" && "Create Auction"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog.Backdrop>
    </Dialog>
  );
}
