import classes from "src/components/Nav/Nav.module.css";
import Link from "next/link";

export function Nav(props) {
  const data = [
    { title: "冷蔵庫", address: "ref" },
    { title: "買い物", address: "shop" },
    { title: "list3", address: "#" },
    { title: "list4", address: "#" },
  ];
  return (
    <div>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          {data.map((d) => (
            <Link href={"/" + d.address} key={d.title}>
              <li className={classes.li}>{d.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}
