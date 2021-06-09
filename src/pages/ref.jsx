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
  const [foods, setFoods] = useState([]);
  const [flag, setFlag] = useState(false);
  const [dish, setDish] = useState([]);
  const [count, setCount] = useState(0);
  const [now, setNow] = useState("野菜");
  const [ch, setCh] = useState(false);
  const router = useRouter();

  const data = [
    { genre: "野菜", word: "vegetable" },
    { genre: "肉類", word: "meat" },
    { genre: "魚介類", word: "fish" },
    { genre: "デザート", word: "fruit" },
  ];

  useEffect(async () => {
    await db
      .collection("stocks")
      .where("food_genre", "==", now)
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
            url: doc.food_url,
            id: document.id,
          });
        });
        setFoods(mydata);
      });
  }, [now, ch]);

  const handleAdd = useCallback((e) => {
    setDish({
      name: e.name,
      genre: e.genre,
      unit: e.unit,
      quantity: e.quantity,
      url: e.url,
      id: e.id,
    });
    setCount(e.quantity);
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
        food_url: dish.url,
      };
      foods.map((d, i) => {
        if (d.name === ob.food_name) {
          db.collection("stocks").doc(d.id).delete();
        }
      });
      db.collection("stocks")
        .add(ob)
        .then((ref) => {
          // router.reload();
          setCh(!ch);
          setFlag(!flag);
        });
    }
  };

  const doDelete = (e) => {
    db.collection("stocks")
      .doc(e.id)
      .delete()
      .then((ref) => {
        setCh(!ch);
        setFlag(!flag);
      });
  };

  const handleChange = useCallback(
    (e) => {
      console.log(e);
      setNow(() => e);
    },
    [now]
  );

  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <Header title="冷蔵庫" />
      <Main>
        <div className={classes.bar}>
          {data.map((d) => (
            <button onClick={() => handleChange(d.genre)} key={d.genre}>
              {d.genre}
            </button>
          ))}
        </div>
        <div className={classes.card_container}>
          {foods.map((d, i) => (
            <div className={classes.card} key={i} onClick={() => handleAdd(d)}>
              <img
                style={{ height: "50px", display: "block" }}
                src={d.url}
                alt="null"
              />
              {d.name}
              {d.quantity}
              {/* {d.genre} */}
              {d.unit}
            </div>
          ))}
          {flag ? (
            <>
              <div className={classes.modal}>
                <div className={classes.modal_container}>
                  <img style={{ height: "50px" }} src={dish.url} alt="null" />
                  <br />
                  {dish.name}
                  <br />
                  {/* {dish.genre} */}
                  {count}
                  {dish.unit}
                  <br />
                  <button onClick={handlePlus}>＋</button>
                  <button onClick={handleSub}>−</button>
                  {/* <button onClick={() => setFlag(!flag)}>閉じる</button> */}
                  <br />
                  <button onClick={doAction}>個数を変更</button>
                  <button onClick={() => doDelete(dish)}>削除</button>
                </div>
              </div>
              <div
                className={classes.back}
                onClick={() => setFlag(!flag)}
              ></div>
            </>
          ) : (
            ""
          )}
        </div>
      </Main>
      <Nav />
    </div>
  );
}
