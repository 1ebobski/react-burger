import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./components/app/app";
import ingredientReducer from "./services/ingredient";
// import burgerConstructorReducer from "./services/burger-constructor";
import burgerReducer from "./services/burger";
import orderReducer from "./services/order";
import BurgerApi from "./utils/burger-api";
import {
  BURGER_API_URL,
  INGREDIENTS_ENDPOINT,
  ORDERS_ENDPOINT,
} from "./constants";
// import reportWebVitals from './reportWebVitals';

// import { compose, createStore, applyMiddleware } from "redux";

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;
// const enhancer = composeEnhancers(applyMiddleware(thunk));
// const store = createStore(rootReducer, enhancer);

const burgerApi = new BurgerApi({
  url: BURGER_API_URL,
  ingredientsEndpoint: INGREDIENTS_ENDPOINT,
  orderEndpoint: ORDERS_ENDPOINT,
});

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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

export { burgerApi };

// reportWebVitals(console.log);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
