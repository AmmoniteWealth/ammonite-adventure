import React from "react";
import Image from "next/image";
export default function Footer() {
  return (
    <>
      <footer>
        Made by{" "}
        <Image
          src="/ammoniteLogo.png"
          alt="ammonite logo"
          className="logo"
          width="110"
          height="70"
        ></Image>
      </footer>
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 3px solid #3a93af;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .logo {
          height: 5em;
          margin: 5px;
        }
      `}</style>
    </>
  );
}
