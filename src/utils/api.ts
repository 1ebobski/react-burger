import { IApi, TIngredient, TUser } from "../types";

export default class Api {
  _options: IApi;

  constructor(options: IApi) {
    this._options = options;
  }

  async _checkResponse<T>(res: Response): Promise<T> {
    return res.ok
      ? res.json()
      : res.json().then((err: Error) => Promise.reject(err));
  }

  async fetchIngredients(): Promise<{ success: boolean; data: TIngredient[] }> {
    const { API, INGREDIENTS } = this._options;
    return fetch(`${API}/${INGREDIENTS}/`).then(
      this._checkResponse
    ) as Promise<{ success: boolean; data: TIngredient[] }>;
  }

  async createOrder({
    ingredients,
  }: {
    ingredients: string[];
  }): Promise<{ order: { number: string } }> {
    const { API, ORDERS } = this._options;
    return fetch(`${API}/${ORDERS}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    }).then(this._checkResponse) as Promise<{ order: { number: string } }>;
  }

  async registerUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<{
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
  }> {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/register`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse) as Promise<{
      success: boolean;
      user: TUser;
      accessToken: string;
      refreshToken: string;
    }>;
  }

  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: TUser;
  }> {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse) as Promise<{
      success: boolean;
      accessToken: string;
      refreshToken: string;
      user: TUser;
    }>;
  }

  async logoutUser({
    token,
  }: {
    token: string;
  }): Promise<{ success: boolean; message: string }> {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/logout`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then(this._checkResponse) as Promise<{
      success: boolean;
      message: string;
    }>;
  }

  async refreshToken({
    token,
  }: {
    token: string;
  }): Promise<{ success: boolean; accessToken: string; refreshToken: string }> {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/token`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then(this._checkResponse) as Promise<{
      success: boolean;
      accessToken: string;
      refreshToken: string;
    }>;
  }

  async getUser({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<{ success: boolean; user: TUser }> {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/user`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: accessToken,
      },
    }).then(this._checkResponse) as Promise<{ success: boolean; user: TUser }>;
  }

  async updateUser({
    name,
    email,
    accessToken,
  }: {
    name: string;
    email: string;
    accessToken: string;
  }): Promise<{ success: boolean; user: TUser }> {
    const { API, AUTH } = this._options;
    return fetch(`${API}/${AUTH}/user`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({ name, email }),
    }).then(this._checkResponse) as Promise<{ success: boolean; user: TUser }>;
  }

  async forgotPassword({
    email,
  }: {
    email: string;
  }): Promise<{ success: boolean; message: string }> {
    const { API, PASSWORD_RESET } = this._options;
    return fetch(`${API}/${PASSWORD_RESET}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(this._checkResponse) as Promise<{
      success: boolean;
      message: string;
    }>;
  }

  async resetPassword({
    password,
    code,
  }: {
    password: string;
    code: string;
  }): Promise<{ success: boolean; message: string }> {
    const { API, PASSWORD_RESET } = this._options;
    return fetch(`${API}/${PASSWORD_RESET}/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token: code }),
    }).then(this._checkResponse) as Promise<{
      success: boolean;
      message: string;
    }>;
  }
}
