import { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { OrderContext } from "../../services/order-context";

export default function BurgerConstructor({ createOrder }) {
  const { orderState } = useContext(OrderContext);

  const calculateOrderPrice = useMemo(
    () =>
      orderState.content.filling.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      ) +
      orderState.content.bun.price * 2,
    [orderState.content]
  );

  return (
    <section className={`ml-5 pt-20 ${burgerConstructorStyles.section}`}>
      <header className={`pr-6 ${burgerConstructorStyles.subHeader}`}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${orderState.content.bun.name} (верх)`}
          price={orderState.content.bun.price}
          thumbnail={orderState.content.bun.image_mobile}
        />
      </header>
      <div className={`p-4 ${burgerConstructorStyles.scroll}`}>
        {orderState.content.filling.map((ingredient, index) => (
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
          text={`${orderState.content.bun.name} (низ)`}
          price={orderState.content.bun.price}
          thumbnail={orderState.content.bun.image_mobile}
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
