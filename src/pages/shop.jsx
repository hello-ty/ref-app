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
  const [ch, setCh] = useState(false);
  const [foods, setFoods] = useState([]);
  const [dish, setDish] = useState([]);
  const [count, setCount] = useState(0);
  const [stock, setStock] = useState([]);
  const [now, setNow] = useState("野菜");
  const router = useRouter();
  // input要素
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [genre, setGenre] = useState("");

  const data = [
    { genre: "野菜", word: "vegetable" },
    { genre: "肉類", word: "meat" },
    { genre: "魚介類", word: "fish" },
    { genre: "デザート", word: "fruit" },
  ];

  const genres = [
    { genre: "未選択" },
    { genre: "野菜" },
    { genre: "肉類" },
    { genre: "魚介類" },
    { genre: "デザート" },
  ];

  const units = [
    { union: "未選択" },
    { union: "個" },
    { union: "匹" },
    { union: "g" },
    { union: "ml" },
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
  }, [now, ch]);

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
    if (name !== "" && genre !== "" && unit !== "") {
      const ob = {
        food: name,
        genre: genre,
        unit: unit,
      };
      db.collection("foods")
        .add(ob)
        .then((ref) => {
          setFlag02(!flag02);
          setCh(!ch);
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

  const handleSelect02 = useCallback((e) => {
    setUnit(e.target.value);
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
              <br />
              <label htmlFor="unit">分類</label>
              <select name="unit" value={unit} onChange={handleSelect02}>
                {units.map((d, i) => (
                  <option key={d.union}>{d.union}</option>
                ))}
              </select>
              <br />
              <label htmlFor="genre">分類</label>
              <select name="genre" value={genre} onChange={handleSelect}>
                {genres.map((d, i) => (
                  <option key={d.genre}>{d.genre}</option>
                ))}
              </select>
              <br />
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
