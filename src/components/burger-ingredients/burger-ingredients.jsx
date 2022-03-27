import React from "react";
import PropTypes from 'prop-types';
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";

function BurgerIngredients({ data }) {
  const bunsData = data.filter((ingredient) => ingredient.type === "bun");
  const mainData = data.filter((ingredient) => ingredient.type === "main");
  const sauceData = data.filter((ingredient) => ingredient.type === "sauce");

  const containerType = "ingredients";

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
          value='buns' active>
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

          <div className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {bunsData.map((ingredient) => (
              <Ingredient
                name={ingredient.name}
                price={ingredient.price}
                image={ingredient.image}
                key={ingredient.id}
                containerType={containerType}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className={"mt-10 mb-6"}>Соусы</h2>
          <div className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {sauceData.map((ingredient) => (
              <Ingredient
                name={ingredient.name}
                price={ingredient.price}
                image={ingredient.image}
                key={ingredient.id}
                containerType={containerType}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className='mt-10 mb-6'>Начинки</h2>
          <div className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {mainData.map((ingredient) => (
              <Ingredient
                name={ingredient.name}
                price={ingredient.price}
                image={ingredient.image}
                key={ingredient.id}
                containerType={containerType}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  arrayWithShape: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
