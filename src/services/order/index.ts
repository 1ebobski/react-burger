import { createSlice } from "@reduxjs/toolkit";
import { createOrderThunk } from "./thunks";
import { IStore } from "../../types";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    ingredients: [],
    id: "",
    request: false,
    success: false,
    failed: false,
  } as IStore["order"],
  reducers: {
    cleanOrderData: (state) => {
      state.ingredients = [];
      state.id = "";
      state.success = false;
      state.failed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state, action) => {
        const { ingredients } = action.meta.arg;
        state.ingredients = ingredients;
        state.request = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const { order } = action.payload;
          const { number } = order;
          state.request = false;
          state.success = true;
          state.id = number;
        }
      })
      .addCase(createOrderThunk.rejected, (state) => {
        state.request = false;
        state.failed = true;
        state.ingredients = [];
        state.id = "";
      });
  },
});

const { actions, reducer } = orderSlice;
export const { cleanOrderData } = actions;
export default reducer;
