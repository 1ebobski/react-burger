import React from "react";
import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
  LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";

function Ingredient({ name, price, image, imageMobile, containerType }) {
  return containerType === "ingredients" ? (
    <div
      className={`${ingredientStyles.ingredient} ${ingredientStyles.vertical}`}>
      <img className='mr-4 mb-1 ml-4' src={image ? image : imageMobile}></img>
      <div
        className={`mb-1 text text_type_digits-default ${ingredientStyles.price}`}>
        <span>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <span className={`text text_type_main-default ${ingredientStyles.name}`}>
        {name}
      </span>
    </div>
  ) : (
    <div className={ingredientStyles.component}>
      <DragIcon />
      <div
        className={`pt-4 pr-6 pb-4 pl-6 ${ingredientStyles.ingredient} ${ingredientStyles.horizontal}`}>
        <img
          className={ingredientStyles.image}
          src={image ? image : imageMobile}></img>
        <span
          className={`text text_type_main-default ${ingredientStyles.name}`}>
          {name}
        </span>
        <div className={ingredientStyles.price}>
          <span className='text text_type_digits-default mr-2'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
        {Math.random() < 0.5 ? <DeleteIcon /> : <LockIcon />}
      </div>
    </div>
  );
}

export default Ingredient;
