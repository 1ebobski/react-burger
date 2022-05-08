import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const resetPasswordThunk = createAsyncThunk(
  "password/reset",
  async ({ password, code }) => {
    return api
      .resetPassword({
        password,
        code,
      })
      .then(({ success }) => {
        if (success === true) {
          localStorage.removeItem("passwordResetRequested");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
);

export default resetPasswordThunk;
