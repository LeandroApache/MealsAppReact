import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header({onShowCart}) {
    return <>
        <header className={classes.header}>
            <h1>Meals app</h1>
            <HeaderCartButton onShowCart={onShowCart}/>
        </header>
        <div className={classes["main-image"]}>
            <img src={mealsImg} alt="Table with dishes"/>
        </div>
    </>
}

export default Header;
