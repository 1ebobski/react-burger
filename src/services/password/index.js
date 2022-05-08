import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordThunk, resetPasswordThunk } from "./thunks";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    forgot: {
      request: false,
      success: false,
      failed: false,
    },
    reset: {
      request: false,
      success: false,
      failed: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.forgot.request = true;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.forgot.request = false;
        state.forgot.success = true;
      })
      .addCase(forgotPasswordThunk.rejected, (state) => {
        state.forgot.request = false;
        state.forgot.failed = true;
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.reset.request = true;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.reset.request = false;
        state.reset.success = true;
      })
      .addCase(resetPasswordThunk.rejected, (state) => {
        state.reset.request = false;
        state.reset.failed = true;
      });
  },
});

const { reducer } = passwordSlice;
export default reducer;
