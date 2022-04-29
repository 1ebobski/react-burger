import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie } from "../../../utils";

const refreshTokenThunk = createAsyncThunk("auth/token", async () => {
  const res = await api
    .refreshToken({ refreshToken: localStorage.getItem("refreshToken") })
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
  return res;
});

export default refreshTokenThunk;
