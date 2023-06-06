import { useCallback, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

type ReadFileProps = {
  onChange: (content: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
};

export function ReadFile({ onChange, placeholder, icon }: ReadFileProps) {
  const [content, setContent] = useState<string>("");

  const onDrop: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    const [file] = acceptedFiles;

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      onChange(reader.result as string);
      setContent(reader.result as string);
    };
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: useCallback(onDrop, [onChange]),
      maxFiles: 1,
    });

  return (
    <div
      {...getRootProps()}
      className="flex w-[320px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-purple-500 p-4 text-sm"
    >
      <input {...getInputProps()} />

      <div className="text-center text-white/60">
        {acceptedFiles.length > 0 && (
          <p className="mb-1 text-white">{acceptedFiles[0].name}</p>
        )}

        {!content && (
          <div className="flex items-center gap-4 ">
            {icon}
            <p>{placeholder}</p>
          </div>
        )}
      </div>
    </div>
  );
}
