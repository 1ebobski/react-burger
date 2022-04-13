import { createSlice } from "@reduxjs/toolkit";

const ingredientDetailsSlice = createSlice({
  name: "ingredient-details",
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

const { actions, reducer } = ingredientDetailsSlice;
export const { addIngredientDetails, cleanIngredientDetails } = actions;
export default reducer;
