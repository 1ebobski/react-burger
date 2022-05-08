import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const fetchIngredientsThunk = createAsyncThunk(
  "ingredients/fetchStatus",
  async () => {
    return await api
      .fetchIngredients()
      .then(({ data }) => data)
      .catch((err) => {
        console.log(err.message);
      });
  }
);

export default fetchIngredientsThunk;
