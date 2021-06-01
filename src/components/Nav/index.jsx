import classes from "src/components/Nav/Nav.module.css";

export function Nav(props) {
  const data = [
    { title: "list1" },
    { title: "list2" },
    { title: "list3" },
    { title: "list4" },
  ];
  return (
    <div>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          {data.map((d) => (
            <li className={classes.li} key={d.title}>
              {d.title}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
