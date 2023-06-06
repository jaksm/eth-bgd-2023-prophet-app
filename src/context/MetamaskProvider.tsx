import { IconSpiral } from "@tabler/icons-react";
import * as ethers from "ethers";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const provider =
  typeof window !== "undefined"
    ? new ethers.BrowserProvider((window as any).ethereum)
    : null;

export const MetamaskContext = createContext<{
  account?: string;
  balance?: string;
  error?: string;
  connectWallet: () => Promise<void>;
} | null>(null);

const { ethereum } = (typeof window !== "undefined" ? window : {}) as {
  ethereum: any;
};

const MetamaskProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>("0.0");
  const [error, setError] = useState<string>();

  const checkEthereumExists = () => {
    if (!ethereum || !provider) {
      setError("Please Install MetaMask.");
      return false;
    }
    return true;
  };

  const getConnectedAccounts = async () => {
    setIsLoading(true);

    setError("");
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      const balance = await provider!.getBalance(accounts[0]);
      const balanceInEther = ethers.formatEther(balance || 0);
      setBalance(balanceInEther);

      setAccount(accounts[0]);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const connectWallet = useCallback(async () => {
    setIsLoading(true);

    setError("");
    if (checkEthereumExists()) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } catch (err) {
        setError(err.message);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (checkEthereumExists()) {
      ethereum.on("accountsChanged", getConnectedAccounts);
      getConnectedAccounts();
    }

    return () => {
      if (checkEthereumExists()) {
        ethereum.removeListener("accountsChanged", getConnectedAccounts);
      }
    };
  }, []);

  useEffect(() => {
    if (!account && !router.pathname.includes("/connect-wallet")) {
      router.push("/connect-wallet");
      return;
    }

    if (account && router.pathname.includes("/connect-wallet")) {
      router.push("/profile");
      return;
    }
  }, [account, router]);

  const value = useMemo(() => {
    if (checkEthereumExists()) {
      return { account, error, connectWallet, balance };
    }

    return null;
  }, [account, connectWallet, error, balance]);

  return (
    <MetamaskContext.Provider value={value}>
      {isLoading ? (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white heropattern-topography-white/10">
          <IconSpiral size="64px" className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </MetamaskContext.Provider>
  );
};

export const useMetamask = () => {
  const value = useContext(MetamaskContext);

  return value;
};

export default MetamaskProvider;
