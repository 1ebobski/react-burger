import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";

export default function Ingredient({ handleClick, _id, image, price, name }) {
  return (
    <li
      onClick={(event) => {
        handleClick(event, _id);
      }}
      className={`${ingredientStyles.ingredient} ${ingredientStyles.vertical}`}>
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
  handleClick: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
