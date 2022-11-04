import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./root-reducer";

import { socketMiddleware } from "./middleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware("wss://norma.nomoreparties.space/orders/all")
    ),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export default store;

export type AppDispatch = typeof store.dispatch;
