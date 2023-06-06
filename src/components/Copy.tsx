import { IconClipboardCopy } from "@tabler/icons-react";
import { isServer } from "@tanstack/react-query";
import classNames from "classnames";
import { useEffect, useState } from "react";

type CopyProps = {
  resetAfter?: number;
  children: string;
  className?: string;
};

type State = "idle" | "copying" | "copied" | "error";

export const Copy = ({
  children,
  resetAfter = 1000 * 0.5,
  className,
}: CopyProps) => {
  const [state, setState] = useState<State>("idle");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isServer) return;

    if (state === "copying" || state === "copied") {
      setIsDisabled(true);
    }

    const timeout = setTimeout(() => {
      setState("idle");
      setIsDisabled(false);
    }, resetAfter);

    return () => clearTimeout(timeout);
  }, [resetAfter, state]);

  const onClick = async () => {
    if (isServer) return;

    setState("copying");
    try {
      await navigator.clipboard.writeText(children);
      setState("copied");
    } catch (error) {
      setState("error");
    }
  };

  return (
    <div
      className={classNames(
        "flex cursor-copy items-center gap-1  rounded-md border px-2 py-1 font-mono",
        className,
        {
          "border-orange-500/50 text-orange-500": state === "idle",
          "border-green-600/50 text-green-600": state === "copied",
        }
      )}
    >
      <input
        type="text"
        value={children}
        readOnly
        className="m-0 w-24 cursor-copy select-none text-ellipsis bg-transparent text-xs md:w-28 lg:w-28"
      />

      <button
        onClick={onClick}
        disabled={isDisabled}
        className={classNames(
          "flex aspect-square w-5 cursor-copy items-center justify-center"
        )}
      >
        <IconClipboardCopy size="1.25em" />
      </button>
    </div>
  );
};
