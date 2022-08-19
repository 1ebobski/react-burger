import { OrderCard } from "../components";
import feedPageStyles from "./styles/feed-page.module.css";
import { Link, useLocation } from "react-router-dom";

export default function FeedPage(): JSX.Element {
  const location = useLocation();

  return (
    <>
      <h1>Лента заказов</h1>
      <main className={feedPageStyles.main}>
        <ul className={feedPageStyles.feed}>
          {[1, 2, 3, 4, 5].map((el) => (
            <Link
              className={feedPageStyles.link}
              key={el}
              to={{
                pathname: `/feed/${el}`,
                state: { background: location },
              }}>
              <OrderCard hasStatus={false} />
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
              28 752
            </p>
          </div>
          <div className={`mt-15 ${feedPageStyles.total}`}>
            <h2 className='text text_type_main-medium'>
              Выполнено за сегодня:
            </h2>
            <p
              className={`text text_type_digits-large ${feedPageStyles.number}`}>
              138
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
