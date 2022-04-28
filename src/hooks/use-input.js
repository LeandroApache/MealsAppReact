import {useState} from "react";

const useInput = (validationSchema) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [enteredValueIsTouched, setEnteredValueIsTouched] = useState(false);
    const enteredValueIsValid = validationSchema(enteredValue);
    const hasError = !enteredValueIsValid && enteredValueIsTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const valueBlurHandler = () => {
        setEnteredValueIsTouched(true);
    };

    const resetValue = () => {
        setEnteredValue("");
        setEnteredValueIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: enteredValueIsValid,
        hasError,
        changeHandler: valueChangeHandler,
        blurHandler: valueBlurHandler,
        resetValue,
    }
};

export default useInput;