import { useEffect, useState, useCallback } from "react";
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
} from "../../services/ingredient";

import {
  selectTab,
  addIngredient,
  addBun,
  cleanBurgerConstructor,
  fetchBurgerIngredients,
  deleteIngredient,
  cleanIngredients,
} from "../../services/burger";
import {
  fetchOrderId,
  addOrderList,
  cleanOrderData,
} from "../../services/order";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  const { ingredients, ingredientsSuccess } = useSelector(
    (store) => store.burger
  );

  const ingredientDetails = useSelector((store) => store.ingredient.details);

  const { orderSuccess } = useSelector((store) => store.order);

  const { bun, fillingList } = useSelector((store) => store.burger);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, []);

  const handleScroll = useCallback(
    (event, scrollRef, bunRef, sauceRef, mainRef) => {
      event.preventDefault();

      if (
        scrollRef.current.scrollTop <
        bunRef.current.getBoundingClientRect().height
      ) {
        dispatch(selectTab({ tab: "bun" }));
      } else if (
        scrollRef.current.scrollTop >= sauceRef.current.offsetTop - 40 &&
        scrollRef.current.scrollTop < mainRef.current.offsetTop - 40
      ) {
        dispatch(selectTab({ tab: "sauce" }));
      } else if (
        scrollRef.current.scrollTop >=
        mainRef.current.offsetTop - 40
      ) {
        dispatch(selectTab({ tab: "main" }));
      }
    }
  );

  const handleTabClick = (ref, scrollRef) => {
    scrollRef.current.scrollTo({
      top: ref.current.offsetTop - 40,
      behavior: "smooth",
    });
  };

  const handleDrop = (droppedIngredient) => {
    const ingredient = ingredients.find(
      (ing) => ing._id === droppedIngredient._id
    );
    switch (ingredient.type) {
      case "bun":
        dispatch(addBun({ bun: ingredient }));
        break;
      case "main":
      case "sauce":
        dispatch(addIngredient({ filling: ingredient }));
        break;
    }
  };

  const handleDelete = (event, id, index) => {
    event.preventDefault();
    dispatch(deleteIngredient({ id, index }));
  };

  const createOrder = (event) => {
    event.preventDefault();
    const orderList = fillingList
      .concat(bun)
      .map((ingredient) => ingredient._id);
    dispatch(addOrderList(orderList));
    dispatch(fetchOrderId(orderList));
    setModal(true);
  };

  const closeOrderModal = (event) => {
    event.preventDefault();
    setModal(false);
    dispatch(cleanOrderData());
    dispatch(cleanBurgerConstructor());
    dispatch(cleanIngredients());
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
        <DndProvider backend={HTML5Backend}>
          {ingredientsSuccess && (
            <main className={`pl-5 pr-5 ${appStyles.main}`}>
              <BurgerIngredients
                openIngredientModal={openIngredientModal}
                onTabClick={handleTabClick}
                onScroll={handleScroll}
              />
              <BurgerConstructor
                createOrder={createOrder}
                onDropHandler={handleDrop}
                onDeleteHandler={handleDelete}
              />
            </main>
          )}
        </DndProvider>
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
