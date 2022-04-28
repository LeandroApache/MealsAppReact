import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

function Cart(props) {
    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const showCheckoutHandler = () => {
        setIsCheckout(true);
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }

    const sendOrderHandler = async userData => {
        setIsSubmitting(true);
        await fetch("https://mealsdatabase-53ea8-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items,
            }),
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearItems();
    };

    //JSX fragments
    const cartItems = <ul className={classes["cart-items"]}>
        {cartCtx.items.map(item => <CartItem key={item.id}
                                             name={item.title}
                                             amount={item.amount}
                                             price={item.price}
                                             onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                             onAdd={cartItemAddHandler.bind(null, item)}/>)}
    </ul>;

    const actionButtons = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={showCheckoutHandler}>Order</button>}
    </div>

    const mainModalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <CheckoutForm onConfirm={sendOrderHandler} onClose={props.onClose}/>}
        {!isCheckout && actionButtons}
    </>

    const isSubmittingModalContent = <p>Order is submitting right now...</p>

    const didSubmitModalContent = <>
        <p>Order was submitted successfully!</p>
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        </div>
    </>


    return <Modal onCloseModal={props.onClose}>
        {!isSubmitting && !didSubmit && mainModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
}

export default Cart;
