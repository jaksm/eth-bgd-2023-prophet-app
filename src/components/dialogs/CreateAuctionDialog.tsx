import { Dialog } from "@headlessui/react";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { useContract } from "../../hooks/usePagination";
import { api } from "../../utils/api";

type CreateAuctionDialogProps = {
  isOpen: boolean;
  onChange: (value: boolean) => void;
};

const hash = (val: string) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(val)).then((h) => {
    let hexes = [],
      view = new DataView(h);
    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join("");
  });

export function CreateAuctionDialog({
  isOpen,
  onChange: onClose,
}: CreateAuctionDialogProps) {
  const { account: sellerAddress } = useEthers();
  const contract = useContract();

  const auctionSaveMutation = api.auctions.save.useMutation();
  const updateWalletMutation = api.users.updateAddress.useMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSave = async () => {
    try {
      if (!sellerAddress) {
        throw new Error("No seller address");
      }

      const titleHash = await hash(title);
      const descriptionHash = await hash(description);

      await contract.createDeal.send(titleHash, descriptionHash);
      await updateWalletMutation.mutateAsync({
        address: sellerAddress,
      });
      await auctionSaveMutation.mutateAsync({
        title,
        description,
        sellerAddress,
      });

      alert("Saved");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => onClose(false)}>
      <Dialog.Backdrop
        onClick={() => onClose(false)}
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

            {/* <div className="flex flex-col gap-4">
              <h3>Encryption</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Passphrase"
                  className="col-span-2 rounded-2xl border border-purple-500 bg-black p-4 text-sm text-white"
                  onChange={(e) => setPassphrase(e.target.value)}
                />

                <ReadFile
                  onChange={setPrivKey}
                  placeholder="Private key"
                  icon={
                    <IconLockAccessOff size="1.5em" className="text-white" />
                  }
                />

                <ReadFile
                  onChange={setPubKey}
                  placeholder="Public key"
                  icon={<IconLockAccess size="1.5em" className="text-white" />}
                />
              </div>
            </div> */}

            {/* <div className="flex flex-col gap-4">
              <h3>Private content</h3>
              <IPFSUpload
                onChange={console.log}
                keys={{ passphrase, public: pubKey, private: privKey }}
              />
            </div> */}

            <button
              onClick={onSave}
              className="rounded-full bg-purple-500 py-3 heropattern-topography-white/10"
            >
              Create
            </button>
          </div>
        </Dialog.Panel>
      </Dialog.Backdrop>
    </Dialog>
  );
}
