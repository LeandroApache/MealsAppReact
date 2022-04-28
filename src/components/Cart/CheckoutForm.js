import classes from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-input";

const isEmpty = (value) => {
    return value.trim() !== "";
}

const CheckoutForm = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameHasError,
        changeHandler: enteredNameChangeHandler,
        blurHandler: enteredNameBlurHandler,
        resetValue: resetNameValue,
    } = useInput(isEmpty);
    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityHasError,
        changeHandler: enteredCityChangeHandler,
        blurHandler: enteredCityBlurHandler,
        resetValue: resetCityValue,
    } = useInput(isEmpty);
    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: streetHasError,
        changeHandler: enteredStreetChangeHandler,
        blurHandler: enteredStreetBlurHandler,
        resetValue: resetStreetValue,
    } = useInput(isEmpty);
    const {
        value: enteredHouse,
        isValid: enteredHouseIsValid,
        hasError: houseHasError,
        changeHandler: enteredHouseChangeHandler,
        blurHandler: enteredHouseBlurHandler,
        resetValue: resetHouseValue,
    } = useInput(isEmpty);

    console.log(nameHasError);

    let formIsValid = false;

    if (enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredHouseIsValid) {
        formIsValid = true;
    }

    const inputNameClasses = nameHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const inputCityClasses = cityHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const inputStreetClasses = streetHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const inputHouseClasses = houseHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;

    const formSubmitHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            house: enteredHouse,
        });

        resetNameValue();
        resetCityValue();
        resetStreetValue();
        resetHouseValue();
    };

    return <form className={classes.form} action="#" onSubmit={formSubmitHandler}>
        <div className={inputNameClasses}>
            <label htmlFor="name">Your name</label>
            <input type="text"
                   id="name"
                   value={enteredName}
                   onChange={enteredNameChangeHandler}
                   onBlur={enteredNameBlurHandler}/>
        </div>
        {nameHasError && <p>Invalid value</p>}
        <div className={inputCityClasses}>
            <label htmlFor="city">City</label>
            <input type="text"
                   id="city"
                   value={enteredCity}
                   onChange={enteredCityChangeHandler}
                   onBlur={enteredCityBlurHandler}/>
        </div>
        {cityHasError && <p>Invalid value</p>}
        <div className={inputStreetClasses}>
            <label htmlFor="street">Street</label>
            <input type="text"
                   id="street"
                   value={enteredStreet}
                   onChange={enteredStreetChangeHandler}
                   onBlur={enteredStreetBlurHandler}/>
        </div>
        {streetHasError && <p>Invalid value</p>}
        <div className={inputHouseClasses}>
            <label htmlFor="house">House</label>
            <input type="text"
                   id="house"
                   value={enteredHouse}
                   onChange={enteredHouseChangeHandler}
                   onBlur={enteredHouseBlurHandler}/>
        </div>
        {houseHasError && <p>Invalid value</p>}
        <div className={classes.actions}>
            <button type="button" onClick={props.onClose}>Close</button>
            <button type="submit"
                    className={classes.submit}
                    disabled={!formIsValid}>Confirm
            </button>
        </div>
    </form>
};

export default CheckoutForm;
