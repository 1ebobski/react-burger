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

const initialOrderState = { id: undefined, content: null };

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
      return { ...state, content: action.content };
    // case "remove":
    //   return { ...state, content: [...state.content, action.ingredient] };
  }
}

function App({ url }) {
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
      const randomContent = randomBurger();
      console.log(randomContent);
      orderDispatcher({
        type: "set-content",
        content: {
          bun: randomContent.bun,
          filling: [...randomContent.filling],
        },
      });
      // console.log(orderState);}
    }
  }, [data]);

  // functions
  const randomBurger = () => {
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
        i < 1 + Math.floor(Math.random() * mainAndSauceData.length);
        i++
      ) {
        fillingArray.push(
          mainAndSauceData[Math.floor(Math.random() * mainAndSauceData.length)]
        );
      }
      return { bun: bun, filling: fillingArray };
    }
  };

  const handleClose = () => {
    setModal(false);
    setIngredientData(null);
    orderDispatcher({ type: "reset" });
  };

  const getIngredientId = (event, id) => {
    event.preventDefault();
    setModal(true);
    setIngredientData(data.find((ingredient) => ingredient._id === id));
  };

  const getOrderId = (event, id = "034536") => {
    event.preventDefault();
    setModal(true);
    orderDispatcher({ type: "set-id", id: id });
  };

  const getData = () => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        setData([...res.data]);
      })
      .catch((err) => console.log(err));
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
                  getOrderId={getOrderId}
                  orderState={orderState}
                />
              )}
            </main>
          )}

          {modal && ingredientData && (
            <Modal handleClose={handleClose} type={"ingredient"}>
              <IngredientDetails {...ingredientData} />
            </Modal>
          )}
          {modal && orderState.id && (
            <Modal handleClose={handleClose} type={"order"}>
              <OrderDetails id={orderState.id} />
            </Modal>
          )}
          </OrderContext.Provider>
        </DataContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

App.propTypes = { url: PropTypes.string.isRequired };

export default App;
