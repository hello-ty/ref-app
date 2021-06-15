import Head from "next/head"
import Link from "next/link"
import { useCallback, useState } from "react"
import { TheEmoji } from "src/components/TheEmoji"

export default function Layout(props) {
  const data = [
    { genre: "野菜", emoji: "green_salad" },
    { genre: "肉類", emoji: "cut_of_meat" },
    { genre: "魚介類", emoji: "fish" },
    { genre: "デザート", emoji: "cake" },
  ]

  const handleChange = useCallback(
    (e) => {
      console.log(e)
      props.setNow(() => e)
    },
    [props.now]
  )

  return (
    <div>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <div className="flex flex-col min-h-screen font-mono">
        <header
          className={`text-gray-600 body-font bg-${props.bgcolor}-200 border-b border-gray-400`}
        >
          <div className="container mx-auto flex py-3 px-6 sm:flex-row">
            <a className="flex title-font font-medium items-center text-gray-900 mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className={`w-10 h-10 text-white p-2 bg-${props.bgcolor}-500 rounded-full cursor-pointer`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-2xl cursor-pointer">
                {props.title}
              </span>
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
          <nav
            className={`text-gray-600 p-5 sm:px-5 body-font bg-${props.bgcolor}-200 w-full order-last fixed bottom-0 border-gray-400 sm:border-t-2 sm:border-${props.bgcolor}-200 sm:hidden sm:absolute sm:-left-10`}
          >
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
          <main
            className={`text-gray-600 body-font bg-${props.bgcolor}-50 flex-1 sm:border-l sm:border-gray-400`}
          >
            <aside className="text-gray-600 body-font">
              <div
                className={`container py-4 px-6 mx-auto min-w-full bg-${props.bgcolor}-200 border-b border-gray-400`}
              >
                <ul>
                  {data.map((d) => (
                    <list
                      className={`bg-${props.bgcolor}-50 mr-2 py-2 px-3 rounded-full cursor-pointer hover:bg-${props.bgcolor}-500 hover:text-white`}
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
            {props.children}
          </main>
        </div>
      </div>
    </div>
  )
}
