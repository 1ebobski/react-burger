import ingredientDetailsStyles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

export default function IngredientDetails(props) {
  return (
    <>
      <img src={props.image_large} className={`mt-20`}></img>
      <span className='text text_type_main-medium mb-8 mt-4'>{props.name}</span>
      <ul className={ingredientDetailsStyles.container}>
        {[
          { name: "Калории,ккал", value: props.calories },
          { name: "Белки, г", value: props.proteins },
          { name: "Жиры, г", value: props.fat },
          { name: "Углеводы, г", value: props.carbohydrates },
        ].map((data, index) => (
          <li className={ingredientDetailsStyles.nutrition} key={index}>
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
    </>
  );
}

IngredientDetails.propTypes = PropTypes.shape({
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
}).isRequired;
