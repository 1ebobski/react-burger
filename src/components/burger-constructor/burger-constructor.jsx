import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";

export default function BurgerConstructor(props) {
  const bunData = props.data.filter((ingredient) => ingredient.type === "bun");
  const mainData = props.data.filter(
    (ingredient) => ingredient.type === "main"
  );
  const sauceData = props.data.filter(
    (ingredient) => ingredient.type === "sauce"
  );
  return (
    <section className={`ml-5 pt-20 ${burgerConstructorStyles.section}`}>
      <header className={`pr-6 ${burgerConstructorStyles.subHeader}`}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${bunData[0].name} (верх)`}
          price={200}
          thumbnail={bunData[0].image_mobile}
        />
      </header>
      <div className={`p-4 ${burgerConstructorStyles.scroll}`}>
        {mainData.concat(sauceData).map((ingredient) => (
          <li
            className={burgerConstructorStyles.ingredient}
            key={ingredient._id}>
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
          text={`${bunData[0].name} (низ)`}
          price={200}
          thumbnail={bunData[0].image_mobile}
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
  data: PropTypes.arrayOf(
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
