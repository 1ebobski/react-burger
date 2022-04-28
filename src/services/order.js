import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "..";

export const fetchOrderId = createAsyncThunk(
  "order/fetchStatus",
  async (orderList) => {
    const response = await api.getOrderId(orderList);

    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
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
        state.orderList = [];
        state.orderId = "";
      });
  },
});

const { actions, reducer } = orderSlice;
export const { addOrderList, cleanOrderData } = actions;
export default reducer;
