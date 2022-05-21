import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { getCookie } from "../../../utils";
import refreshTokenThunk from "./refresh-token";
import { TUser } from "../../../types";

const getUserThunk = createAsyncThunk(
  "auth/get-user",
  async (_, { dispatch }): Promise<{ user: TUser } | void> => {
    const accessToken = getCookie("accessToken");
    if (accessToken === undefined || accessToken === "") {
      return Promise.reject();
    }
    return api
      .getUser({
        accessToken,
      })
      .catch((err: Error): void => {
        console.log(err.message);
        if (err.message === "jwt expired") {
          dispatch(refreshTokenThunk(getUserThunk()));
        }
      });
  }
);

const getUserAction = getUserThunk();

export type TGetUserAction = typeof getUserAction;
export default getUserThunk;
