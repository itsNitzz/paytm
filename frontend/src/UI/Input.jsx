export default function Input(props) {
  const classes = `p-1.5 px-2 rounded-md border-2 text-stone-500 font-medium ${
    props?.additionalClass ? props.additionalClass : ""
  }`;

  const labelStyles = `font-medium ${props.labelClass ? props.labelClass : ""}`;

  return (
    <div className="flex flex-1 flex-col gap-1 mt-3">
      <label htmlFor={props.input?.id} className={labelStyles}>
        {props?.label}
      </label>
      <input {...props?.input} className={classes} onChange={props?.onChangeHandler} />
    </div>
  );
}
