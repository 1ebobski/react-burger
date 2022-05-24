import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../../..";
import { TUser } from "../../../types";

const updateUserThunk = createAsyncThunk(
  "auth/update-user",
  async ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }): Promise<{ user: TUser } | void> =>
    api
      .updateUser({
        name,
        email,
        accessToken: Cookies.get("accessToken")!,
      })
      .catch((err) => {
        console.log(err.message);
      })
);

export default updateUserThunk;
