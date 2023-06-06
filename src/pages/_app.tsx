import { type AppType } from "next/app";
import "../styles/globals.css";
import { api } from "../utils/api";

import classNames from "classnames";
import { Roboto_Mono } from "next/font/google";
import { LayoutSidebar } from "../components/layouts/LayoutSidebar";

const font = Roboto_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext", "greek", "latin-ext"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={classNames(
        font.className,
        "bg-black/90 bg-fixed heropattern-topography-white/10"
      )}
    >
      <LayoutSidebar>
        <Component {...pageProps} />
      </LayoutSidebar>
    </main>
  );
};

export default api.withTRPC(MyApp);
