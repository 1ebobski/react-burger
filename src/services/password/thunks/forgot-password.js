import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const forgotPasswordThunk = createAsyncThunk(
  "password/forgot",
  async ({ email }) => {
    return api
      .forgotPassword({
        email,
      })
      .then(({ success }) => {
        if (success) {
          localStorage.setItem("passwordResetRequested", true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
);

export default forgotPasswordThunk;
