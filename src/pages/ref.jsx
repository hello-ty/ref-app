import Head from "next/head";
import classes from "src/styles/Ref.module.css";

export default function Ref() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>

      <header className={classes.header}>冷蔵庫</header>
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
