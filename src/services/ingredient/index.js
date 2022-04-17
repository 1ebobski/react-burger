import { createSlice } from "@reduxjs/toolkit";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    details: null,
  },
  reducers: {
    addIngredientDetails: (state, action) => {
      state.details = action.payload;
    },
    cleanIngredientDetails: (state) => {
      state.details = null;
    },
  },
});

const { actions, reducer } = ingredientSlice;
export const { addIngredientDetails, cleanIngredientDetails } = actions;
export default reducer;
