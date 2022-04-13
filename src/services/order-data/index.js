import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { burgerApi } from "../..";

export const fetchOrderId = createAsyncThunk(
  "order/fetchStatus",
  async (orderList) => {
    const response = await burgerApi.getOrderId(orderList);

    return response;
  }
);

const orderDataSlice = createSlice({
  name: "order-data",
  initialState: {
    orderList: [],
    orderId: "",
    orderRequest: false,
    orderSuccess: false,
    orderFailed: false,
  },
  reducers: {
    addOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    cleanOrderData: (state) => {
      state.orderList = [];
      state.orderId = "";
      state.orderSuccess = false;
      state.orderFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderId.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrderId.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderSuccess = true;
        state.orderId = action.payload.order.number;
      })
      .addCase(fetchOrderId.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  },
});

const { actions, reducer } = orderDataSlice;
export const { addOrderList, cleanOrderData } = actions;
export default reducer;
