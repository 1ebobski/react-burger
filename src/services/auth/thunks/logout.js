import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie, getCookie } from "../../../utils";

const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return api
    .logoutUser({
      token: localStorage.getItem("refreshToken"),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then(() => {
      console.log(
        getCookie("accessToken", ""),
        localStorage.getItem("refreshToken")
      );
      setCookie("accessToken", "");
      localStorage.removeItem("refreshToken");
      console.log(
        getCookie("accessToken", ""),
        localStorage.getItem("refreshToken")
      );
    })
    .catch((err) => {
      switch (err) {
        case 401:
          console.log(
            `${err}: request sent by the client to the server that lacks valid authentication credentials`
          );
          break;
        case 403:
          console.log(`${err}: access to the requested resource is forbidden`);
          break;
        case 404:
          console.log(`${err}: not found`);
          break;
        default:
          console.log(`Ошибка номер ${err}`);
      }
    });
});

export default logoutThunk;
