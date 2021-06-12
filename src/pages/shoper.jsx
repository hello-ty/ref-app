import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import classes from "src/styles/Test.module.css";
import { useRouter } from "next/router";

import { Header } from "src/components/Header";
import { Main } from "src/components/Main";
import { Nav } from "src/components/Nav";
import { TheEmoji } from "src/components/TheEmoji";

import firebase from "firebase";
import { list } from "postcss";

const db = firebase.firestore();
const st = firebase.storage();

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
  const [photo, setPhoto] = useState(null);
  const [urls, setUrls] = useState(null);

  const data = [
    { genre: "野菜", emoji: "green_salad" },
    { genre: "肉類", emoji: "cut_of_meat" },
    { genre: "魚介類", emoji: "fish" },
    { genre: "デザート", emoji: "cake" },
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
            url: doc.url,
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
      url: e.url,
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
        food_url: dish.url,
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
  const handleRefAdd = async () => {
    if (name !== "" && genre !== "" && unit !== "") {
      await st
        .ref()
        .child("food-image/" + name)
        .put(photo)
        .then(() => {
          st.ref()
            .child("food-image/" + name)
            .getDownloadURL()
            .then((url) => {
              // setUrls(url);
              const ob = {
                food: name,
                genre: genre,
                unit: unit,
                url: url,
              };
              db.collection("foods")
                .add(ob)
                .then((ref) => {
                  setFlag02(!flag02);
                  setCh(!ch);
                });
            });
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
    <div>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <div className="flex flex-col min-h-screen font-mono">
        <header className="text-gray-600 body-font bg-blue-200 border-b border-gray-400">
          <div className="container mx-auto flex py-3 px-6 sm:flex-row ">
            <a className="flex title-font font-medium items-center text-gray-900 mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-2xl">冷蔵庫</span>
            </a>
            <div className="md:border-l md:border-gray-400 flex items-center ml-3 pl-3">
              <a class="mr-5 hover:text-gray-900 hidden sm:block">冷蔵庫</a>
              <a class="mr-5 hover:text-gray-900 hidden sm:block">買い物</a>
            </div>
          </div>
        </header>
        <div className="flex flex-col sm:flex-row flex-1">
          <nav className="text-gray-600 p-5 sm:px-5 body-font bg-blue-200 w-full order-last fixed bottom-0 border-gray-400 sm:border-t-2 sm:border-blue-200 sm:hidden sm:absolute sm:-left-10">
            <div className="flex flex-row sm:flex-col justify-between">
              <div className=" mx-auto">
                <span className="">冷蔵庫</span>
              </div>
              <div className="mx-auto">
                <span className="">買い物</span>
              </div>
            </div>
          </nav>
          <main className="text-gray-600 body-font bg-blue-50 flex-1 sm:border-l sm:border-gray-400">
            <aside className="text-gray-600 body-font">
              <div className="container py-4 px-6 mx-auto min-w-full bg-blue-200 border-b border-gray-400">
                <ul>
                  {data.map((d) => (
                    <list
                      className="bg-blue-50 mr-4 p-2 rounded-full"
                      onClick={() => handleChange(d.genre)}
                      key={d.genre}
                    >
                      <TheEmoji emoji={d.emoji} size={15} />
                      {d.genre}
                    </list>
                  ))}
                  <button onClick={() => setFlag02(!flag02)}>
                    <TheEmoji emoji="heavy_plus_sign" size={15} />
                  </button>
                </ul>
              </div>
            </aside>
            <section className="text-gray-600 body-font">
              <div className="container p-6 mx-auto">
                <div className="flex flex-wrap gap-3">
                  {foods.map((d, i) => (
                    <div
                      key={i}
                      onClick={() => handleAdd(d)}
                      className="xl:w-1/4 md:w-1/2"
                      className={classes.card}
                    >
                      <div className="bg-white p-6 rounded-lg">
                        <img
                          style={{ height: "70px", display: "block" }}
                          src={d.url}
                          alt="null"
                          className="h-20 rounded w-full object-cover object-center mb-6"
                        />
                        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                          {d.name}
                        </h2>
                        <p className="leading-relaxed text-base">{d.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
        {/* <div className={classes.card_container}> */}
        {/* 食材リスト */}
        {/* {flag ? (
          <>
            <div className={classes.modal}>
              <div className={classes.modal_container}>
                {dish.name}
                <br />
                {count}
                {dish.unit}
                <br />
                <button onClick={handlePlus}>＋</button>
                <button onClick={handleSub}>−</button>
                <br />
                <button onClick={() => setFlag(!flag)}>閉じる</button>
                <button onClick={doAction}>追加</button>
              </div>
            </div>
            <div className={classes.back} onClick={() => setFlag(!flag)}></div>
          </>
        ) : (
          ""
        )}
        {flag02 ? (
          <>
            <div className={classes.modal}>
              <div className={classes.modal_container}>
                <label htmlFor="photo">画像</label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <br />
                <label htmlFor="name">食材名</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={changeName}
                />
                <br />
                <label htmlFor="unit">単位</label>
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
            </div>
            <div
              className={classes.back}
              onClick={() => setFlag02(!flag02)}
            ></div>
          </>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
}
