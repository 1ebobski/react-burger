import { configureStore } from "@reduxjs/toolkit";

import {
  authReducer,
  burgerReducer,
  ingredientReducer,
  orderReducer,
} from "./";

const store = configureStore({
  reducer: {
    auth: authReducer,
    burger: burgerReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false
    }),
  // .concat(logger)
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export default store;
