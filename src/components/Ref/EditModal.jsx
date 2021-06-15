import { useCallback } from "react"
import classes from "src/styles/Ref.module.css"
import "src/components/fire"
import firebase from "firebase"
import clsx from "clsx"

const db = firebase.firestore()

export default function EditModal(props) {
  const handlePlus = useCallback(() => {
    props.setCount((prevCount) => prevCount + 1)
  }, [props.count])

  const handleSub = useCallback(() => {
    if (props.count > 0) {
      props.setCount((prevCount) => prevCount - 1)
    }
  }, [props.count])

  const doAction = (e) => {
    if (props.count > 0) {
      const ob = {
        food_name: props.dish.name,
        food_quantity: props.count,
        food_genre: props.dish.genre,
        food_unit: props.dish.unit,
        food_url: props.dish.url,
      }
      props.foods.map((d, i) => {
        if (d.name === ob.food_name) {
          db.collection("stocks").doc(d.id).delete()
        }
      })
      db.collection("stocks")
        .add(ob)
        .then((ref) => {
          // router.reload();
          props.setCh(!props.ch)
          props.setFlag(!props.flag)
        })
    }
  }

  const doDelete = (e) => {
    db.collection("stocks")
      .doc(e.id)
      .delete()
      .then((ref) => {
        props.setCh(!props.ch)
        props.setFlag(!props.flag)
      })
  }

  return (
    <>
      {props.flag ? (
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
                src={props.dish.url}
                alt="null"
                className="h-20 rounded w-full object-cover object-center mb-6"
              />
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                {props.dish.name}
              </h2>
              <div className="container mb-5">
                <span className="text-2xl bg-blue-200 py-2 px-3 rounded-full">
                  {props.count}
                </span>
                <span className="text-2xl p-2">{props.dish.unit}</span>
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
                  onClick={() => doDelete(props.dish)}
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
          <div
            className={classes.back}
            onClick={() => props.setFlag(!props.flag)}
          ></div>
        </>
      ) : (
        ""
      )}
    </>
  )
}
