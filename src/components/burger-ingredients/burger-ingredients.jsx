import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export default function BurgerIngredients({
  openIngredientModal,
  onTabClick,
  onScroll,
}) {
  const dispatch = useDispatch();
  const { ingredients, tab } = useSelector((store) => store.burger);

  const bunData = ingredients.filter((ingredient) => ingredient.type === "bun");
  const mainData = ingredients.filter(
    (ingredient) => ingredient.type === "main"
  );
  const sauceData = ingredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", (e) =>
      onScroll(e, scrollRef, bunRef, sauceRef, mainRef)
    );
    return () => {
      scrollRef.current.removeEventListener("scroll", onScroll);
    };
  });

  const scrollRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  return (
    <section className={`mr-5 ${burgerIngredientsStyles.section}`}>
      <header>
        <h1 className='mt-10 mb-5 text text_type_main-large'>
          Соберите бургер
        </h1>
        <nav className={burgerIngredientsStyles.tabs}>
          <Tab
            value='bun'
            onClick={(tab) => onTabClick(tab, bunRef, scrollRef)}
            active={tab === "bun"}>
            Булки
          </Tab>
          <Tab
            value='sauce'
            onClick={(tab) => onTabClick(tab, sauceRef, scrollRef)}
            active={tab === "sauce"}>
            Соусы
          </Tab>
          <Tab
            value='main'
            onClick={(tab) => onTabClick(tab, mainRef, scrollRef)}
            active={tab === "main"}>
            Начинки
          </Tab>
        </nav>
      </header>
      <div ref={scrollRef} className={burgerIngredientsStyles.scroll}>
        <section ref={bunRef}>
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

        <section ref={sauceRef}>
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

        <section ref={mainRef}>
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
  onTabClick: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
};
