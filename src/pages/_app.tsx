import { type AppType } from "next/app";
import "../styles/globals.css";
import { api } from "../utils/api";

import classNames from "classnames";
import { Roboto_Mono } from "next/font/google";

import { DAppProvider, Goerli, Sepolia, type Config } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const font = Roboto_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext", "greek", "latin-ext"],
});

const config: Config = {
  readOnlyChainId: Sepolia.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: getDefaultProvider("sepolia"),
    [Goerli.chainId]: getDefaultProvider("goerli"),
  },
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <DAppProvider config={config}>
      <main
        className={classNames(
          font.className,
          "bg-black/90 bg-fixed heropattern-topography-white/10"
        )}
      >
        <Component {...pageProps} />
      </main>
    </DAppProvider>
  );
};

export default api.withTRPC(MyApp);
