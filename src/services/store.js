import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredient";
import burgerReducer from "./burger";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    ingredient: ingredientReducer,
    // burgerConstructor: burgerConstructorReducer,
    burger: burgerReducer,
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
  