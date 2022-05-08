export default class Api {
  constructor(options) {
    this._options = options;
  }

  async _checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  async fetchIngredients() {
    const { API, INGREDIENTS } = this._options;
    return fetch(`${API}/${INGREDIENTS}/`).then(this._checkResponse);
  }

  async createOrder({ ingredients }) {
    const { API, ORDERS } = this._options;
    return fetch(`${API}/${ORDERS}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    }).then(this._checkResponse);
  }

  async registerUser({ name, email, password }) {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/register`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  async loginUser({ email, password }) {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  async logoutUser({ token }) {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/logout`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then(this._checkResponse);
  }

  async refreshToken({ token }) {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/token`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then(this._checkResponse);
  }

  async getUser({ accessToken }) {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/user`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: accessToken,
      },
    }).then(this._checkResponse);
  }

  async updateUser({ name, email, accessToken }) {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/user`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({ name, email }),
    }).then(this._checkResponse);
  }

  async forgotPassword({ email }) {
    const { API, PASSWORD_RESET } = this._options;
    return fetch(`${API}/${PASSWORD_RESET}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(this._checkResponse);
  }

  async resetPassword({ password, code }) {
    const { API, PASSWORD_RESET } = this._options;
    return fetch(`${API}/${PASSWORD_RESET}/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token: code }),
    }).then(this._checkResponse);
  }
}
