import homePageStyles from "./styles/home.module.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  BurgerIngredients,
  BurgerConstructor,
  Modal,
  IngredientDetails,
  OrderDetails,
} from "../components";

import {
  addIngredientDetails,
  cleanIngredientDetails,
} from "../services/ingredient/actions";

import {
  selectTab,
  addIngredient,
  addBun,
  cleanBurgerConstructor,
  deleteIngredient,
  cleanIngredients,
} from "../services/burger/actions";

import { cleanOrderData } from "../services/order/actions";
import { createOrderThunk } from "../services/order/thunks";
import fetchIngredientsThunk from "../services/burger/thunks";

export default function HomePage() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((store) => store.burger);
  const ingredientsSuccess = useSelector((store) => store.burger.success);

  const ingredientDetails = useSelector((store) => store.ingredient.details);

  const orderSuccess = useSelector((store) => store.order.success);

  const { bun, fillingList } = useSelector((store) => store.burger);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!ingredients) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch]);

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
    },
    [dispatch, selectTab]
  );

  const handleTabClick = useCallback((ref, scrollRef) => {
    scrollRef.current.scrollTo({
      top: ref.current.offsetTop - 40,
      behavior: "smooth",
    });
  });

  const handleDrop = useCallback(
    (droppedIngredient) => {
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
    },
    [dispatch, ingredients, addBun, addIngredient]
  );

  const handleDelete = useCallback(
    (event, id, index) => {
      event.preventDefault();
      dispatch(deleteIngredient({ id, index }));
    },
    [dispatch, deleteIngredient]
  );

  const createOrder = (event) => {
    event.preventDefault();
    const ingredientsIds = fillingList
      .concat(bun)
      .map((ingredient) => ingredient._id);
    dispatch(createOrderThunk({ ingredients: ingredientsIds }));
    setModal(true);
  };

  const closeOrderModal = useCallback(
    (event) => {
      event.preventDefault();
      setModal(false);
      dispatch(cleanOrderData());
      dispatch(cleanBurgerConstructor());
      dispatch(cleanIngredients());
    },
    [
      dispatch,
      setModal,
      cleanOrderData,
      cleanBurgerConstructor,
      cleanIngredients,
    ]
  );

  const openIngredientModal = (event, id) => {
    event.preventDefault();
    setModal(true);
    dispatch(
      addIngredientDetails(
        ingredients.find((ingredient) => ingredient._id === id)
      )
    );
  };

  const closeIngredientModal = useCallback(
    (event) => {
      event.preventDefault();
      setModal(false);
      dispatch(cleanIngredientDetails());
    },
    [dispatch, setModal, cleanIngredientDetails]
  );

  return (
    <div className={`pb-10 pt-10 ${homePageStyles.app}`}>
      <DndProvider backend={HTML5Backend}>
        {ingredientsSuccess && (
          <main className={`pl-5 pr-5 ${homePageStyles.main}`}>
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
        <Modal handleClose={closeIngredientModal} title={"Детали ингредиента"}>
          <IngredientDetails />
        </Modal>
      )}
      {modal && orderSuccess && (
        <Modal handleClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
