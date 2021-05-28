import classes from "src/components/Header/Header.module.css";

export function Header(props) {
  return (
    <div>
      <header className={classes.header}>{props.title}</header>
    </div>
  );
}
