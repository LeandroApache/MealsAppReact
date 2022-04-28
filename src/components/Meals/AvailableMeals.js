import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import {useEffect, useState} from "react";

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];


function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const fetchMealsHandler = async () => {
        const response = await fetch("https://mealsdatabase-53ea8-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
        if (!response.ok) {
            throw new Error("Something went wrong!!!!");
        }
        const data = await response.json();

        let loadedMeals = [];

        for (let key in data) {
            loadedMeals.push({
                id: key,
                name: data[key].name,
                description: data[key].description,
                price: +data[key].price
            })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMealsHandler().catch(err => {
            setIsLoading(false);
            setHttpError(err.message);
        })
    }, []);

    if (isLoading) {
        return <section className={classes.mealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section className={classes.mealsError}>
            <p>{httpError}</p>
        </section>
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {
                        meals.map(meal => <MealItem key={meal.id}
                                                    id={meal.id}
                                                    title={meal.name}
                                                    description={meal.description}
                                                    price={meal.price}/>)
                    }
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;
