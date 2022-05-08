import ingredientStyles from "./ingredient.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Ingredient({ _id, image, price, name, counter }) {
  const [, dragRef] = useDrag({ type: "ingredient", item: { _id } });
  return (
    <li ref={dragRef} className={ingredientStyles.ingredient}>
      {counter > 0 ? (
        <div className={ingredientStyles.counter}>
          <span className={"text text_type_digits-default"}>{counter}</span>
        </div>
      ) : null}
      <img className='mr-4 mb-1 ml-4' src={image}></img>
      <div
        className={`mb-1 text text_type_digits-default ${ingredientStyles.price}`}>
        <span>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <span className={`text text_type_main-default ${ingredientStyles.name}`}>
        {name}
      </span>
    </li>
  );
}

Ingredient.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};
