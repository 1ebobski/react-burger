import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const forgotPasswordThunk = createAsyncThunk(
  "password/forgot",
  async ({ email }: { email: string }): Promise<void> =>
    api
      .forgotPassword({
        email,
      })
      .then(({ success }: { success: boolean }): void => {
        if (success) {
          localStorage.setItem("passwordResetRequested", "true");
        }
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
);

export default forgotPasswordThunk;
