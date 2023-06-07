import { IconCheck, IconFile, IconLoader, IconX } from "@tabler/icons-react";
import * as IPFS from "ipfs-core";
import { useCallback, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

type State = "idle" | "uploading" | "uploaded" | "error";

type IPFSUploadProps = {
  onChange: (cid: string) => void;
  pubKey?: string;
};

function stringToUint8Array(str: string, maxLength: number): Uint8Array {
  let uint8Array = new TextEncoder().encode(str);

  if (uint8Array.length > maxLength) {
    uint8Array = uint8Array.slice(0, maxLength);
  }

  return uint8Array;
}

function base64ToUint8Array(base64String: string): Uint8Array {
  let uint8Array = new Uint8Array(new Buffer(base64String, "base64"));

  if (uint8Array.length > 65) {
    uint8Array = uint8Array.slice(0, 65);
  }

  return uint8Array;
}

async function encryptViaPublicKey(pubKey: string, value: any) {
  const key = await window.crypto.subtle.importKey(
    "spki",
    new TextEncoder().encode(pubKey),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );

  return window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    key,
    new TextEncoder().encode(value)
  );
}

export function IPFSUpload({ onChange, pubKey }: IPFSUploadProps) {
  const [state, setState] = useState<State>("idle");

  const onDrop: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    setState("uploading");
    const node = await IPFS.create({ repo: "ok" + Math.random() });

    try {
      if (!pubKey) {
        console.error("No public key");
        return;
      }

      const encrypted = await encryptViaPublicKey(pubKey, acceptedFiles[0]);

      console.log("asd", encrypted);

      // const upload = await node.add({
      //   path: acceptedFiles[0].name,
      //   content,
      // });

      // onChange(upload.cid.toString());

      setState("uploaded");
    } catch (error) {
      console.error(error.message);
      setState("error");
    }
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: useCallback(onDrop, [pubKey]),
      maxFiles: 1,
    });

  return (
    <div
      {...getRootProps()}
      className="flex h-52 w-full min-w-[320px] flex-col items-center justify-center gap-4 rounded-3xl border border-purple-500 px-4 py-6 text-xs"
    >
      <input {...getInputProps()} />

      {state === "idle" && <IconFile size="3em" className="text-white" />}
      {state === "uploading" && (
        <IconLoader size="3em" className="animate-spin text-white" />
      )}
      {state === "uploaded" && (
        <IconCheck size="3em" className="text-green-500" />
      )}
      {state === "error" && <IconX size="3em" className="text-red-500" />}

      <div className="text-center text-white/60">
        {acceptedFiles.length > 0 && (
          <p className="mb-1 text-white">{acceptedFiles[0].name}</p>
        )}

        <span>
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>
              {state === "idle" &&
                "Drag & Drop file here, or click to select a file"}
              {state === "uploading" && "Uploading..."}
              {state === "uploaded" &&
                acceptedFiles.length > 0 &&
                `File uploaded`}

              {state === "error" &&
                acceptedFiles.length > 0 &&
                `Error uploading ${acceptedFiles[0].name}`}
            </p>
          )}
        </span>
      </div>
    </div>
  );
}
