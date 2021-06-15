import { useCallback, useEffect, useState } from "react"
import classes from "src/styles/Ref.module.css"
import "src/components/fire"
import firebase from "firebase"
import clsx from "clsx"
import Layout from "src/components/Layout"
import EditModal from "src/components/Ref/EditModal"

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
      <EditModal
        dish={dish}
        flag={flag}
        setFlag={setFlag}
        setCount={setCount}
        ch={ch}
        setCh={setCh}
        count={count}
        foods={foods}
      />
    </Layout>
  )
}
