import { useCallback, useEffect, useState } from "react"
import classes from "src/styles/Ref.module.css"
import "src/components/fire"
import firebase from "firebase"
import clsx from "clsx"
import Layout from "src/components/Layout"

const db = firebase.firestore()

export default function Ref() {
  const [foods, setFoods] = useState([])
  const [flag, setFlag] = useState(false)
  const [dish, setDish] = useState([])
  const [count, setCount] = useState(0)
  const [now, setNow] = useState("野菜")
  const [ch, setCh] = useState(false)

  useEffect(async () => {
    await db
      .collection("stocks")
      .where("food_genre", "==", now)
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
            url: doc.food_url,
            id: document.id,
          })
        })
        setFoods(mydata)
      })
  }, [now, ch])

  const handleAdd = useCallback((e) => {
    setDish({
      name: e.name,
      genre: e.genre,
      unit: e.unit,
      quantity: e.quantity,
      url: e.url,
      id: e.id,
    })
    setCount(e.quantity)
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
      foods.map((d, i) => {
        if (d.name === ob.food_name) {
          db.collection("stocks").doc(d.id).delete()
        }
      })
      db.collection("stocks")
        .add(ob)
        .then((ref) => {
          // router.reload();
          setCh(!ch)
          setFlag(!flag)
        })
    }
  }

  const doDelete = (e) => {
    db.collection("stocks")
      .doc(e.id)
      .delete()
      .then((ref) => {
        setCh(!ch)
        setFlag(!flag)
      })
  }

  return (
    <Layout setNow={setNow} now={now} title="冷蔵庫" bgcolor="blue">
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
                  <div className="flex">
                    <p className="leading-relaxed text-base bg-blue-200 rounded-full py-3 px-4">
                      {d.quantity}
                    </p>
                    <p className="p-3">{d.unit}</p>
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
                  className=" mx-auto mr-2 text-gray-600 bg-blue-200 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base"
                >
                  全て捨てる
                </button>
                <button
                  onClick={doAction}
                  className=" mx-auto text-gray-600 bg-blue-200 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base"
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
    </Layout>
  )
}
