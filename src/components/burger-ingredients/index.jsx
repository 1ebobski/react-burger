import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { useEffect, useRef, memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "..";

function BurgerIngredients({ onTabClick, onScroll }) {
  const scrollRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const location = useLocation();

  useEffect(() => {
    // console.log(scrollRef);
    scrollRef.current.addEventListener("scroll", (e) =>
      onScroll(e, scrollRef, bunRef, sauceRef, mainRef)
    );
    return () => {
      // console.log(scrollRef);
      // scrollRef.current.removeEventListener("scroll", onScroll);
    };
  }, [scrollRef, bunRef, sauceRef, mainRef]);

  const { ingredients, tab } = useSelector((store) => store.burger);

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
          <Tab
            value='bun'
            onClick={() => onTabClick(bunRef, scrollRef)}
            active={tab === "bun"}>
            Булки
          </Tab>
          <Tab
            value='sauce'
            onClick={() => onTabClick(sauceRef, scrollRef)}
            active={tab === "sauce"}>
            Соусы
          </Tab>
          <Tab
            value='main'
            onClick={() => onTabClick(mainRef, scrollRef)}
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
              <Link
                className={burgerIngredientsStyles.link}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}>
                <Ingredient {...ingredient} />
              </Link>
            ))}
          </ul>
        </section>

        <section ref={sauceRef}>
          <h2 className={"mt-10 mb-6"}>Соусы</h2>
          <ul className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {sauceData.map((ingredient) => (
              <Link
                className={burgerIngredientsStyles.link}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}>
                <Ingredient {...ingredient} key={ingredient._id} />
              </Link>
            ))}
          </ul>
        </section>

        <section ref={mainRef}>
          <h2 className='mt-10 mb-6'>Начинки</h2>
          <ul className={`pr-4 pl-4 ${burgerIngredientsStyles.container}`}>
            {mainData.map((ingredient) => (
              <Link
                className={burgerIngredientsStyles.link}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}>
                <Ingredient {...ingredient} key={ingredient._id} />
              </Link>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
};

export default memo(BurgerIngredients);
