import Link from "next/link";
import Layout from "../components/layout";
import Header from "@/components/header";
import React from "react";
import { useRouter } from "next/router";
import { getIsClient } from "./api/getIsClient";
import {
  useGetTenantConfigQuery,
  useGetNonClientDataQuery,
} from "../Functions/config";

export default function Home() {
  const router = useRouter();
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
      <Header
        title={"Hello, welcome to the ammonite Goalmapper Builder"}
        zoom={undefined}
      />
      <br />
      <Link href="/s/start">Start</Link>

      <Link href="/makeYourOwn">Add your details</Link>
    </Layout>
  );
}
