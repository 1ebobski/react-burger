import orderHistoryPageStyles from "./styles/order-history-page.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { logoutThunk } from "../services/auth/thunks";
import { SyntheticEvent } from "react";
import { OrderCard } from "../components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../types";
import { WS_CONNECTION_START } from "../services/action-types";

export default function OrderHistoryPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { orders, total, totalToday } = useSelector(
    (store: IStore) => store.feed
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, []);

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
        {orders.map((order) => (
          <Link
            className={`${orderHistoryPageStyles.card}`}
            key={order.id}
            to={{
              pathname: `profile/orders/${order.id}`,
              state: { background: location },
            }}>
            <OrderCard {...order} hasStatus={true} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
