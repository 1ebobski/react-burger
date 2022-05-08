import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import { getCookie } from "../../../utils";

const updateUserThunk = createAsyncThunk(
  "auth/update-user",
  async ({ name, email }) => {
    return api
      .updateUser({
        name,
        email,
        accessToken: getCookie("accessToken"),
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
);

export default updateUserThunk;
