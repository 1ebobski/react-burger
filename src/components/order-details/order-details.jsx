import orderDetailsStyles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function OrderDetails(props) {
  return (
    <>
      <span
        className={`mt-30 text text_type_digits-large ${orderDetailsStyles.number}`}>
        {props.id}
      </span>
      <span className={`mt-8 text text_type_main-medium`}>
        идентификатор заказа
      </span>

      <div className={`mt-15 ${orderDetailsStyles.accepted}`}>
        <CheckMarkIcon type='primary' />
      </div>
      <span className='mt-15 text text_type_main-small'>
        Ваш заказ начали готовить
      </span>
      <span
        className={`mt-2 mb-20 text text_type_main-small ${orderDetailsStyles.wait}`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </>
  );
}

OrderDetails.propTypes = { id: PropTypes.string.isRequired };
