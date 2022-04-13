import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { useSelector } from "react-redux";

export default function BurgerConstructor({ createOrder }) {
  const { bun, filling } = useSelector((store) => store.burgerConstructor);

    // useEffect(() => {
    //   console.log(bun, filling);
    // }, [bun, filling]);

  const calculateOrderPrice = useMemo(
    () =>
      filling.reduce((sum, ingredient) => sum + ingredient.price, 0) +
      bun.price * 2,
    [bun, filling]
  );

  return (
    <section className={`ml-5 pt-20 ${burgerConstructorStyles.section}`}>
      <header className={`pr-6 ${burgerConstructorStyles.subHeader}`}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </header>
      <div className={`p-4 ${burgerConstructorStyles.scroll}`}>
        {filling.map((ingredient, index) => (
          <li className={burgerConstructorStyles.ingredient} key={index}>
            <DragIcon className='mr-2' />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image_mobile}
            />
          </li>
        ))}
      </div>
      <footer className={`pr-6 ${burgerConstructorStyles.subFooter}`}>
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </footer>

      <footer className={`pt-10 pb-13 ${burgerConstructorStyles.footer}`}>
        <div className={`mr-10 ${burgerConstructorStyles.price}`}>
          <span className='text text_type_digits-medium mr-2'>
            {calculateOrderPrice}
          </span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' onClick={createOrder}>
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
}

BurgerConstructor.propTypes = {
  createOrder: PropTypes.func.isRequired,
};
