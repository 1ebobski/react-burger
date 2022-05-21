import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie } from "../../../utils";
import { TUser } from "../../../types";

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
          setCookie("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          return { user };
        }
      )
      .catch((err: Error) => {
        console.log(err.message);
      })
);

export default loginThunk;
