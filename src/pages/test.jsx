import Head from "next/head";
// import classes from "src/styles/Test.module.css";

export default function Test() {
  return (
    <div>
      <Head>
        <title>Refrigerator Page</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="text-gray-600 body-font bg-red-200">
          <div className="container mx-auto flex p-3 flex-col items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">冷蔵庫</span>
            </a>
          </div>
        </header>
        <div className="flex flex-row flex-1">
          <nav className="text-gray-600 body-font bg-yellow-200 w-64px">
            <div className="">
              <ul className="flex flex-col">
                <list>list1</list>
                <list>list2</list>
                <list>list3</list>
                <list>list4</list>
              </ul>
            </div>
          </nav>
          <main className="text-gray-600 body-font bg-green-200 flex-1">
            <div>
              <p>a</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
