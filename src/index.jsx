import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app";
import { Api } from "./utils";
import store from "./services/store";
import { API, INGREDIENTS, ORDERS, AUTH, PASSWORD_RESET } from "./constants";
// import reportWebVitals from './reportWebVitals';

const api = new Api({
  API,
  INGREDIENTS,
  ORDERS,
  AUTH,
  PASSWORD_RESET,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

export { api };

// reportWebVitals(console.log);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
