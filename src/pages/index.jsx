import Head from "next/head";
import Link from "next/link";
// import { useCallback, useState } from "react";
import styles from "src/styles/Home.module.css";

export default function Home() {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [comfirmPassword, setComfirmPassword] = useState("");

  // const inputUsername = useCallback(
  //   (event) => {
  //     setUsername(event.target.value);
  //   },
  //   [setUsername]
  // );

  // const inputEmail = useCallback(
  //   (event) => {
  //     setEmail(event.target.value);
  //   },
  //   [setEmail]
  // );

  // const inputPassword = useCallback(
  //   (event) => {
  //     setPassword(event.target.value);
  //   },
  //   [setPassword]
  // );

  // const inputComfirmPassword = useCallback(
  //   (event) => {
  //     setComfirmPassword(event.target.value);
  //   },
  //   [setComfirmPassword]
  // );

  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>

      <header>
        <h1>冷蔵庫</h1>
      </header>
      {/* <label htmlFor="username">ユーザーネーム</label>
      <input
        type="text"
        name="username"
        onChange={inputUsername}
        value={username}
      />
      <br />
      <label htmlFor="email">メールアドレス</label>
      <input type="text" name="email" onChange={inputEmail} value={email} />
      <br />
      <label htmlFor="password">パスワード</label>
      <input
        type="text"
        name="password"
        onChange={inputPassword}
        value={password}
      />
      <br />
      <label htmlFor="comfirmpassword">確認用パスワード</label>
      <input
        type="text"
        name="comfirmpassword"
        onChange={inputComfirmPassword}
        value={comfirmPassword}
      />
      <br />
      <button onClick={() => console.log("Clicked!")}>
        アカウントを登録する
      </button> */}
      <nav>
        <Link href="/ref">
          <a>ゲストログイン</a>
        </Link>
      </nav>
    </div>
  );
}
