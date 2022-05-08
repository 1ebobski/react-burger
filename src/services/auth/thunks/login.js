import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie } from "../../../utils";

const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    return api
      .loginUser({ email, password })
      .then((data) => {
        const { accessToken, refreshToken } = data;

        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
);

export default loginThunk;
