import React from "react";
import Link from "next/link";
import Layout from "../components/layout";
import Header from "../components/header";
import { useAppContext } from "../Context/appContext";
import GetIsClient from "../pages/api/getIsClient";
import {
  useGetTenantConfigQuery,
  useGetNonClientDataQuery,
} from "../../src/pages/services/config";
export default function CustomSuccess() {
  const { user } = useAppContext();

  // console.log("useGetTenantConfigQuery", useGetTenantConfigQuery(data));

  return (
    <Layout story={undefined}>
      <Header title="You added your details!" zoom={undefined} />
      <br />
      <section>
        Thanks {user?.first_name} for your submission! Once propagated you'll
        see your name populated in the report.
      </section>
      <Link href="/">Go home</Link>
    </Layout>
  );
}
