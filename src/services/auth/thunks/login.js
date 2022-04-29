import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie } from "../../../utils";

const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    return api
      .loginUser({ email, password })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        const { accessToken, refreshToken } = data;
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return data;
      })
      .catch((err) => {
        switch (err) {
          case 401:
            alert(
              `${err}: request sent by the client to the server that lacks valid authentication credentials`
            );
            break;
          case 403:
            alert(`${err}: access to the requested resource is forbidden`);
            break;
          case 404:
            alert(`${err}: not found`);
            break;
          default:
            alert(`Ошибка номер ${err}`);
        }
      });
  }
);

export default loginThunk;
