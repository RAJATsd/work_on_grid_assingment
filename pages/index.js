import NewGrid from "@/Components/NewGridComp";
import Head from "next/head";
import Link from "next/link";

export default function App() {
  return (
    <>
      <Head>
        <title>WOG</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div style={{ padding: 10, fontSize: "3rem" }}>
          <Link href="/select">Go to Custom Select</Link>
        </div>
        <NewGrid boxes={29} columns={4} />
      </div>
    </>
  );
}
