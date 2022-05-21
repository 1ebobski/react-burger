import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../../..";

const logoutThunk = createAsyncThunk("auth/logout", async (): Promise<void> => {
  return api
    .logoutUser({
      token: localStorage.getItem("refreshToken")!,
    })
    .then(() => {
      Cookies.set("accessToken", "");
      localStorage.removeItem("refreshToken");
    })
    .catch((err: Error) => {
      console.log(err.message);
    });
});

export default logoutThunk;
