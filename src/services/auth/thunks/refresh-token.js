import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { setCookie } from "../../../utils";

const refreshTokenThunk = createAsyncThunk(
  "auth/refresh-token",
  async (afterRefresh, { dispatch, rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return rejectWithValue({ message: "no refreshToken" });
    }

    return api
      .refreshToken({ token: refreshToken })
      .then((data) => {
        const { accessToken, refreshToken } = data;
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(afterRefresh);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
);

export default refreshTokenThunk;
