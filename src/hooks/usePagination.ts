import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useEthers, useSigner } from "@usedapp/core";
import { utils } from "ethers";
import { useState } from "react";
import { type Abi } from "../../gen/types";
import WethAbi from "../abi.json";

const wethInterface = new utils.Interface(WethAbi);

export const useContract = () => {
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);

  const { account } = useEthers();
  const signer = useSigner();
  const contract = new Contract(
    "0x9a03375f1f4E18AcF009005771A3ECc67Fe4D456",
    wethInterface,
    signer
  ) as Abi;

  const createDeal = useContractFunction(contract, "createDeal", {
    transactionName: "Wrap",
  });

  return {
    createDeal,
  };
};
