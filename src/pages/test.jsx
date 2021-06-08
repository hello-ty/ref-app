import Head from "next/head";
import classes from "src/styles/Ref.module.css";

import { Header } from "src/components/Header";
import { Main } from "src/components/Main";
import { Nav } from "src/components/Nav";

import firebase from "firebase";
import { useState } from "react";

const db = firebase.firestore();
const iconRef = firebase.storage();

export default function Test() {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState({ name: "tatsuki" });
  const [urls, setUrls] = useState(null);
  console.log(avatar);

  const setImage = () => {
    // setAvatar(() => e.target.files[0]);
    iconRef
      .ref()
      .child("user-image/" + name.name)
      .put(avatar)
      .then(() => {
        console.log("win");
        iconRef
          .ref()
          .child("user-image/" + name.name)
          .getDownloadURL()
          .then((url) => {
            setUrls(url);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <Header title="テスト" />
      <Main>
        <div className={classes.container}>
          <label htmlFor="avatar">画像</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <button onClick={setImage}>送信</button>
          <img style={{ width: "100px" }} src={urls} alt="null" />
        </div>
      </Main>

      <Nav />
    </div>
  );
}
