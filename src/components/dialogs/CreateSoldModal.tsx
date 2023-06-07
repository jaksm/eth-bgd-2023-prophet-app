import { Dialog } from "@headlessui/react";
import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import { type BigNumber } from "ethers";
import { useSignedContract } from "../../hooks/useSIgnedContract";
import { IPFSUpload } from "../IPFSUpload";

type CreateSoldDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dealId?: BigNumber;
  pubKey?: string;
};

export function CreateSoldDialog({
  isOpen,
  onClose,
  dealId,
  pubKey,
}: CreateSoldDialogProps) {
  const { account } = useEthers();
  const { contract } = useSignedContract();
  const createBid = useContractFunction(contract, "bid", {
    gasLimitBufferPercentage: 10,
  });

  const { value, error } =
    useCall({
      method: "deals",
      contract,
      args: [dealId || 0],
    }) ?? {};

  const onSave = async () => {
    try {
      if (!account) {
        throw new Error("No account");
      }
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
            Add secret info
          </Dialog.Title>

          <div className="max-h-[calc(100vh * 0.8)] flex flex-col gap-4 overflow-y-scroll">
            <div className="flex flex-col gap-4">
              {value?.highestBiddersPK && (
                <IPFSUpload
                  pubKey={value?.highestBiddersPK}
                  onChange={console.log}
                />
              )}
            </div>

            <button
              onClick={onSave}
              className="rounded-full bg-purple-500 py-3 heropattern-topography-white/10"
            >
              {createBid.state.status === "Success" && "Info sent"}
              {createBid.state.status === "Mining" && "Mining..."}
              {createBid.state.status === "Fail" && "Failed"}
              {createBid.state.status === "PendingSignature" && "Sign"}
              {createBid.state.status === "None" && "Send info"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog.Backdrop>
    </Dialog>
  );
}
