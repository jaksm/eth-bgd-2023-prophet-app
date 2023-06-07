import { formatEther } from "@ethersproject/units";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import classNames from "classnames";
import { BigNumber } from "ethers";

type PriceProps = {
  amount?: BigNumber;
  className?: string;
};

export const Price = ({ amount, className }: PriceProps) => {
  return (
    <div className={classNames("flex items-center text-lg", className)}>
      <IconCurrencyEthereum size="1em" className="text-purple-200" />
      <strong>{formatEther(amount || 0)}</strong>
    </div>
  );
};
