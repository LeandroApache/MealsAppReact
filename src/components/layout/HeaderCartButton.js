import classes from "./HeaderCartButton.module.css";
import HeaderCartIcon from "./HeaderCartIcon";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
    const cartCtx = useContext(CartContext);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0)

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ""}`;

    return <button className={btnClasses} onClick={props.onShowCart}>
        <span className={classes.icon}>
            <HeaderCartIcon/>
        </span>
        <span>Your cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;
