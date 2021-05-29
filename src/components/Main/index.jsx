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

  return (
    <div>
      <main className={classes.main}>
        <div className={classes.card_container}>
          {data.map((d) => (
            <div className={classes.card}>{d.name}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
