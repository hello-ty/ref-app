import { useCallback, useEffect, useState } from "react"
import classes from "src/styles/Ref.module.css"
import { useRouter } from "next/router"
import { TheEmoji } from "src/components/TheEmoji"
import firebase from "firebase"
import "src/components/fire"
import clsx from "clsx"
import Layout from "src/components/Layout"

const db = firebase.firestore()
const st = firebase.storage()

export default function Shop() {
  const [flag, setFlag] = useState(false)
  const [flag02, setFlag02] = useState(false)
  const [ch, setCh] = useState(false)
  const [foods, setFoods] = useState([])
  const [dish, setDish] = useState([])
  const [count, setCount] = useState(0)
  const [stock, setStock] = useState([])
  const [now, setNow] = useState("野菜")
  const router = useRouter()
  // input要素
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("")
  const [genre, setGenre] = useState("")
  const [photo, setPhoto] = useState(null)

  const genres = [
    { genre: "未選択" },
    { genre: "野菜" },
    { genre: "肉類" },
    { genre: "魚介類" },
    { genre: "デザート" },
  ]

  const units = [
    { union: "未選択" },
    { union: "個" },
    { union: "匹" },
    { union: "g" },
    { union: "ml" },
  ]

  useEffect(async () => {
    await db
      .collection("foods")
      .where("genre", "==", now)
      .get()
      .then((snapshot) => {
        let mydata = []
        snapshot.forEach((document) => {
          const doc = document.data()
          mydata.push({
            name: doc.food,
            genre: doc.genre,
            unit: doc.unit,
            url: doc.url,
          })
        })
        setFoods(mydata)
      })
  }, [now, ch])

  useEffect(async () => {
    await db
      .collection("stocks")
      .get()
      .then((snapshot) => {
        let mydata = []
        snapshot.forEach((document) => {
          const doc = document.data()
          mydata.push({
            name: doc.food_name,
            quantity: doc.food_quantity,
            genre: doc.food_genre,
            unit: doc.food_unit,
            id: document.id,
          })
        })
        setStock(mydata)
      })
  }, [])

  const handleAdd = useCallback((e) => {
    setDish({
      name: e.name,
      genre: e.genre,
      unit: e.unit,
      url: e.url,
      quantity: 0,
    })
    setCount(0)
    return setFlag(true)
  }, [])

  const handlePlus = useCallback(() => {
    setCount((prevCount) => prevCount + 1)
  }, [count])

  const handleSub = useCallback(() => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    }
  }, [count])

  const doAction = (e) => {
    if (count > 0) {
      const ob = {
        food_name: dish.name,
        food_quantity: count,
        food_genre: dish.genre,
        food_unit: dish.unit,
        food_url: dish.url,
      }
      stock.map((d, i) => {
        if (d.name === ob.food_name) {
          ob.food_quantity += d.quantity
          db.collection("stocks").doc(d.id).delete()
        }
      })
      db.collection("stocks")
        .add(ob)
        .then((ref) => {
          router.push("/ref")
        })
    }
  }

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
              }
              db.collection("foods")
                .add(ob)
                .then((ref) => {
                  setFlag02(!flag02)
                  setCh(!ch)
                })
            })
        })
    } else {
      alert("未入力部分があります")
      return
    }
  }

  const handleSelect = useCallback((e) => {
    setGenre(e.target.value)
  })

  const changeName = useCallback((e) => {
    setName(e.target.value.trim())
  }, [])

  const handleSelect02 = useCallback((e) => {
    setUnit(e.target.value)
  }, [])

  return (
    <Layout setNow={setNow} now={now} title="買い物" bgcolor="yellow">
      <section className="text-gray-600 body-font">
        <div className="container p-6 mx-auto">
          <div className="flex flex-wrap gap-3">
            <div
              onClick={() => setFlag02(!flag02)}
              className={clsx("xl:w-1/4 md:w-1/2 cursor-pointer", classes.card)}
            >
              <p
                className={clsx(
                  "bg-gray-300 hover:bg-gray-200 rounded-lg",
                  classes.add
                )}
              >
                食材カード
              </p>
            </div>
            {foods.map((d, i) => (
              <div key={i} className={clsx("xl:w-1/4 md:w-1/2", classes.card)}>
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
                  <div className="flex justify-between">
                    <p className="leading-relaxed text-base rounded-full bg-yellow-200 pt-3 px-4">
                      {d.unit}
                    </p>
                    <p
                      onClick={() => handleAdd(d)}
                      className="cursor-pointer hover:bg-yellow-200 pt-2 pl-2 pr-1 rounded-full"
                    >
                      <TheEmoji emoji="shopping_trolley" size={35} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
                <span className="text-2xl bg-yellow-200 py-2 px-3 rounded-full">
                  {count}
                </span>
                <span className="text-2xl p-2">{dish.unit}</span>
              </div>
              <div className="container mb-3">
                <button
                  onClick={handlePlus}
                  className=" mx-auto mr-2 text-gray-600 bg-yellow-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
                >
                  +1
                </button>
                <button
                  onClick={handleSub}
                  className=" mx-auto text-gray-600 bg-yellow-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
                >
                  -1
                </button>
              </div>
              <div className="container mb-3">
                <button
                  onClick={() => setFlag(!flag)}
                  className="mx-auto mr-2 text-gray-600 bg-yellow-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
                >
                  閉じる
                </button>
                <button
                  onClick={doAction}
                  className=" mx-auto text-gray-600 bg-yellow-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
                >
                  冷蔵庫に追加
                </button>
              </div>
            </div>
          </div>
          <div className={classes.back} onClick={() => setFlag(!flag)}></div>
        </>
      ) : (
        ""
      )}
      {flag02 ? (
        <>
          <div
            className={clsx(
              "text-gray-600 body-font container w-24",
              classes.modal
            )}
          >
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="photo">画像</label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name">食材名</label>
                <input
                  name="name"
                  autocomplete="off"
                  type="text"
                  value={name}
                  onChange={changeName}
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="unit" className="mr-2">
                  単位(g/ml/個...)
                </label>
                <select
                  name="unit"
                  value={unit}
                  onChange={handleSelect02}
                  className="rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                >
                  {units.map((d, i) => (
                    <option key={d.union}>{d.union}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="genre" className="mr-2">
                  分類(野菜...)
                </label>
                <select
                  name="genre"
                  value={genre}
                  onChange={handleSelect}
                  className="rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                >
                  {genres.map((d, i) => (
                    <option key={d.genre}>{d.genre}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setFlag02(!flag02)}
                className="mx-auto mr-2 text-gray-600 bg-yellow-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
              >
                閉じる
              </button>
              <button
                onClick={() => handleRefAdd()}
                className="mx-auto mr-2 text-gray-600 bg-yellow-200 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg"
              >
                カード追加
              </button>
            </div>
          </div>
          <div
            className={classes.back}
            onClick={() => setFlag02(!flag02)}
          ></div>
        </>
      ) : (
        ""
      )}
    </Layout>
  )
}
