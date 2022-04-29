export default class Api {
  constructor(options) {
    this._options = options;
  }

  async fetchIngredients() {
    const { API, INGREDIENTS } = this._options;
    return fetch(`${API}/${INGREDIENTS}/`);
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
    });
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
    });
  }

  async loginUser({ email, password }) {
    const { API, AUTH } = this._options;
    console.log(JSON.stringify({ email, password }));
    return fetch(`${API}/${AUTH}/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
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
    });
  }

  async refreshToken({ refreshToken }) {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/token`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
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
    });
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
    });
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
    });
  }

  async resetPassword({ password, code }) {
    const { API, PASSWORD_RESET } = this._options;
    return fetch(`${API}/${PASSWORD_RESET}/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, code }),
    });
  }
}
