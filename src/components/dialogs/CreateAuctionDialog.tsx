import { Dialog } from "@headlessui/react";
import { IconLockAccess, IconLockAccessOff } from "@tabler/icons-react";
import { useState } from "react";
import { IPFSUpload } from "../IPFSUpload";
import { ReadFile } from "../ReadFile";

type CreateAuctionDialogProps = {
  isOpen: boolean;
  onChange: (value: boolean) => void;
};

export function CreateAuctionDialog({
  isOpen,
  onChange: onClose,
}: CreateAuctionDialogProps) {
  const [pubKey, setPubKey] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [passphrase, setPassphrase] = useState("");

  console.log("PUB", pubKey);

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
                  onChange={(e) => setPassphrase(e.target.value)}
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
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
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
            </div>

            <div className="flex flex-col gap-4">
              <h3>Private content</h3>
              <IPFSUpload
                onChange={console.log}
                keys={{ passphrase, public: pubKey, private: privKey }}
              />
            </div>

            <button
              onClick={() => onClose(false)}
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
