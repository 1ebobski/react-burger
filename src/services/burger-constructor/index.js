import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c6",
  },
  filling: [],
};

const burgerConstructorSlice = createSlice({
  name: "burger-constructor",
  initialState,
  reducers: {
    changeBun: (state, action) => {
      state.bun = action.payload.bun;
    },
    addIngredient: (state, action) => {
      state.filling = state.filling.concat(action.payload);
    },
    deleteIngredient: (state, action) => {
      state.filling = state.filling.filter(
        (ingredient) => ingredient._id === action.payload._id
      );
    },
    cleanBurgerConstructor: (state) => {
      state.bun = initialState.bun;
      state.filling = initialState.filling;
    },
  },
});

const { actions, reducer } = burgerConstructorSlice;
export const {
  changeBun,
  addIngredient,
  deleteIngredient,
  cleanBurgerConstructor,
} = actions;
export default reducer;
