import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import classes from "src/styles/Ref.module.css";
import { useRouter } from "next/router";

import { Header } from "src/components/Header";
import { Main } from "src/components/Main";
import { Nav } from "src/components/Nav";

import firebase from "firebase";

const db = firebase.firestore();

export default function Ref() {
  const [flag, setFlag] = useState(false);
  const [foods, setFoods] = useState([]);
  const [dish, setDish] = useState([]);
  const [count, setCount] = useState(0);
  const [stock, setStock] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    await db
      .collection("foods")
      .get()
      .then((snapshot) => {
        let mydata = [];
        snapshot.forEach((document) => {
          const doc = document.data();
          mydata.push({
            name: doc.food,
            genre: doc.genre,
            unit: doc.unit,
          });
        });
        setFoods(mydata);
      });
  }, []);

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
            id: document.id,
          });
        });
        setStock(mydata);
      });
  }, []);

  const handleAdd = useCallback((e) => {
    setDish({
      name: e.name,
      genre: e.genre,
      unit: e.unit,
      quantity: 0,
    });
    setCount(0);
    return setFlag(true);
  }, []);

  const handlePlus = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [count]);

  const handleSub = useCallback(() => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  }, [count]);

  const doAction = (e) => {
    if (count > 0) {
      const ob = {
        food_name: dish.name,
        food_quantity: count,
        food_genre: dish.genre,
        food_unit: dish.unit,
      };
      stock.map((d, i) => {
        if (d.name === ob.food_name) {
          ob.food_quantity += d.quantity;
          db.collection("stocks").doc(d.id).delete();
        }
      });
      db.collection("stocks")
        .add(ob)
        .then((ref) => {
          router.push("/ref");
        });
    }
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <Header title="冷蔵庫" />
      <Main>
        {foods.map((d, i) => (
          <div className={classes.card} key={i} onClick={() => handleAdd(d)}>
            {d.name}
            {/* {d.genre} */}
            {/* {d.unit} */}
          </div>
        ))}
        {flag ? (
          <div>
            {dish.name}
            {/* {dish.genre} */}
            <button onClick={handlePlus}>＋</button>
            <button onClick={handleSub}>−</button>
            {count}
            {dish.unit}
            <button onClick={() => setFlag(!flag)}>閉じる</button>
            <button onClick={doAction}>追加</button>
          </div>
        ) : (
          ""
        )}
      </Main>

      <Nav />
    </div>
  );
}
