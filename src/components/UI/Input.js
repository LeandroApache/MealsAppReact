import classes from "./Input.module.css";

function Input({input, label, onChangeInput}) {
    return <div className={classes.input}>
        <label htmlFor={input.id}>{label}</label>
        <input {...input} onChange={onChangeInput}/>
    </div>
}

export default Input;
