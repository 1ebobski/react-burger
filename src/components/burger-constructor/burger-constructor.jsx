import burgerConstructorStyles from "./burger-constructor.module.css";
import { useMemo, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { DraggableContainer } from "../";
import { moveIngredient } from "../../services/burger";

function BurgerConstructor({ createOrder, onDropHandler, onDeleteHandler }) {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  // const borderColor = isHover ? "lightgreen" : "transparent";
  const { bun, fillingList } = useSelector((store) => store.burger);

  const calculateOrderPrice = useMemo(() => {
    const fillingPrice =
      fillingList.length > 0
        ? fillingList.reduce((sum, ingredient) => sum + ingredient.price, 0)
        : 0;
    const bunPrice = bun ? bun.price * 2 : 0;
    return fillingPrice + bunPrice;
  }, [bun, fillingList]);

  const moveComponent = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch, moveIngredient]
  );

  return (
    <section
      className={`ml-5 pt-20 ${burgerConstructorStyles.section}`}
      // style={borderColor}
      ref={dropTarget}>
      <header className={`pr-6 ${burgerConstructorStyles.subHeader}`}>
        {bun ? (
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : null}
      </header>
      <ul className={`p-4 ${burgerConstructorStyles.scroll}`}>
        {fillingList.length > 0
          ? fillingList.map((ingredient, index) => (
              <DraggableContainer
                id={ingredient._id}
                index={index}
                key={ingredient.uuid}
                moveComponent={moveComponent}>
                <DragIcon className='mr-2' />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image_mobile}
                  handleClose={(event) =>
                    onDeleteHandler(event, ingredient._id, index)
                  }
                />
              </DraggableContainer>
            ))
          : null}
      </ul>
      <footer className={`pr-6 ${burgerConstructorStyles.subFooter}`}>
        {bun ? (
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : null}
      </footer>

      <footer className={`pt-10 pb-13 ${burgerConstructorStyles.footer}`}>
        <div className={`mr-10 ${burgerConstructorStyles.price}`}>
          <span className='text text_type_digits-medium mr-2'>
            {calculateOrderPrice ? calculateOrderPrice : 0}
          </span>
          <CurrencyIcon type='primary' />
        </div>
        {/* {bun ? ( */}
        <Button type='primary' onClick={createOrder} disabled={!bun}>
          Оформить заказ
        </Button>
        {/* ) : null} */}
      </footer>
    </section>
  );
}

BurgerConstructor.propTypes = {
  createOrder: PropTypes.func.isRequired,
  onDropHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
};

export default memo(BurgerConstructor);
