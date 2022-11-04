import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_FEED,
} from "../action-types";

import { v4 as uuidv4 } from "uuid";
import { TOrder } from "../../types";

const initialState = {
  wsConnected: false,
  orders: [],
};

const feedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_FEED:
      const {
        orders,
        total,
        totalToday,
      }: { orders: TOrder[]; total: number; totalToday: number } =
        action.payload;
      const newOrders = orders.forEach((order) => {
        order.ingredients.forEach((ingredient) => ({
          id: ingredient,
          key: uuidv4(),
        }));
      });
      return {
        ...state,
        orders: state.orders.length
          ? [...state.orders, ...orders]
          : [...orders],
        total: total,
        totalToday: totalToday,
      };

    default:
      return state;
  }
};

export default feedReducer;
