import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import useOutsideAlerter from "../use-outside-alerter/use-outside-alerter";

function App({ url }) {
  // useState
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // useEffect
  useEffect(() => getData(), []);

  // functions
  const handleClose = () => {
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
      .then((response) => response.json())
      .then((response) => {
        setData([...response.data]);
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
        {modal && (
          <ModalOverlay handleClose={handleClose}>
            {ingredientData && (
              <Modal
                handleClose={handleClose}
                useOutsideAlerter={useOutsideAlerter}
                type={"ingredient"}>
                <IngredientDetails {...ingredientData} />
              </Modal>
            )}
            {orderId && (
              <Modal
                handleClose={handleClose}
                useOutsideAlerter={useOutsideAlerter}
                type={"order"}>
                <OrderDetails {...orderId} />
              </Modal>
            )}
          </ModalOverlay>
        )}
      </ErrorBoundary>
    </div>
  );
}

App.propTypes = { url: PropTypes.string.isRequired };

export default App;
