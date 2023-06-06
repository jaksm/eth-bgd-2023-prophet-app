import { IconCurrencyEthereum } from "@tabler/icons-react";
import classNames from "classnames";
import { currency } from "./formatter";

type PriceProps = {
  amount: number;
  className?: string;
};

export const Price = ({ amount, className }: PriceProps) => {
  return (
    <div className={classNames("flex items-center text-lg", className)}>
      <IconCurrencyEthereum size="1em" className="text-purple-200" />
      <strong>{currency.format(amount)}</strong>
    </div>
  );
};
