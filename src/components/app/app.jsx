import { useEffect, useState, useReducer, useMemo } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { DataContext } from "../../services/data-context";
import { OrderContext } from "../../services/order-context";
import { initialOrderState, orderReducer } from "../../utils/order-reducer";
import { apiUrl } from "../../constants/api";

function App() {
  // useState
  const [data, setData] = useState(null);

  const dataStateValue = useMemo(
    () => ({
      data,
      setData,
    }),
    [data, setData]
  );

  const [ingredientData, setIngredientData] = useState(null);
  const [modal, setModal] = useState(false);

  // useReducer
  const [orderState, orderDispatcher] = useReducer(
    orderReducer,
    initialOrderState
  );

  const orderStateValue = useMemo(
    () => ({ orderState, orderDispatcher }),
    [orderState, orderDispatcher]
  );

  // useEffect
  useEffect(() => {
    fetchData();
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

  const closeOrderModal = (event) => {
    event.preventDefault();
    setModal(false);
    orderDispatcher({ type: "reset" });
  };

  const closeIngredientModal = (event) => {
    event.preventDefault();
    setModal(false);
    setIngredientData(null);
  };

  const openIngredientModal = (event, id) => {
    event.preventDefault();
    setModal(true);
    setIngredientData(data.find((ingredient) => ingredient._id === id));
  };

  const createOrder = (event) => {
    event.preventDefault();
    fetchOrderId(orderState);
    setModal(true);
  };

  const fetchOrderId = (orderState) => {
    const ingredientIdArray = orderState.content.filling
      .concat(orderState.content.bun)
      .map((ingredient) => ingredient._id);

    fetch(apiUrl + "orders", {
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
  };

  const fetchData = () => {
    fetch(apiUrl + "ingredients")
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
        <DataContext.Provider value={dataStateValue}>
          <OrderContext.Provider value={orderStateValue}>
            <AppHeader />
            {data && (
              <main className={`pl-5 pr-5 ${appStyles.main}`}>
                <BurgerIngredients openIngredientModal={openIngredientModal} />
                {orderState.content && (
                  <BurgerConstructor createOrder={createOrder} />
                )}
              </main>
            )}

            {modal && ingredientData && (
              <Modal
                handleClose={closeIngredientModal}
                title={"Детали ингредиента"}>
                <IngredientDetails {...ingredientData} />
              </Modal>
            )}
            {modal && orderState.id && (
              <Modal handleClose={closeOrderModal}>
                <OrderDetails />
              </Modal>
            )}
          </OrderContext.Provider>
        </DataContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
