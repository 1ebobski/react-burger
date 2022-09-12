import ingredientStyles from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TReducedIngredient } from "../../types";

export default function Ingredient({
  _id,
  image,
  price,
  name,
  counter,
}: TReducedIngredient) {
  const [, dragRef] = useDrag({ type: "ingredient", item: { _id } });
  return (
    <li ref={dragRef} className={ingredientStyles.ingredient}>
      {counter > 0 ? (
        <div className={ingredientStyles.counter}>
          <span className={"text text_type_digits-default"}>{counter}</span>
        </div>
      ) : null}
      <img className='mr-4 mb-1 ml-4' src={image} alt={name}></img>
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
