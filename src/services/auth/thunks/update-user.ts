import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { TUser } from "../../../types";
import { getCookie } from "../../../utils";

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
        accessToken: getCookie("accessToken")!,
      })
      .catch((err) => {
        console.log(err.message);
      })
);

export default updateUserThunk;
