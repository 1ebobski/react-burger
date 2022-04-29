import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import fetchIngredientsThunk from "./thunks";

const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    ingredients: null,
    bun: null,
    fillingList: [],
    request: false,
    success: false,
    failed: false,
    tab: "bun",
  },
  reducers: {
    selectTab: (state, action) => {
      const { tab } = action.payload;
      state.tab = tab;
    },
    addBun: (state, action) => {
      const { bun } = action.payload;

      if (state.bun) {
        if (bun._id !== state.bun._id) {
          state.ingredients = state.ingredients.map((ingredient) =>
            ingredient._id === state.bun._id
              ? { ...ingredient, counter: --ingredient.counter }
              : { ...ingredient }
          );
          state.bun = bun;
          state.ingredients = state.ingredients.map((ingredient) =>
            ingredient._id === bun._id
              ? { ...ingredient, counter: ++ingredient.counter }
              : { ...ingredient }
          );
        }
      } else {
        state.bun = bun;
        state.ingredients = state.ingredients.map((ingredient) =>
          ingredient._id === bun._id
            ? { ...ingredient, counter: ++ingredient.counter }
            : { ...ingredient }
        );
      }
    },
    addIngredient: (state, action) => {
      const { filling } = action.payload;

      state.fillingList = state.fillingList.concat({
        ...filling,
        uuid: uuidv4(),
      });
      state.ingredients = state.ingredients.map((ingredient) =>
        ingredient._id === filling._id
          ? { ...ingredient, counter: ++ingredient.counter }
          : { ...ingredient }
      );
    },
    deleteIngredient: (state, action) => {
      const { id, index } = action.payload;

      state.fillingList = state.fillingList.filter((ing, i) => i !== index);
      state.ingredients = state.ingredients.map((ingredient) =>
        ingredient._id === id
          ? { ...ingredient, counter: --ingredient.counter }
          : { ...ingredient }
      );
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredent = state.fillingList[dragIndex];
      state.fillingList.splice(dragIndex, 1);
      state.fillingList.splice(hoverIndex, 0, dragIngredent);
    },
    cleanBurgerConstructor: (state) => {
      state.bun = null;
      state.fillingList = [];
    },
    cleanIngredients: (state) => {
      state.ingredients = state.ingredients.map((ingredient) => ({
        ...ingredient,
        counter: 0,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.request = true;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.request = false;
        state.success = true;
        state.ingredients = action.payload.map((ingredient) => ({
          ...ingredient,
          counter: 0,
        }));
      })
      .addCase(fetchIngredientsThunk.rejected, (state) => {
        state.request = false;
        state.failed = true;
      });
  },
});

const { actions, reducer } = burgerSlice;
export const {
  selectTab,
  changeBun,
  addIngredient,
  addBun,
  moveIngredient,
  deleteIngredient,
  cleanIngredients,
  cleanBurgerConstructor,
} = actions;
export default reducer;
