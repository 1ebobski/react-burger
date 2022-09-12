import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "..";
import { IBurgerIngredients, IStore, TIngredient } from "../../types";

function BurgerIngredients({ onTabClick, onScroll }: IBurgerIngredients) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  // function handleScroll(this: HTMLDivElement, e: Event) {
  //   onScroll(e, scrollRef, bunRef, sauceRef, mainRef);
  // }

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", (e) =>
        onScroll(e, scrollRef, bunRef, sauceRef, mainRef)
      );
    }
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", (e) =>
          onScroll(e, scrollRef, bunRef, sauceRef, mainRef)
        );
      }
    };
  }, [bunRef, sauceRef, mainRef, onScroll]);

  const { ingredients, tab } = useSelector((store: IStore) => store.burger);

  const bunData = ingredients!
    .filter((ingredient: TIngredient): boolean => ingredient.type === "bun")
    .map(({ _id, image, price, name, counter }) => ({
      _id,
      image,
      price,
      name,
      counter,
    }));
  const mainData = ingredients!
    .filter((ingredient: TIngredient): boolean => ingredient.type === "main")
    .map(({ _id, image, price, name, counter }) => ({
      _id,
      image,
      price,
      name,
      counter,
    }));
  const sauceData = ingredients!
    .filter((ingredient: TIngredient): boolean => ingredient.type === "sauce")
    .map(({ _id, image, price, name, counter }) => ({
      _id,
      image,
      price,
      name,
      counter,
    }));

  return (
    <div className={`mr-5 ${burgerIngredientsStyles.section}`}>
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
        <div ref={bunRef}>
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
        </div>
        <div ref={sauceRef}>
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
        </div>

        <div ref={mainRef}>
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
        </div>
      </div>
    </div>
  );
}

export default memo(BurgerIngredients);
