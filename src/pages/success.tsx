import React from "react";
import Link from "next/link";
import Layout from "../components/layout";
import Header from "../components/header";
import { useAppContext } from "../Context/appContext";
import { getIsClient } from "./api/getIsClient";
import {
  useGetTenantConfigQuery,
  useGetNonClientDataQuery,
} from "../Functions/config";
export default function CustomSuccess() {
  const { user } = useAppContext();
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

  // console.log(
  //   "DATA from success",
  //   tenantConfig.data.config.About.Card1.intro.default
  // );
  // const _config = tenantConfig.data.config;
  // console.log("_config from success", _config);

  return (
    <>
      <Layout story={undefined}>
        <Header
          title={`Thanks ${user?.first_name} for your submission! Once propagated you'll
          see your name populated in the report.`}
          zoom={undefined}
        />
        <br />
        <section>{"Some other text"}</section>
        <Link href="/">Go home</Link>
      </Layout>
    </>
  );
}
