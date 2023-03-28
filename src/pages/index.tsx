import Link from "next/link";
import Layout from "../components/layout";
import Header from "../components/header";
import { useAppContext } from "../Context/appContext";
import React from "react";

import {
  useGetTenantConfigQuery,
  useGetNonClientDataQuery,
} from "../../src/pages/services/config";

export default function Home() {
  const hostname =
    (typeof window !== "undefined" && window.location.hostname) || "localhost";

  const { data: tenantConfig, isFetching: isFetchingTenantConfig } =
    useGetTenantConfigQuery(hostname, {
      skip: false,
      pollingInterval: 0,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const { data: nonClientData, isFetching: isFetchingNonClientData } =
    useGetNonClientDataQuery(hostname);

  if (isFetchingTenantConfig || isFetchingNonClientData)
    return <div>Loading...</div>;

  if (!tenantConfig || !nonClientData) return <div>Missing config!</div>;

  const user = useAppContext();

  // type LayoutProps = {
  //   children: React.ReactNode;
  //   story?: any;
  // };
  console.log("DATA", tenantConfig.data.config.About.Card1.intro.default);
  return (
    <Layout story={undefined}>
      <Header
        title={`Welcome to ammonite! Add your details to see them displayed in your ammonite adventure`}
        zoom={undefined}
      />
      <br />
      <Link href="/s/start">Start</Link>
      <Link href="/makeYourOwn">Add your details</Link>
    </Layout>
  );
}
