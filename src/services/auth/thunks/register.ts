import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { TUser } from "../../../types";
import { setCookie } from "../../../utils";

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
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return { user };
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
);

export default registerThunk;
