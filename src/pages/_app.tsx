import { AppProps } from "next/app";
import { AppContext } from "../Context/appContext";
import { Provider } from "react-redux";

import { store } from "../store";
import React from "react";
import "../styles/globals.css";

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppContext>
        <Component {...pageProps} />
      </AppContext>
    </Provider>
  );
}
