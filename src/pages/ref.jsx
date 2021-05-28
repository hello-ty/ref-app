import Head from "next/head";
import { Header } from "src/components/Header";
import classes from "src/styles/Ref.module.css";

export default function Ref() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>

      <Header title="冷蔵庫" />
      <main className={classes.main}>fooo</main>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li className={classes.li}>list1</li>
          <li className={classes.li}>list2</li>
          <li className={classes.li}>list3</li>
          <li className={classes.li}>list4</li>
        </ul>
      </nav>
    </div>
  );
}
