import classes from "src/components/Main/Main.module.css";
import "src/components/fire";
import Link from "next/link";

export function Main(props) {
  return (
    <div>
      <main className={classes.main}>
        <div className={classes.bar}></div>
        <div className={classes.card_container}>{props.children}</div>
        <Link href="/shop">
          <a>Shop</a>
        </Link>
        <Link href="/ref">
          <a>Ref</a>
        </Link>
      </main>
    </div>
  );
}
