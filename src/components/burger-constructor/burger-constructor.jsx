import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { DataContext } from "../../services/dataContext";
import { OrderContext } from "../../services/orderContext";

export default function BurgerConstructor(props) {
  const { data } = useContext(DataContext);
  const { orderState } = useContext(OrderContext);

  useEffect(() => {
    console.log(orderState);
  }, [orderState]);

  const bunData = data.filter((ingredient) => ingredient.type === "bun");
  const mainData = data.filter((ingredient) => ingredient.type === "main");
  const sauceData = data.filter((ingredient) => ingredient.type === "sauce");

  return (
    <section className={`ml-5 pt-20 ${burgerConstructorStyles.section}`}>
      <header className={`pr-6 ${burgerConstructorStyles.subHeader}`}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${orderState.content.bun.name} (верх)`}
          price={200}
          thumbnail={orderState.content.bun.image_mobile}
        />
      </header>
      <div className={`p-4 ${burgerConstructorStyles.scroll}`}>
        {orderState.content.filling.map((ingredient, index) => (
          <li
            className={burgerConstructorStyles.ingredient}
            key={index}>
            <DragIcon className='mr-2' />
            <ConstructorElement
              text={ingredient.name}
              price={200}
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
          price={200}
          thumbnail={orderState.content.bun.image_mobile}
        />
      </footer>

      <footer className={`pt-10 pb-13 ${burgerConstructorStyles.footer}`}>
        <div className={`mr-10 ${burgerConstructorStyles.price}`}>
          <span className='text text_type_digits-medium mr-2'>
            {mainData.reduce((sum, ingredient) => sum + ingredient.price, 0)}
          </span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' onClick={props.getOrderId}>
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
}

BurgerConstructor.propTypes = {
  getOrderId: PropTypes.func.isRequired,
};
