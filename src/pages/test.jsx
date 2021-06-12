import Head from "next/head";
import classes from "src/styles/Test.module.css";

export default function Test() {
  const items = ["野菜", "肉類", "魚介類", "デザート"];
  const data = [1, 2, 3, 4, 5, 6, 7];

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
          {/* aa */}
          <main className="text-gray-600 body-font bg-blue-50 flex-1 sm:border-l sm:border-gray-400">
            <aside className="text-gray-600 body-font">
              <div className="container py-4 px-6 mx-auto min-w-full bg-blue-200 border-b border-gray-400">
                <ul>
                  {items.map((d) => (
                    <list className="bg-blue-50 mr-4 p-2 rounded-full">
                      {d}
                    </list>
                  ))}
                </ul>
              </div>
            </aside>
            {/* aaa */}
            <section className="text-gray-600 body-font">
              <div className="container p-6 mx-auto">
                <div className="flex flex-wrap gap-3">
                  {data.map((d, i) => (
                    <div
                      key={i}
                      className="xl:w-1/4 md:w-1/2"
                      className={classes.card}
                    >
                      <div className="bg-white p-6 rounded-lg">
                        <img
                          className="h-20 rounded w-full object-cover object-center mb-6"
                          src="https://dummyimage.com/720x400"
                          alt="content"
                        />
                        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                          にんじん
                        </h2>
                        <p className="leading-relaxed text-base">2個</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
