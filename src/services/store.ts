import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import burgerReducer from "./burger";
import passwordReducer from "./password";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    auth: authReducer,
    burger: burgerReducer,
    order: orderReducer,
    password: passwordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export default store;

export type AppDispatch = typeof store.dispatch;
