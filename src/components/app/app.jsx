import { useEffect, useState, useReducer, useMemo } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import { useDispatch, useSelector } from "react-redux";
import {
  addIngredientDetails,
  cleanIngredientDetails,
} from "../../services/ingredient-details";
import {
  addIngredient,
  cleanBurgerConstructor,
} from "../../services/burger-constructor";
import createRandomBurger from "../../utils/create-random-burger";
import { fetchIngredientsData } from "../../services/ingredients-data";
import {
  fetchOrderId,
  addOrderList,
  cleanOrderData,
} from "../../services/order-data";

function App() {
  const dispatch = useDispatch();

  const { ingredients, ingredientsSuccess } = useSelector(
    (store) => store.ingredientsData
  );

  const ingredientDetails = useSelector(
    (store) => store.ingredientDetails.details
  );

  const { orderId, orderSuccess, orderList } = useSelector(
    (store) => store.orderData
  );

  // useEffect(() => {
  //   console.log(orderId, orderSuccess, orderList);
  // }, [orderId, orderSuccess]);

  const { bun, filling } = useSelector((store) => store.burgerConstructor);

  // const [data, setData] = useState(null);

  // const dataStateValue = useMemo(
  //   () => ({
  //     data,
  //     setData,
  //   }),
  //   [data, setData]
  // );

  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(fetchIngredientsData());
  }, []);

  useEffect(() => {
    if (ingredientsSuccess) {
      const randomBurger = createRandomBurger(ingredients);
      randomBurger.filling.forEach((ing) => dispatch(addIngredient(ing)));
    }
  }, [ingredients]);

  const createOrder = (event) => {
    event.preventDefault();
    const orderList = filling.concat(bun).map((ingredient) => ingredient._id);
    dispatch(addOrderList(orderList));
    dispatch(fetchOrderId(orderList));
    setModal(true);
  };

  const closeOrderModal = (event) => {
    event.preventDefault();
    setModal(false);
    dispatch(cleanOrderData());
    dispatch(cleanBurgerConstructor());
  };

  const openIngredientModal = (event, id) => {
    event.preventDefault();
    setModal(true);
    dispatch(
      addIngredientDetails(
        ingredients.find((ingredient) => ingredient._id === id)
      )
    );
  };

  const closeIngredientModal = (event) => {
    event.preventDefault();
    setModal(false);
    dispatch(cleanIngredientDetails());
  };

  return (
    <div className={`pb-10 pt-10 ${appStyles.app}`}>
      <ErrorBoundary>
        <AppHeader />

        <main className={`pl-5 pr-5 ${appStyles.main}`}>
          {ingredientsSuccess && (
            <BurgerIngredients openIngredientModal={openIngredientModal} />
          )}
          <BurgerConstructor createOrder={createOrder} />
        </main>

        {modal && ingredientDetails && (
          <Modal
            handleClose={closeIngredientModal}
            title={"Детали ингредиента"}>
            <IngredientDetails />
          </Modal>
        )}
        {modal && orderSuccess && (
          <Modal handleClose={closeOrderModal}>
            <OrderDetails />
          </Modal>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
