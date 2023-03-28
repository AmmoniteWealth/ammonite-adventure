import Link from "next/link";
import Layout from "../components/layout";
import Header from "../components/header";
import UserForm from "../components/form";

export default function Custom() {
  return (
    <Layout story={undefined}>
      <Header title="Add your details" zoom={undefined} />
      <section>Fill out the form to be added to the database!</section>
      <br></br>
      <UserForm />
      If not? <br />
      <Link href="/">Go Home</Link>
    </Layout>
  );
}
