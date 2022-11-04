import orderPageStyles from "./styles/order-page.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IStore } from "../types";

export default function OrderPage({
  id = "034535",
  date = "2 дня назад, 21:53 i-GMT+3",
  name = "Death Star Starship Main бургер",
  status = "Готовится",
  ingredients = ["1", "2", "3", "4", "5"],
}): JSX.Element {
  // const { orders, selected } = useSelector((store: IStore) => store.ordersFeed);
  const dispatch = useDispatch();
  const { orderId }: { orderId: string } = useParams();

  // useEffect(() => {
  //   if (orders) dispatch(addOrderDetails({ orderId }));
  // }, [orders]);
  return (
    <div className={orderPageStyles.container}>
      <span>#{id}</span>
    </div>
  );
}
