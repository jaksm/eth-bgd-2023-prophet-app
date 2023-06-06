import { IconCheck, IconFile, IconLoader, IconX } from "@tabler/icons-react";
import * as IPFS from "ipfs-core";
import { useCallback, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { encrypt } from "../utils/encrypt";

type State = "idle" | "uploading" | "uploaded" | "error";

type IPFSUploadProps = {
  onChange: (cid: string) => void;
  keys: Parameters<typeof encrypt>[1];
};

export function IPFSUpload({ onChange, keys }: IPFSUploadProps) {
  const [state, setState] = useState<State>("idle");

  const onDrop: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    setState("uploading");

    try {
      const node = await IPFS.create();
      const encrypted = await encrypt(acceptedFiles[0], keys);

      // const upload = await node.add({
      //   path: acceptedFiles[0].name,
      //   content,
      // });

      // onChange(upload.cid.toString());

      setState("uploaded");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: useCallback(onDrop, [keys]),
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
