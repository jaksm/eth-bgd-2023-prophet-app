import { Dialog } from "@headlessui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { utils, type BigNumber } from "ethers";
import { useState } from "react";
import { useSignedContract } from "../../hooks/useSIgnedContract";
import { api } from "../../utils/api";

type CreateBidDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dealId: BigNumber;
};

export function CreateBidDialog({
  isOpen,
  onClose,
  dealId,
}: CreateBidDialogProps) {
  const generateKeysMutation = api.users.generateKeys.useMutation();
  const { account: sellerAddress } = useEthers();
  const { contract } = useSignedContract();
  const createBid = useContractFunction(contract, "bid", {
    gasLimitBufferPercentage: 10,
  });

  const [amount, setAmount] = useState("");

  const onSave = async () => {
    try {
      if (!sellerAddress) {
        throw new Error("No seller address");
      }

      const { publicKey } = await generateKeysMutation.mutateAsync({
        address: sellerAddress,
      });

      if (!publicKey) {
        console.error("No public key");
        return;
      }

      await createBid.send(dealId, utils.parseEther(amount), publicKey, {
        value: utils.parseEther("0.0015"),
      });
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
            Create Bid
          </Dialog.Title>

          <div className="max-h-[calc(100vh * 0.8)] flex flex-col gap-4 overflow-y-scroll">
            <div className="flex flex-col gap-4">
              <div className="gap-4">
                <input
                  type="number"
                  placeholder="Starting price"
                  className="rounded-2xl border border-purple-500 bg-black p-4 text-sm text-white"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={onSave}
              className="rounded-full bg-purple-500 py-3 heropattern-topography-white/10"
            >
              {createBid.state.status === "Success" && "Created Bid"}
              {createBid.state.status === "Mining" && "Mining..."}
              {createBid.state.status === "Fail" && "Failed"}
              {createBid.state.status === "PendingSignature" && "Sign"}
              {createBid.state.status === "None" && "Create Bid"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog.Backdrop>
    </Dialog>
  );
}
