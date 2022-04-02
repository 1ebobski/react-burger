import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";

export default function Ingredient(props) {
  return (
    <li
      onClick={(e) => {
        props.handleClick(e, props._id);
      }}
      className={`${ingredientStyles.ingredient} ${ingredientStyles.vertical}`}>
      <img className='mr-4 mb-1 ml-4' src={props.image}></img>
      <div
        className={`mb-1 text text_type_digits-default ${ingredientStyles.price}`}>
        <span>{props.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <span className={`text text_type_main-default ${ingredientStyles.name}`}>
        {props.name}
      </span>
    </li>
  );
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
