import Head from "next/head";
import { Header } from "src/components/Header";
import { Main } from "src/components/Main";
import { Nav } from "src/components/Nav";
import classes from "src/styles/Ref.module.css";

export default function Ref() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <Header title="冷蔵庫" />
      <Main />
      <Nav />
    </div>
  );
}
