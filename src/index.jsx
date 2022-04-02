import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";

// import data from "./utils/data";
// import reportWebVitals from './reportWebVitals';

const dataUrl = "https://norma.nomoreparties.space/api/ingredients";
const orderUrl = "https://norma.nomoreparties.space/api/orders";

ReactDOM.render(
  <React.StrictMode>
    <App dataUrl={dataUrl} orderUrl={orderUrl} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
