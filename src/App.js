import Header from "./components/layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {useState} from "react";
import CartProvider from "./store/CartContextProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    }

    const hideCartHandler = () => {
        setCartIsShown(false);
    }

    return <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler}/>}
        <Header onShowCart={showCartHandler}/>
        <Meals/>
    </CartProvider>
}

export default App;
