import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App({ url }) {
  // useState
  const [data, setData] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [modal, setModal] = useState(false);

  // useEffect
  useEffect(() => getData(), []);

  // functions
  const handleClose = () => {
    console.log("modal closed");
    setModal(false);
    setIngredientData(null);
    setOrderId(null);
  };

  const getIngredientId = (event, id) => {
    event.preventDefault();

    setModal(true);
    setIngredientData(data.find((ingredient) => ingredient._id === id));
  };

  const getOrderId = (event, id = "034536") => {
    event.preventDefault();

    setModal(true);
    setOrderId({ id: id });
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
        <AppHeader />
        {data && (
          <main className={`pl-5 pr-5 ${appStyles.main}`}>
            <BurgerIngredients data={data} getIngredientId={getIngredientId} />
            <BurgerConstructor data={data} getOrderId={getOrderId} />
          </main>
        )}

        {modal && ingredientData && (
          <Modal handleClose={handleClose} type={"ingredient"}>
            <IngredientDetails {...ingredientData} />
          </Modal>
        )}
        {modal && orderId && (
          <Modal handleClose={handleClose} type={"order"}>
            <OrderDetails {...orderId} />
          </Modal>
        )}
      </ErrorBoundary>
    </div>
  );
}

App.propTypes = { url: PropTypes.string.isRequired };

export default App;
