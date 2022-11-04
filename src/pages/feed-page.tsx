import { OrderCard } from "../components";
import feedPageStyles from "./styles/feed-page.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WS_CONNECTION_START } from "../services/action-types";
import { IStore } from "../types";
import { RootState } from "../services/root-reducer";

export default function FeedPage(): JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();

  const { orders, total, totalToday } = useSelector(
    (store: IStore) => store.feed
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, []);

  useEffect(() => {
    console.log(orders[0]);
  }, [orders]);

  return (
    <>
      <h1>Лента заказов</h1>
      <main className={feedPageStyles.main}>
        <ul className={feedPageStyles.feed}>
          {orders.map((order) => (
            <Link
              className={feedPageStyles.link}
              key={order.id}
              to={{
                pathname: `/feed/${order.id}`,
                state: { background: location },
              }}>
              <OrderCard {...order} hasStatus={false} key={order.id}r />
            </Link>
          ))}
        </ul>
        <div className={`ml-15 ${feedPageStyles.stats}`}>
          <div className={`${feedPageStyles.statusContainer}`}>
            <div className={feedPageStyles.status}>
              <h2 className='mb-6 text text_type_main-medium'>Готовы:</h2>
              <ul
                className={`text text_type_digits-default ${feedPageStyles.orders}`}>
                {[1, 2, 3, 4, 5].map((element) => (
                  <span
                    className={`mb-2 ${feedPageStyles.ready}`}
                    key={element}>
                    03453{element}
                  </span>
                ))}
              </ul>
            </div>
            <div className={feedPageStyles.status}>
              <h2 className='mb-6 text text_type_main-medium'>В работе:</h2>
              <ul
                className={`text text_type_digits-default ${feedPageStyles.orders}`}>
                {[1, 2, 3, 4, 5].map((element) => (
                  <span className='mb-2' key={element}>
                    03453{element}
                  </span>
                ))}
              </ul>
            </div>
          </div>
          <div className={`mt-15 ${feedPageStyles.total}`}>
            <h2 className='text text_type_main-medium'>
              Выполнено за все время:
            </h2>
            <p
              className={`text text_type_digits-large ${feedPageStyles.number}`}>
              {total}
            </p>
          </div>
          <div className={`mt-15 ${feedPageStyles.total}`}>
            <h2 className='text text_type_main-medium'>
              Выполнено за сегодня:
            </h2>
            <p
              className={`text text_type_digits-large ${feedPageStyles.number}`}>
              {totalToday}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
