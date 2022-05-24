import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "..";
import fetchIngredientsThunk from "../../services/burger/thunks";
import { addIngredientDetails } from "../../services/burger";
import { IStore } from "../../types";

export default function IngredientDetails() {
  const { ingredients, selected } = useSelector(
    (store: IStore) => store.burger
  );
  const dispatch = useDispatch();
  const { _id }: { _id: string } = useParams();

  useEffect(() => {
    if (!ingredients) {
      dispatch(fetchIngredientsThunk());
    }
  }, []);

  useEffect(() => {
    if (ingredients) dispatch(addIngredientDetails({ _id }));
  }, [ingredients]);

  return selected ? (
    <div className={ingredientDetailsStyles.container}>
      <img src={selected.image_large}></img>
      <span className='text text_type_main-medium mb-8 mt-4'>
        {selected.name}
      </span>
      <ul className={ingredientDetailsStyles.nutrition}>
        {[
          { name: "Калории,ккал", value: selected.calories },
          { name: "Белки, г", value: selected.proteins },
          { name: "Жиры, г", value: selected.fat },
          { name: "Углеводы, г", value: selected.carbohydrates },
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
  ) : (
    <Loader size='large' />
  );
}
