import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { TUser } from "../../../types";
import Cookies from "js-cookie";

const loginThunk = createAsyncThunk(
  "auth/login",
  async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: TUser } | void> =>
    api
      .loginUser({ email, password })
      .then(
        ({
          accessToken,
          refreshToken,
          user,
        }: {
          accessToken: string;
          refreshToken: string;
          user: TUser;
        }): { user: TUser } => {
          Cookies.set("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          return { user };
        }
      )
      .catch((err: Error) => {
        console.log(err.message);
      })
);

export default loginThunk;
