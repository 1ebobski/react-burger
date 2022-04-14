import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

export default function BurgerIngredients({ openIngredientModal }) {
  const { ingredients } = useSelector((store) => store.burger);

  

  const bunData = ingredients.filter((ingredient) => ingredient.type === "bun");
  const mainData = ingredients.filter(
    (ingredient) => ingredient.type === "main"
  );
  const sauceData = ingredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );

  return (
    <section className={`mr-5 ${burgerIngredientsStyles.section}`}>
      <header>
        <h1 className='mt-10 mb-5 text text_type_main-large'>
          Соберите бургер
        </h1>
        <nav className={burgerIngredientsStyles.tabs}>
          <Tab value='buns' active>
            Булки
          </Tab>
          <Tab value='souce'>Соусы</Tab>
          <Tab value='fill'>Начинки</Tab>
        </nav>
      </header>
      <div className={burgerIngredientsStyles.scroll}>
        <section>
          <h2 className='mt-10 mb-6'>Булки</h2>

          <ul className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {bunData.map((ingredient) => (
              <Ingredient
                {...ingredient}
                handleClick={openIngredientModal}
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
                handleClick={openIngredientModal}
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
                handleClick={openIngredientModal}
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
  openIngredientModal: PropTypes.func.isRequired,
};
