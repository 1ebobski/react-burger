import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import burgerReducer from "./burger";
import ingredientReducer from "./ingredient";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    auth: authReducer,
    burger: burgerReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export default store;
