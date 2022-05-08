import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie } from "../../../utils";

const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return api
    .logoutUser({
      token: localStorage.getItem("refreshToken"),
    })
    .then(() => {
      setCookie("accessToken", "");
      localStorage.removeItem("refreshToken");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

export default logoutThunk;
