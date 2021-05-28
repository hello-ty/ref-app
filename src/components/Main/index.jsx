import classes from "src/components/Main/Main.module.css";

export function Main(props) {
  return (
    <div>
      <main className={classes.main}>{props.content}</main>
    </div>
  );
}
