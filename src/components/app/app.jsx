import { useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { DataContext } from "../../services/dataContext";
import { OrderContext } from "../../services/orderContext";

const initialOrderState = { content: null, id: undefined };

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialOrderState;
    case "set-id":
      return {
        ...state,
        id: action.id,
      };
    case "set-content":
      return {
        ...state,
        content: {
          bun: action.content.bun,
          filling: [...action.content.filling],
        },
      };
    case "set-price":
      return { ...state, price: action.price };
  }
}

function App({ dataUrl, orderUrl }) {
  // useState
  const [data, setData] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);
  const [modal, setModal] = useState(false);

  // const [order, setOrder] = useState({ id: undefined, content: [] });

  const [orderState, orderDispatcher] = useReducer(reducer, initialOrderState);

  // useEffect
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const randomBurger = createRandomBurger();
      orderDispatcher({
        type: "set-content",
        content: {
          bun: randomBurger.bun,
          filling: [...randomBurger.filling],
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (orderState.content) {
      const orderPrice = calculateOrderPrice();
      orderDispatcher({
        type: "set-price",
        price: orderPrice,
      });
    }
  }, [orderState.content]);

  // functions
  const createRandomBurger = () => {
    if (data) {
      const bunData = data.filter((ingredient) => ingredient.type === "bun");
      const bun = bunData[Math.floor(Math.random() * bunData.length)];

      const mainAndSauceData = data.filter(
        (ingredient) =>
          ingredient.type === "main" || ingredient.type === "sauce"
      );
      let fillingArray = [];
      for (
        let i = 0;
        i < 5 + Math.floor(Math.random() * mainAndSauceData.length);
        i++
      ) {
        fillingArray.push(
          mainAndSauceData[Math.floor(Math.random() * mainAndSauceData.length)]
        );
      }
      return { bun: bun, filling: fillingArray };
    }
  };

  const calculateOrderPrice = () => {
    return (
      orderState.content.filling.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      ) +
      orderState.content.bun.price * 2
    );
  };

  const handleModalClose = () => {
    setModal(false);
    setIngredientData(null);
    orderDispatcher({ type: "reset" });
  };

  const getIngredientId = (event, id) => {
    event.preventDefault();
    setModal(true);
    setIngredientData(data.find((ingredient) => ingredient._id === id));
  };

  const createOrder = (event) => {
    event.preventDefault();
    const ingredientIdArray = orderState.content.filling.map(
      (ingredient) => ingredient._id
    );

    fetch(orderUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientIdArray,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        orderDispatcher({ type: "set-id", id: res.order.number });
      })
      .catch((err) => console.log(`Ошибка номер ${err}`));

    setModal(true);
  };

  const getData = () => {
    fetch(dataUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        setData([...res.data]);
      })
      .catch((err) => console.log(`Ошибка номер ${err}`));
  };

  return (
    <div className={`pb-10 pt-10 ${appStyles.app}`}>
      <ErrorBoundary>
        <DataContext.Provider value={{ data, setData }}>
          <OrderContext.Provider value={{ orderState, orderDispatcher }}>
            <AppHeader />
            {data && (
              <main className={`pl-5 pr-5 ${appStyles.main}`}>
                <BurgerIngredients getIngredientId={getIngredientId} />
                {orderState.content && (
                  <BurgerConstructor
                    createOrder={createOrder}
                    orderState={orderState}
                  />
                )}
              </main>
            )}

            {modal && ingredientData && (
              <Modal handleModalClose={handleModalClose} type={"ingredient"}>
                <IngredientDetails {...ingredientData} />
              </Modal>
            )}
            {modal && orderState.id && (
              <Modal handleModalClose={handleModalClose} type={"order"}>
                <OrderDetails />
              </Modal>
            )}
          </OrderContext.Provider>
        </DataContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

App.propTypes = {
  dataUrl: PropTypes.string.isRequired,
  orderUrl: PropTypes.string.isRequired,
};

export default App;
