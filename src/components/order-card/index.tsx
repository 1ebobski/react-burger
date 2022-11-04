import orderCardStyles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderCard {
  id: string;
  number: number;
  date: string;
  name: string;
  status: string;
  ingredients: { id: string; key: string }[];
  hasStatus: boolean;
}

export default function OrderCard({
  number,
  date,
  name,
  status,
  ingredients,
  hasStatus,
}: IOrderCard): JSX.Element {
  return (
    <div className={`p-6 ${orderCardStyles.card}`}>
      <span className={`text text_type_digits-medium ${orderCardStyles.id}`}>
        #{number}
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
            <div
              className={orderCardStyles.ingredient}
              key={ingredient.key}></div>
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
