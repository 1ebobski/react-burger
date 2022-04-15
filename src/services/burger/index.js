import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { burgerApi } from "../..";

export const fetchBurgerIngredients = createAsyncThunk(
  "ingredients/fetchStatus",
  async () => {
    const response = await burgerApi.getIngredients();
    return response.data;
  }
);

const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    ingredients: null,
    bun: null,
    fillingList: [],
    ingredientsRequest: false,
    ingredientsSuccess: false,
    ingredientsFailed: false,
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

      state.fillingList = state.fillingList.concat(filling);
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
      // state.fillingList = [
      //   ...state.fillingList.slice(0, hoverIndex),
      //   dragIngredent,
      //   ...state.fillingList.slice(dragIndex),
      // ];
      state.fillingList.splice(dragIndex, 1); // removing what you are dragging.
      state.fillingList.splice(hoverIndex, 0, dragIngredent);
    },
    cleanBurgerConstructor: (state) => {
      state.bun = null;
      state.fillingList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state) => {
        state.ingredientsRequest = true;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsSuccess = true;
        state.ingredients = action.payload.map((ingredient) => ({
          ...ingredient,
          counter: 0,
        }));
      })
      .addCase(fetchBurgerIngredients.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
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
  cleanBurgerConstructor,
} = actions;
export default reducer;
