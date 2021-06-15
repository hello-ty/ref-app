import Head from "next/head";
import Link from "next/link";
import styles from "src/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>

      <header>
        <h1 class="text-5xl font-bold">冷蔵庫</h1>
      </header>
      <nav>
        <Link href="/ref">
          <a>ゲストログイン</a>
        </Link>
      </nav>
    </div>
  );
}
