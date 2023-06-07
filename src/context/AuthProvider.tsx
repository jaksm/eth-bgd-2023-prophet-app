import { useEthers } from "@usedapp/core";
import { useRouter } from "next/router";
import { createContext, useEffect, type ReactNode } from "react";
import { api } from "../utils/api";

export const WalletProviderContext = createContext(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isLoading, account } = useEthers();

  const updateWalletMutation = api.users.updateAddress.useMutation();

  const onAccountsChanged = async (accounts: string[]) => {
    if (accounts.length) {
      await updateWalletMutation.mutateAsync({
        address: accounts[0],
      });

      if (router.pathname === "/connect-wallet") {
        router.push("/");
      }
    } else {
      router.push("/connect-wallet");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).ethereum.on("accountsChanged", onAccountsChanged);
      onAccountsChanged(account ? [account] : []);
    }

    return () => {
      if (typeof window !== "undefined") {
        (window as any).ethereum.removeListener(
          "accountsChanged",
          onAccountsChanged
        );
      }
    };
  }, []);

  return (
    <WalletProviderContext.Provider value={null}>
      {isLoading ? "Loading..." : children}
    </WalletProviderContext.Provider>
  );
};

export const useWallet = () => {
  const { activateBrowserWallet, deactivate } = useEthers();
  const { active, isLoading } = useEthers();

  return {
    active,
    isLoading,
    connect: activateBrowserWallet,
    disconnect: deactivate,
  };
};
