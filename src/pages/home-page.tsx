import homePageStyles from "./styles/home.module.css";
import {
  useEffect,
  useState,
  useCallback,
  RefObject,
  SyntheticEvent,
} from "react";
import { useSelector } from "react-redux";
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
import { IStore, TIngredient } from "../types";
import { useAppDispatch } from "../hooks";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const { ingredients, bun, fillingList } = useSelector(
    (store: IStore) => store.burger
  );
  const ingredientsSuccess = useSelector(
    (store: IStore) => store.burger.success
  );
  const orderSuccess = useSelector((store: IStore) => store.order.success);

  const { user } = useSelector((store: IStore) => store.auth);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!ingredients) {
      dispatch(fetchIngredientsThunk());
    }
  }, []);

  const handleScroll = useCallback(
    (
      ev: Event,
      scrollRef: RefObject<HTMLDivElement>,
      bunRef: RefObject<HTMLDivElement>,
      sauceRef: RefObject<HTMLDivElement>,
      mainRef: RefObject<HTMLDivElement>
    ): void => {
      ev.preventDefault();

      if (
        scrollRef.current &&
        bunRef.current &&
        sauceRef.current &&
        mainRef.current
      ) {
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
    },
    [dispatch, selectTab]
  );

  const handleTabClick = (
    ref: RefObject<HTMLDivElement>,
    scrollRef: RefObject<HTMLDivElement>
  ) => {
    if (scrollRef.current && ref.current) {
      scrollRef.current.scrollTo({
        top: ref.current.offsetTop - 40,
        behavior: "smooth",
      });
    }
  };
  const handeIngredientDrop = useCallback(
    ({ _id }: { _id: string }): void => {
      const ingredient: TIngredient | undefined = ingredients!.find(
        (ingredient) => ingredient._id === _id
      );
      if (ingredient) {
        const { type }: { type: string } = ingredient;
        switch (type) {
          case "bun":
            dispatch(addBun({ bun: ingredient }));
            break;
          case "main":
          case "sauce":
            dispatch(addIngredient({ filling: ingredient }));
            break;
        }
      }
    },
    [dispatch, ingredients, addBun, addIngredient]
  );

  const handeIngredientDelete = useCallback(
    ({ id, index }) => {
      dispatch(deleteIngredient({ id, index }));
    },
    [dispatch, deleteIngredient]
  );

  const handleOrderCreate = (event: SyntheticEvent) => {
    event.preventDefault();
    if (user && bun) {
      const ingredientsIds = fillingList
        .concat(bun)
        .map((ingredient) => ingredient._id);
      dispatch(createOrderThunk({ ingredients: ingredientsIds }));
      setModal(true);
    } else {
      history.push({ pathname: "/login" });
    }
  };

  const handleOrderClose = useCallback(() => {
    setModal(false);
    dispatch(cleanOrderData());
    dispatch(cleanBurgerConstructor());
    dispatch(removeCounts());
  }, [
    dispatch,
    setModal,
    cleanOrderData,
    cleanBurgerConstructor,
    removeCounts,
  ]);

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
