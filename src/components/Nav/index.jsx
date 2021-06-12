import classes from "src/components/Nav/Nav.module.css";
import Link from "next/link";
import { TheEmoji } from "src/components/TheEmoji";

export function Nav(props) {
  const data = [
    { title: "冷蔵庫", emoji: "cold_face", address: "ref" },
    { title: "買い物", emoji: "shopping_trolley", address: "shop" },
    { title: "テスト", emoji: "earth_asia", address: "test" },
    { title: "list4", emoji: "earth_asia", address: "shoper" },
  ];
  return (
    <div>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          {data.map((d) => (
            <Link href={"/" + d.address} key={d.title}>
              <li className={classes.li}>
                {d.title}
                <TheEmoji emoji={d.emoji} size={30} />
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}
