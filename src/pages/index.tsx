import Link from "next/link";
import Layout from "../components/layout";
import Header from "@/components/header";
import React from "react";
import tenantConfig from "../pages/api/tenantConfig.json";
// import { getIsClient } from "./api/getIsClient";
// import {
//   useGetTenantConfigQuery,
//   useGetNonClientDataQuery,
// } from "../Functions/config";

export default function Home() {
  // const hostname =
  //   (typeof window !== "undefined" && window.location.hostname) || "localhost";

  // const { data: tenantConfig, isFetching: isFetchingTenantConfig } =
  //   useGetTenantConfigQuery(hostname, {
  //     skip: false,
  //     pollingInterval: 0,
  //     refetchOnMountOrArgChange: false,
  //     refetchOnFocus: false,
  //     refetchOnReconnect: false,
  //   });

  // const { data: nonClientData, isFetching: isFetchingNonClientData } =
  //   useGetNonClientDataQuery(hostname);

  // if (isFetchingTenantConfig || isFetchingNonClientData)
  //   return <div>Loading...</div>;

  // if (!tenantConfig || !nonClientData) return <div>Missing config!</div>;

  // console.log("DATA", tenantConfig.data.config.About.Card1.intro.default);
  // const _config = tenantConfig.data.config;
  // console.log("_config", _config);
  const config = tenantConfig;
  console.log("tenantConfig", tenantConfig);
  const _initialConfig = tenantConfig.data.config;
  console.log("tenantConfig 2 _initialConfig", _initialConfig);
  return (
    <Layout story={undefined}>
      <Header title={"Hello"} zoom={undefined} />
      <br />
      <Link href="/s/start">Start</Link>
      <Link href="/makeYourOwn">Add your details</Link>
    </Layout>
  );
}
