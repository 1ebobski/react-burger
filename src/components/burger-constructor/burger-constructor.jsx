import React from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";

function BurgerConstructor({ data }) {
  const containerType = "constructor";
  return (
    <section className={`ml-5 pt-20 ${burgerConstructorStyles.section}`}>
      <div className={burgerConstructorStyles.container}>
        {data.map((ingredient) => (
          <Ingredient
            name={ingredient.name}
            price={ingredient.price}
            imageMobile={ingredient.image_mobile}
            key={ingredient.id}
            containerType={containerType}
          />
        ))}
      </div>

      <footer className={`pt-10 ${burgerConstructorStyles.footer}`}>
        <div className={`mr-10 ${burgerConstructorStyles.price}`}>
          <span className='text text_type_digits-medium mr-2'>
            {data.reduce((sum, ingredient) => sum + ingredient.price, 0)}
          </span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary'>Оформить заказ</Button>
      </footer>
    </section>
  );
}

export default BurgerConstructor;
