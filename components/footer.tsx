export default function Footer() {
  return (
    <>
      <footer>
        Made by{" "}
        <img src="ammoniteLogo.png" alt="ammonite logo" className="logo" />
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
