import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { getCookie } from "../../../utils";
import refreshTokenThunk from "./refresh-token";

const getUserThunk = createAsyncThunk(
  "auth/get-user",
  async (rejectWithValue, { dispatch }) => {
    const accessToken = getCookie("accessToken");
    if (accessToken === undefined || accessToken === "") {
      return rejectWithValue({ message: "no accessToken" });
    }
    return api
      .getUser({
        accessToken,
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "jwt expired") {
          dispatch(refreshTokenThunk(getUserThunk()));
        }
      });
  }
);

export default getUserThunk;
