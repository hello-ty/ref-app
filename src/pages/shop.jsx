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
  const [flag02, setFlag02] = useState(false);
  const [foods, setFoods] = useState([]);
  const [dish, setDish] = useState([]);
  const [count, setCount] = useState(0);
  const [stock, setStock] = useState([]);
  const [now, setNow] = useState("野菜");
  const router = useRouter();
  // input要素
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [genre, setGenre] = useState("");

  const data = [
    { genre: "野菜", word: "vegetable" },
    { genre: "肉類", word: "meat" },
    { genre: "魚介類", word: "fish" },
    { genre: "デザート", word: "fruit" },
  ];

  useEffect(async () => {
    await db
      .collection("foods")
      .where("genre", "==", now)
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
  }, [now]);

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

  const handleChange = useCallback(
    (e) => {
      console.log(e);
      setNow(() => e);
    },
    [now]
  );

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

  // input処理
  const handleRefAdd = () => {
    if (name !== "" && quantity !== 0 && genre !== "" && unit !== "") {
      const ob = {
        food_name: name,
        food_quantity: quantity,
        food_genre: genre,
        food_unit: unit,
      };
      db.collection("stocks")
        .add(ob)
        .then((ref) => {
          setFlag02(!flag02);
        });
    } else {
      alert("未入力部分があります");
      return;
    }
  };

  const handleSelect = useCallback((e) => {
    setGenre(e.target.value);
  });

  const changeName = useCallback((e) => {
    setName(e.target.value.trim());
  }, []);

  const changeQuantity = useCallback((e) => {
    setQuantity(e.target.value.trim());
  }, []);

  const changeUnit = useCallback((e) => {
    setUnit(e.target.value.trim());
  }, []);

  return (
    <div className={classes.container}>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <Header title="買い物" />
      <Main>
        <div className={classes.bar}>
          {data.map((d) => (
            <button onClick={() => handleChange(d.genre)} key={d.genre}>
              {d.genre}
            </button>
          ))}
          <button onClick={() => setFlag02(!flag02)}>+</button>
        </div>
        <div className={classes.card_container}>
          {foods.map((d, i) => (
            <div className={classes.card} key={i} onClick={() => handleAdd(d)}>
              {d.name}/{d.unit}
            </div>
          ))}
          {flag ? (
            <div>
              {dish.name}
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
          {flag02 ? (
            <div>
              <label htmlFor="name">食材名</label>
              <input
                name="name"
                type="text"
                value={name}
                onChange={changeName}
              />
              <label htmlFor="number">数量</label>
              <input
                name="number"
                type="number"
                value={quantity}
                onChange={changeQuantity}
              />
              <label htmlFor="unit">単位</label>
              <input
                name="unit"
                type="text"
                value={unit}
                onChange={changeUnit}
              />
              <label htmlFor="genre">分類</label>
              <select name="genre" value={genre} onChange={handleSelect}>
                {data.map((d, i) => (
                  <option key={d.genre}>{d.genre}</option>
                ))}
              </select>
              <button onClick={() => setFlag02(!flag02)}>閉じる</button>
              <button onClick={() => handleRefAdd()}>追加</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Main>

      <Nav />
    </div>
  );
}
