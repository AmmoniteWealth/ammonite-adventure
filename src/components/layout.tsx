import Head from "next/head";
import Link from "next/link";
import Footer from "./footer";
import styles from "./layout.module.css";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  story?: boolean;
}

export default function Layout({ children, story }: LayoutProps) {
  return (
    <>
      <Head>
        <title>ammonite and Next.js Adventure!</title>
      </Head>
      {story && <Link href="/">Go Home</Link>}
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
