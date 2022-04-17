import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useRef } from "react";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    useSelector((store) => store.ingredient.details);

  

  return (
    <div className={ingredientDetailsStyles.container}>
      <img src={image_large}></img>
      <span className='text text_type_main-medium mb-8 mt-4'>{name}</span>
      <ul className={ingredientDetailsStyles.nutrition}>
        {[
          { name: "Калории,ккал", value: calories },
          { name: "Белки, г", value: proteins },
          { name: "Жиры, г", value: fat },
          { name: "Углеводы, г", value: carbohydrates },
        ].map((data, index) => (
          <li className={ingredientDetailsStyles.nutrient} key={index}>
            <span
              className={`text text_type_main-default ${ingredientDetailsStyles.text}`}>
              {data.name}
            </span>
            <span
              className={`text text_type_main-default mt-2 ${ingredientDetailsStyles.text}`}>
              {data.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
