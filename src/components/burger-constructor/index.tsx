import burgerConstructorStyles from "./burger-constructor.module.css";
import { useMemo, useCallback, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DraggableContainer } from "..";
import { moveIngredient } from "../../services/burger";
import { TIngredient, IStore, IBurgerConstructor } from "../../types";
import { useAppDispatch } from "../../hooks";

function BurgerConstructor({
  onOrderCreate,
  onIngredientDrop,
  onIngredientDelete,
}: IBurgerConstructor): ReactElement {
  const dispatch = useAppDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ _id }: { _id: string }): void {
      onIngredientDrop({ _id });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const {
    bun,
    fillingList,
  }: { bun: TIngredient | null; fillingList: TIngredient[] } = useSelector(
    (store: IStore) => store.burger
  );

  const calculateOrderPrice = useMemo(() => {
    const fillingPrice =
      fillingList.length > 0
        ? fillingList.reduce(
            (sum: number, ingredient: any) => sum + ingredient.price,
            0
          )
        : 0;
    const bunPrice = bun ? bun.price * 2 : 0;
    return fillingPrice + bunPrice;
  }, [bun, fillingList]);

  const moveComponent = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  return (
    <section
      className={`ml-5 pt-20 ${burgerConstructorStyles.section} ${
        isHover ? burgerConstructorStyles.hover : ""
      }`}
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
          ? fillingList.map(
              (ingredient: TIngredient, index: number): JSX.Element => (
                <DraggableContainer
                  id={ingredient._id}
                  index={index}
                  key={ingredient.uuid}
                  moveComponent={moveComponent}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    handleClose={() =>
                      onIngredientDelete({ id: ingredient._id, index })
                    }
                  />
                </DraggableContainer>
              )
            )
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
        <Button type='primary' onClick={onOrderCreate} disabled={!bun}>
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
}

export default memo(BurgerConstructor);
