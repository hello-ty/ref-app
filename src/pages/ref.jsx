import { useEffect, useState } from "react";
import Head from "next/head";
import classes from "src/styles/Ref.module.css";

import { Header } from "src/components/Header";
import { Main } from "src/components/Main";
import { Nav } from "src/components/Nav";

import firebase from "firebase";

const db = firebase.firestore();

export default function Ref() {
  const [foods, setFoods] = useState([]);

  useEffect(async () => {
    await db
      .collection("stocks")
      .get()
      .then((snapshot) => {
        let mydata = [];
        snapshot.forEach((document) => {
          const doc = document.data();
          mydata.push({
            name: doc.food_name,
            quantity: doc.food_quantity,
            genre: doc.food_genre,
            unit: doc.food_unit,
          });
        });
        setFoods(mydata);
      });
  }, []);

  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <Header title="冷蔵庫" />
      <Main>
        {foods.map((d, i) => (
          <div className={classes.card} key={i}>
            {d.name}
            {d.quantity}
            {d.genre}
            {d.unit}
          </div>
        ))}
      </Main>
      <Nav />
    </div>
  );
}
