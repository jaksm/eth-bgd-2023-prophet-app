import { IconStarFilled } from "@tabler/icons-react";
import { currency } from "./formatter";

type RatingProps = {
  value: number;
  total?: number;
};

export const Rating = ({ value, total }: RatingProps) => {
  return (
    <span className="flex items-center gap-2">
      <IconStarFilled className="text-inherit text-orange-500" size="1em" />

      <strong className="font-semibold">{currency.format(value)}</strong>

      {total && (
        <span className="text-white/50">
          ({currency.format(total)}){total === 1 ? "review" : "reviews"}
        </span>
      )}
    </span>
  );
};
