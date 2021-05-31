import classes from "src/components/Main/Main.module.css";

export function Main() {
  const data = [
    { name: "card1" },
    { name: "card2" },
    { name: "card3" },
    { name: "card4" },
    { name: "card5" },
    { name: "card6" },
    { name: "card7" },
  ];

  const genres = [
    { genre: "野菜" },
    { genre: "肉類" },
    { genre: "魚介類" },
    { genre: "調味料" },
    { genre: "デザート" },
  ];

  return (
    <div>
      <main className={classes.main}>
        <div className={classes.bar}></div>
        <div className={classes.card_container}>
          {data.map((d) => (
            <div className={classes.card}>{d.name}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
