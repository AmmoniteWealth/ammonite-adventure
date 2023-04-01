import Link from "next/link";
import Layout from "../components/layout";
import Header from "@/components/header";
import React from "react";
import Image from "next/image";
import { getIsClient } from "./api/getIsClient";
import { useRouter } from "next/router";
import {
  useGetTenantConfigQuery,
  useGetNonClientDataQuery,
} from "../Functions/config";

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
  console.log("DATA", tenantConfig.data.config.About.Card1.intro.default);
  const _config = tenantConfig.data.config;
  console.log("_config", _config);

  return (
    <Layout story={undefined}>
      <img src={getIsClient(_config.Login.logo)} height="50"></img>
      <Header title={getIsClient(_config.About.Card2.intro)} zoom={undefined} />
      <br />
      <Link href="/s/start">Version 1</Link>
      <Link href="/s/start">Version 2</Link>
      <Link href="/makeYourOwn">Add your details</Link>
    </Layout>
  );
}
