import homePageStyles from "./styles/home.module.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHistory } from "react-router-dom";

import {
  BurgerIngredients,
  BurgerConstructor,
  Modal,
  OrderDetails,
} from "../components";

import {
  selectTab,
  addIngredient,
  addBun,
  cleanBurgerConstructor,
  deleteIngredient,
  removeCounts,
} from "../services/burger/actions";

import { cleanOrderData } from "../services/order/actions";
import { createOrderThunk } from "../services/order/thunks";
import fetchIngredientsThunk from "../services/burger/thunks";

export default function HomePage() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { ingredients, bun, fillingList } = useSelector(
    (store) => store.burger
  );
  const ingredientsSuccess = useSelector((store) => store.burger.success);
  const orderSuccess = useSelector((store) => store.order.success);

  const { user } = useSelector((store) => store.auth);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!ingredients) {
      dispatch(fetchIngredientsThunk());
    }
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
    },
    [dispatch, selectTab]
  );

  const handleTabClick = useCallback((ref, scrollRef) => {
    scrollRef.current.scrollTo({
      top: ref.current.offsetTop - 40,
      behavior: "smooth",
    });
  });

  const handeIngredientDrop = useCallback(
    ({ _id }) => {
      const ingredient = ingredients.find(
        (ingredient) => ingredient._id === _id
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

  const handeIngredientDelete = useCallback(
    (event, id, index) => {
      event.preventDefault();
      dispatch(deleteIngredient({ id, index }));
    },
    [dispatch, deleteIngredient]
  );

  const handleOrderCreate = (event) => {
    event.preventDefault();
    if (user) {
      const ingredientsIds = fillingList
        .concat(bun)
        .map((ingredient) => ingredient._id);
      dispatch(createOrderThunk({ ingredients: ingredientsIds }));
      setModal(true);
    } else {
      history.push({ pathname: "/login" });
    }
  };

  const handleOrderClose = useCallback(
    (event) => {
      event.preventDefault();
      setModal(false);
      dispatch(cleanOrderData());
      dispatch(cleanBurgerConstructor());
      dispatch(removeCounts());
    },
    [dispatch, setModal, cleanOrderData, cleanBurgerConstructor, removeCounts]
  );

  return (
    <div className={`pb-10 pt-10 ${homePageStyles.app}`}>
      <DndProvider backend={HTML5Backend}>
        {ingredientsSuccess && (
          <main className={`pl-5 pr-5 ${homePageStyles.main}`}>
            <BurgerIngredients
              onTabClick={handleTabClick}
              onScroll={handleScroll}
            />
            <BurgerConstructor
              onOrderCreate={handleOrderCreate}
              onIngredientDrop={handeIngredientDrop}
              onIngredientDelete={handeIngredientDelete}
            />
          </main>
        )}
      </DndProvider>
      {modal && orderSuccess && (
        <Modal handleClose={handleOrderClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
