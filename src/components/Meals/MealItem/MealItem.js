import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

function MealItem({id, title, description, price}) {
    const cartCtx = useContext(CartContext);

    const addItemToCart = amount => {
        const newItem = {
            id,
            title,
            amount,
            price,
        }
        cartCtx.addItem(newItem);
    }

    const itemPrice = `$${price.toFixed(2)}`;

    return <li className={classes.mealItem}>
        <div>
            <h3>{title}</h3>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>{itemPrice}</div>
        </div>
        <div>
            <MealItemForm id={id} onAddItem={addItemToCart}/>
        </div>
    </li>
}

export default MealItem;
