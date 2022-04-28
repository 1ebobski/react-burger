import { setCookie } from "./cookies";

export default class Api {
  constructor(options) {
    this._options = options;
  }

  async fetchIngredients() {
    const { API, INGREDIENTS } = this._options;
    return fetch(`${API}/${INGREDIENTS}/`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Ошибка номер ${err}`));
  }

  async fetchOrderId(orderList) {
    const { API, ORDERS } = this._options;
    return fetch(`${API}/${ORDERS}/`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: orderList,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Ошибка номер ${err}`));
  }

  async authenticate({
    email,
    password,
    name,
    accessToken,
    refreshToken,
    type,
    userActionType,
  }) {
    const { API, AUTH } = this._options;
    let body, method;

    switch (type) {
      case "login":
        body = JSON.stringify({ email, password });
        method = "POST";
        break;
      case "register":
        body = JSON.stringify({ email, password, name });
        method = "POST";
        break;
      case "logout":
      case "token":
        body = JSON.stringify({ refreshToken });
        method = "POST";  
        break;
      case "user":
        if (userActionType === "get") {
          method = "GET";
        }
        if (userActionType === "update") {
          method = "PATCH";
          body = JSON.stringify({ email, name });
        }
        break;
      default:
        return;
    }

    // console.log(body);

    return fetch(`${API}/${AUTH}/${type}`, {
      method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: accessToken ? accessToken : "",
      },
      body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        const { accessToken, refreshToken } = data;
        if (accessToken) {
          setCookie("accessToken", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        return data;
      })
      .catch((err) => {
        switch (err) {
          case 401:
            console.log(
              `${err}: request sent by the client to the server that lacks valid authentication credentials`
            );
            break;
          case 403:
            console.log(
              `${err}: access to the requested resource is forbidden`
            );
            break;
          case 404:
            console.log(`${err}: not found`);
            break;
          default:
            console.log(`Ошибка номер ${err}`);
        }
      });
  }

  async resetPassword({ email, token, password, type = "" }) {
    const { API, PASSWORD_RESET } = this._options;
    let body;
    switch (type) {
      case "":
        body = JSON.stringify({ email });
        break;
      case "reset":
        body = JSON.stringify({ password, token });
        break;
      default:
        return;
    }

    return fetch(`${API}/${PASSWORD_RESET}/${type}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Ошибка номер ${err}`));
  }
}
