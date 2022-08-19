import orderHistoryPageStyles from "./styles/order-history-page.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { logoutThunk } from "../services/auth/thunks";
import { SyntheticEvent } from "react";
import { OrderCard } from "../components";

export default function OrderHistoryPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleExit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  return (
    <div className={`pt-30  ${orderHistoryPageStyles.container}`}>
      <nav
        className={`text text_type_main-medium ${orderHistoryPageStyles.navigation}`}>
        <Link
          to={{ pathname: "/profile" }}
          className={orderHistoryPageStyles.link}>
          <span className='text_color_inactive'>Профиль</span>
        </Link>
        <Link
          to={{ pathname: "/profile/orders" }}
          className={orderHistoryPageStyles.link}>
          <span>История заказов</span>
        </Link>
        <Link
          to={{ pathname: "/login" }}
          className={orderHistoryPageStyles.link}
          onClick={handleExit}>
          <span className='text_color_inactive'>Выход</span>
        </Link>
      </nav>

      <ul className={orderHistoryPageStyles.feed}>
        {[1, 2, 3, 4, 5].map((el) => (
          <Link
            className={`${orderHistoryPageStyles.card}`}
            key={el}
            to={{
              pathname: `profile/orders/${el}`,
              state: { background: location },
            }}>
            <OrderCard hasStatus={true} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
