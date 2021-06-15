import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import classes from "src/styles/Ref.module.css";
import { useRouter } from "next/router";
import "src/components/fire";
import firebase from "firebase";
import { TheEmoji } from "src/components/TheEmoji";
import Link from "next/link";
import clsx from "clsx";

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
    { genre: "野菜", emoji: "green_salad" },
    { genre: "肉類", emoji: "cut_of_meat" },
    { genre: "魚介類", emoji: "fish" },
    { genre: "デザート", emoji: "cake" },
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
    <div>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <div className="flex flex-col min-h-screen font-mono">
        <header className="text-gray-600 body-font bg-blue-200 border-b border-gray-400">
          <div className="container mx-auto flex py-3 px-6 sm:flex-row">
            <a className="flex title-font font-medium items-center text-gray-900 mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full cursor-pointer"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-2xl cursor-pointer">冷蔵庫</span>
            </a>
            <div className="md:border-l md:border-gray-400 flex items-center ml-3 pl-3">
              <Link href={"/ref"}>
                <a class="mr-5 hover:text-gray-900 hidden sm:block">冷蔵庫</a>
              </Link>
              <Link href={"/shop"}>
                <a class="mr-5 hover:text-gray-900 hidden sm:block">買い物</a>
              </Link>
            </div>
          </div>
        </header>
        <div className="flex flex-col sm:flex-row flex-1">
          <nav className="text-gray-600 p-5 sm:px-5 body-font bg-blue-200 w-full order-last fixed bottom-0 border-gray-400 sm:border-t-2 sm:border-blue-200 sm:hidden sm:absolute sm:-left-10">
            <div className="flex flex-row sm:flex-col justify-between">
              <Link href={"/ref"}>
                <span className="mx-auto cursor-pointer">冷蔵庫</span>
              </Link>
              <Link href={"/shop"}>
                <span className="mx-auto cursor-pointer">買い物</span>
              </Link>
              <Link href={"/ref"}>
                <span className="mx-auto cursor-pointer">なうレピ</span>
              </Link>
              <Link href={"/ref"}>
                <span className="mx-auto cursor-pointer">レシピ</span>
              </Link>
            </div>
          </nav>
          <main className="text-gray-600 body-font bg-blue-50 flex-1 sm:border-l sm:border-gray-400">
            <aside className="text-gray-600 body-font">
              <div className="container py-4 px-6 mx-auto min-w-full bg-blue-200 border-b border-gray-400">
                <ul>
                  {data.map((d) => (
                    <list
                      className="bg-blue-50 mr-2 py-2 px-3 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={() => handleChange(d.genre)}
                      key={d.genre}
                    >
                      <span className="mr-1 -pb-4 -pt-4">
                        <TheEmoji emoji={d.emoji} size={15} />
                      </span>
                      {d.genre}
                    </list>
                  ))}
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
                      className={clsx(
                        "xl:w-1/4 md:w-1/2 cursor-pointer",
                        classes.card
                      )}
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
                        <p className="leading-relaxed text-base">
                          {d.quantity}
                          {d.unit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
        {flag ? (
          <>
            <div
              className={clsx(
                "text-gray-600 body-font container w-24",
                classes.modal
              )}
            >
              <div className="p-6">
                <img
                  style={{ height: "70px", display: "block" }}
                  src={dish.url}
                  alt="null"
                  className="h-20 rounded w-full object-cover object-center mb-6"
                />
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {dish.name}
                </h2>
                <div className="container mb-5">
                  <span className="text-2xl bg-blue-200 py-2 px-3 rounded-full">
                    {count}
                  </span>
                  <span className="text-2xl p-2">{dish.unit}</span>
                </div>
                <div className="container mb-3">
                  <button
                    onClick={handlePlus}
                    className=" mx-auto mr-2 text-gray-600 bg-blue-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
                  >
                    +1
                  </button>
                  <button
                    onClick={handleSub}
                    className=" mx-auto text-gray-600 bg-blue-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
                  >
                    -1
                  </button>
                </div>
                <div className="container mb-3">
                  <button
                    onClick={() => doDelete(dish)}
                    className=" mx-auto mr-2 text-gray-600 bg-blue-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base"
                  >
                    冷蔵庫から削除
                  </button>
                  <button
                    onClick={doAction}
                    className=" mx-auto text-gray-600 bg-blue-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base"
                  >
                    個数を変更
                  </button>
                </div>
              </div>
            </div>
            <div className={classes.back} onClick={() => setFlag(!flag)}></div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
