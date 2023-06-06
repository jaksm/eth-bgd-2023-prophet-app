import { type AppType } from "next/app";
import "../styles/globals.css";
import { api } from "../utils/api";

import { Roboto_Mono } from "next/font/google";

const font = Roboto_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext", "greek", "latin-ext"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
