export default class BurgerApi {
  constructor(options) {
    this._options = options;
  }

  getIngredients() {
    return fetch(this._options.url + this._options.ingredientsEndpoint)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Ошибка номер ${err}`));
  }

  getOrderId(orderList) {
    return fetch(this._options.url + this._options.orderEndpoint, {
      method: "POST",
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
}
