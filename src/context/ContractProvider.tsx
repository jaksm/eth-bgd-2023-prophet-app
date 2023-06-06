import { ethers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ABI from "../abi.json";
import { provider } from "./MetamaskProvider";

type ContractMethods =
  | Awaited<ReturnType<typeof getMethods>>
  | null
  | undefined;
type TContractContext = ContractMethods;

export const ContractContext = createContext<TContractContext | null>(null);

const getMethods = async (signedContract?: ethers.BaseContract) => {
  if (!signedContract) {
    return null;
  }

  const getOwner = signedContract.getFunction("owner") as () => Promise<string>;
  const getDeal = signedContract.getFunction("deals") as (
    index: number
  ) => Promise<any>;

  return {
    getOwner,
    getDeal,
  };
};

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [methods, setMethods] = useState<ContractMethods>(null);

  const getSignedContract = useCallback(async () => {
    const contract = new ethers.Contract(
      "0xafb8ef1a390c65d15350a3dc7bade21957359e91",
      ABI,
      provider
    );

    const signer = await provider?.getSigner();

    if (signer) {
      return contract.connect(signer);
    }
  }, []);

  const loadMethods = useCallback(async () => {
    const signedContract = await getSignedContract();
    const methods = await getMethods(signedContract);

    setMethods(methods);
  }, [getSignedContract]);

  useEffect(() => {
    loadMethods();
  }, [loadMethods]);

  const value = useMemo(
    () => ({
      ...methods,
    }),
    [methods]
  );

  return (
    <ContractContext.Provider value={value as Required<ContractMethods>}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => useContext(ContractContext);
