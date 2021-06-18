import clsx from "clsx"
import { useEffect, useState } from "react"
import Layout from "src/components/Layout"
import classes from "src/styles/Ref.module.css"
import firebase from "firebase"
import "src/components/fire"

const db = firebase.firestore()

export default function Recipe() {
  const [recipe, setRecipe] = useState([])
  const [mate, setMate] = useState([])
  const [now, setNow] = useState("野菜")

  useEffect(async () => {
    await db
      .collection("recipes")
      .where("genre", "==", now)
      .get()
      .then((snapshot) => {
        let mydata = []
        snapshot.forEach((document) => {
          const doc = document.data()
          // mydata.push({
          //   name: doc.name,
          //   genre: doc.genre,
          //   atea: doc.atea,
          // })
          mydata.push(doc)
        })
        setRecipe(mydata)
      })
  }, [now])

  console.log(recipe)

  return (
    <Layout title="レシピ" bgcolor="red" setNow={setNow}>
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
                レシピカード
              </p>
            </div>
            {recipe.map((d, i) => (
              <div key={i} className={clsx("xl:w-1/4 md:w-1/2", classes.card)}>
                <div className="bg-white p-6 rounded-lg">
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    {d.name}
                  </h2>
                  <div className="flex justify-between">
                    <p className="leading-relaxed text-base rounded-full bg-yellow-200 pt-3 px-4">
                      {d.unit}
                    </p>
                    <p className="leading-relaxed text-base rounded-full bg-yellow-200 pt-3 px-4">
                      {d.material}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
