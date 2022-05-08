import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

export const createOrderThunk = createAsyncThunk(
  "order/fetchStatus",
  async ({ ingredients }) => {
    return api.createOrder({ ingredients }).catch((err) => {
      console.log(err.message);
    });
  }
);
