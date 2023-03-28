import Link from "next/link";
import Layout from "../components/layout";
import Header from "../components/header";
import { useAppContext } from "../Context/appContext";
import React from "react";

export default function Home(): JSX.Element {
  const user = useAppContext();

  type LayoutProps = {
    children: React.ReactNode;
    story?: any;
  };

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
