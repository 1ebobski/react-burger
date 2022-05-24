import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../../..";
import { TUser } from "../../../types";

const registerThunk = createAsyncThunk(
  "auth/register",
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ user: TUser } | void> =>
    api
      .registerUser({
        email,
        password,
        name,
      })
      .then(({ user, accessToken, refreshToken }): { user: TUser } => {
        Cookies.set("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return { user };
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
);

export default registerThunk;
