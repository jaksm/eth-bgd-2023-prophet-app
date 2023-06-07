import { Contract } from "@ethersproject/contracts";
import { useSigner } from "@usedapp/core";
import { utils } from "ethers";
import { type Abi } from "../../gen/types";
import WethAbi from "../abi.json";

const wethInterface = new utils.Interface(WethAbi);

export const useSignedContract = () => {
  const signer = useSigner();
  const contract = new Contract(
    "0x9a03375f1f4E18AcF009005771A3ECc67Fe4D456",
    wethInterface,
    signer
  ) as Abi;

  return {
    contract,
    signer,
  };
};
