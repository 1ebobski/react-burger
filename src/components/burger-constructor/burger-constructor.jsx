import React from "react";
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data }) {
  const bun = data.find((el) => el.type === "bun");

  return (
    <section className={`ml-5 pt-20 ${burgerConstructorStyles.section}`}>
      <header className={`pr-6   ${burgerConstructorStyles.subHeader}`}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={200}
          thumbnail={bun.image_mobile}
        />
      </header>
      <div className={`p-4 ${burgerConstructorStyles.scroll}`}>
        {data.map((ingredient) => (
          <div className={burgerConstructorStyles.ingredient}>
            <DragIcon className='mr-2' />
            <ConstructorElement
              text={ingredient.name}
              price={200}
              thumbnail={ingredient.image_mobile}
              key={ingredient._id}
            />
          </div>
        ))}
      </div>
      <footer className={`pr-6 ${burgerConstructorStyles.subFooter}`}>
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          text={`${bun.name} (низ)`}
          price={200}
          thumbnail={bun.image_mobile}
        />
      </footer>

      <footer className={`pt-10 pb-13 ${burgerConstructorStyles.footer}`}>
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

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;
