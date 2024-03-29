import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const fetchIngredientsThunk = createAsyncThunk(
  "ingredients/fetchStatus",
  async () => {
    return await api
      .fetchIngredients()
      .then(
        ({ data }) =>
          ({
            ingredients: data,
          } as any)
      )
      .catch((err: Error) => {
        console.log(err.message);
      });
  }
);

export default fetchIngredientsThunk;
