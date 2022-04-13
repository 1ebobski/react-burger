import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { burgerApi } from "../..";

export const fetchIngredientsData = createAsyncThunk(
  "ingredients/fetchStatus",
  async () => {
    const response = await burgerApi.getIngredients();
    return response.data;
  }
);

const IndredientsDataSlice = createSlice({
  name: "ingredients-data",
  initialState: {
    ingredients: {},
    ingredientsRequest: false,
    ingredientsSuccess: false,
    ingredientsFailed: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.ingredientsRequest = true;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsSuccess = true;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsData.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      });
  },
});

const { reducer } = IndredientsDataSlice;
export default reducer;
