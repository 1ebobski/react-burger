import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

export const createOrderThunk = createAsyncThunk(
  "order/fetchStatus",
  async ({
    ingredients,
  }: {
    ingredients: string[];
  }): Promise<{ order: { number: string } } | void> =>
    api.createOrder({ ingredients }).catch((err) => {
      console.log(err.message);
    })
);
