import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD" :
            const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.payload.amount};
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = [...state.items, action.payload];
            }
            return {items: updatedItems, totalAmount: updatedTotalAmount};

        case "REMOVE":
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
            const existingItem = state.items[existingItemIndex];
            const updTotalAmount = state.totalAmount - existingItem.price;
            let updItems;
            if (existingItem.amount === 1) {
                updItems = state.items.filter(item => item.id !== action.payload);
            } else {
                const updItem = {...existingItem, amount: existingItem.amount - 1};
                updItems = [...state.items];
                updItems[existingItemIndex] = updItem;
            }
            return {items: updItems, totalAmount: updTotalAmount};

        case "CLEAR" :
            return defaultState;

        default:
            return defaultState;
    }
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

    const addCartItemHandler = (item) => {
        dispatchCartAction({type: "ADD", payload: item});
    }

    const removeCartItemHandler = (id) => {
        dispatchCartAction({type: "REMOVE", payload: id});
    }

    const clearCartItems = () => {
        dispatchCartAction({type: "CLEAR"});
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItemHandler,
        removeItem: removeCartItemHandler,
        clearItems: clearCartItems,
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;
