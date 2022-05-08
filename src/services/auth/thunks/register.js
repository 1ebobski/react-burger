import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie } from "../../../utils";

const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }) => {
    const res = await api
      .registerUser({
        email,
        password,
        name,
      })
      .then((data) => {
        const { accessToken, refreshToken } = data;
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return data;
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return res;
  }
);

export default registerThunk;
