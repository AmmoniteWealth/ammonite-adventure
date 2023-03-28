import { AppProps } from "next/app";
import { AppContext } from "../Context/appContext";

import "../styles/globals.css";

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  );
}
