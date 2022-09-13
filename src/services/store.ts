import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import burgerReducer from "./burger";
import passwordReducer from "./password";
import orderReducer from "./order";
import burgerApi from "./api";

const store = configureStore({
  reducer: {
    auth: authReducer,
    burger: burgerReducer,
    order: orderReducer,
    password: passwordReducer,
    [burgerApi.reducerPath]: burgerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgerApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

console.log(burgerApi);

export default store;

export type AppDispatch = typeof store.dispatch;
