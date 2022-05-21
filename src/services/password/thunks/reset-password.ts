import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const resetPasswordThunk = createAsyncThunk(
  "password/reset",
  async ({
    password,
    code,
  }: {
    password: string;
    code: string;
  }): Promise<void> =>
    api
      .resetPassword({
        password,
        code,
      })
      .then(({ success }: { success: boolean }) => {
        if (success === true) {
          localStorage.removeItem("passwordResetRequested");
        }
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
);

export default resetPasswordThunk;
