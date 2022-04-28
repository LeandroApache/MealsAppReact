import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import {useState} from "react";

function MealItemForm({id, onAddItem}) {

    const [amount, setAmount] = useState("1");
    const [formIsValid, setFormIsValid] = useState(true);

    const inputChangeHandler = (e) => {
        setAmount(e.target.value);
        setFormIsValid(true);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (+amount < 1 || +amount > 5 || amount.trim().length === 0) {
            setFormIsValid(false);
            return;
        }
        onAddItem(+amount);
    }


    return <form action="#" className={classes.form} onSubmit={formSubmitHandler}>
        <Input label="amount"
               input={{type: "number", id: "amount_" + id, step: "1", value: amount}}
               onChangeInput={inputChangeHandler}/>
        {!formIsValid && <p>Enter correct value (1-5)</p>}
        <button type="submit">+ Add</button>
    </form>
}

export default MealItemForm;
