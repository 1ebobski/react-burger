import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useContext } from "react";
import { DataContext } from "../../services/dataContext";

export default function BurgerIngredients(props) {
  const { data } = useContext(DataContext);
  const bunData = data.filter((ingredient) => ingredient.type === "bun");
  const mainData = data.filter((ingredient) => ingredient.type === "main");
  const sauceData = data.filter((ingredient) => ingredient.type === "sauce");

  return (
    <section className={`mr-5 ${burgerIngredientsStyles.section}`}>
      <header
      // style={{ border: "1px dashed #4C4CFF" }}
      >
        <h1
          // style={{ border: "1px dashed #4C4CFF" }}
          className='mt-10 mb-5 text text_type_main-large'>
          Соберите бургер
        </h1>
        <nav className={burgerIngredientsStyles.tabs}>
          <Tab
            // style={{ border: "1px dashed #4C4CFF" }}
            value='buns'
            active>
            Булки
          </Tab>
          <Tab
            // style={{ border: "1px dashed #4C4CFF" }}
            value='souce'>
            Соусы
          </Tab>
          <Tab
            // style={{ border: "1px dashed #4C4CFF" }}
            value='fill'>
            Начинки
          </Tab>
        </nav>
      </header>
      <div className={burgerIngredientsStyles.scroll}>
        <section>
          <h2 className='mt-10 mb-6'>Булки</h2>

          <ul className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {bunData.map((ingredient) => (
              <Ingredient
                {...ingredient}
                handleClick={props.getIngredientId}
                key={ingredient._id}
              />
            ))}
          </ul>
        </section>

        <section>
          <h2 className={"mt-10 mb-6"}>Соусы</h2>
          <ul className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {sauceData.map((ingredient) => (
              <Ingredient
                {...ingredient}
                handleClick={props.getIngredientId}
                key={ingredient._id}
              />
            ))}
          </ul>
        </section>

        <section>
          <h2 className='mt-10 mb-6'>Начинки</h2>
          <ul className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {mainData.map((ingredient) => (
              <Ingredient
                {...ingredient}
                handleClick={props.BurgerIngredientsgetIngredientId}
                key={ingredient._id}
              />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  getIngredientId: PropTypes.func.isRequired,
};
