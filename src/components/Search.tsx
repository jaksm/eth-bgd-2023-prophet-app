import { IconAdjustmentsAlt } from "@tabler/icons-react";
import classNames from "classnames";
import { debounce } from "lodash";

type SearchProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClick?: (value: string | undefined) => void;
};

export const Search = ({
  value,
  placeholder = "Search",
  onChange,
  onClick,
}: SearchProps) => {
  const debounced = debounce<any>(onChange, 500);

  return (
    <div className="flex w-full items-center gap-4 text-white/20">
      <input
        type="search"
        placeholder={placeholder}
        className={classNames(
          "w-full cursor-default rounded-3xl border border-white/20 bg-black/5 px-4 py-3 text-lg font-medium text-white"
        )}
        onChange={(e) => {
          debounced?.(e.target.value);
        }}
      />

      <button
        className="rounded-3xl bg-purple-800 p-4  px-4 py-3"
        onClick={() => onClick?.(value)}
      >
        <IconAdjustmentsAlt size="1.5em" className="text-white" />
      </button>
    </div>
  );
};
