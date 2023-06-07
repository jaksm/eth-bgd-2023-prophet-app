import { Contract } from "@ethersproject/contracts";
import { useSigner } from "@usedapp/core";
import { utils } from "ethers";
import { type Abi } from "../../gen/types";
import WethAbi from "../abi.json";

const wethInterface = new utils.Interface(WethAbi);

export const useSignedContract = () => {
  const signer = useSigner();
  const contract = new Contract(
    "0xaa5c47cfdb3173c6e413470f429d538dac1f93d9",
    wethInterface,
    signer
  ) as Abi;

  return {
    contract,
    signer,
  };
};
