import { useState } from "react";
import { useContract } from "../context/ContractProvider";

export const useFeed = () => {
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);

  const contract = useContract();

  const next = async () => {
    const data = await Promise.all(
      Array.from({ length: take }, (_, i) => i + skip).map((i) => {
        return contract?.getDeal?.(i);
      })
    );

    console.log("data", data);
    // setData(data.map((d) => d));
  };

  return {
    next,
    data,
  };
};
