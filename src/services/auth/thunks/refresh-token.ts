import { createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../../..";
import { TGetUserAction } from "./get-user";

const refreshTokenThunk = createAsyncThunk(
  "auth/refresh-token",
  async (afterRefresh: TGetUserAction, { dispatch }): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return Promise.reject();
    }
    return api
      .refreshToken({ token: refreshToken })
      .then((data: { accessToken: string; refreshToken: string }) => {
        const { accessToken, refreshToken } = data;
        Cookies.set("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(afterRefresh);
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  }
);

export default refreshTokenThunk;
