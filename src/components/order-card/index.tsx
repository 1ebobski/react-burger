import orderCardStyles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


interface IOrderCard {
  id?: string;
  date?: string;
  name?: string;
  hasStatus: boolean;
  status?: string;
  ingredients?: string[];
}

export default function OrderCard({
  id = "034535",
  date = "2 дня назад, 21:53 i-GMT+3",
  name = "Death Star Starship Main бургер",
  status = "Готовится",
  ingredients = ["1", "2", "3", "4", "5"],
}: IOrderCard): JSX.Element {
  

  return (
    <div className={`p-6 ${orderCardStyles.card}`}>
      <span className={`text text_type_digits-medium ${orderCardStyles.id}`}>
        #{id}
      </span>
      <span
        className={`text text_type_main-default text_color_inactive ${orderCardStyles.date}`}>
        {date}
      </span>
      <span
        className={`mt-6 text text_type_main-medium ${orderCardStyles.name}`}>
        {name}
      </span>
      {status ? (
        <span
          className={`mt-2 text text_type_main-small ${orderCardStyles.status}`}>
          {status}
        </span>
      ) : null}
      <div className={`mt-6 ${orderCardStyles.info}`}>
        <ul className={orderCardStyles.content}>
          {ingredients.map((ingredient) => (
            // <img src={ingredient}></img>
            <div className={orderCardStyles.ingredient}></div>
          ))}
        </ul>
        <span
          className={`text text_type_digits-default ${orderCardStyles.price}`}>
          420
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  );
}
