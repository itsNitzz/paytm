export default function Card({ children, addtionalClasses }) {
  const classes = `py-4 px-5 rounded-md ${addtionalClasses ? addtionalClasses : ""}`;

  return <div className={classes}>{children}</div>;
}
