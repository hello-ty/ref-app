import classes from "src/components/Main/Main.module.css";
import "src/components/fire";
import { useCallback } from "react";

export function Main(props) {
  const data = [
    { genre: "全て", word: "all" },
    { genre: "野菜", word: "vegetable" },
    { genre: "肉類", word: "meat" },
    { genre: "魚介類", word: "fish" },
    { genre: "デザート", word: "fruit" },
  ];

  const handleChange = useCallback(() => {});

  return (
    <div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
