import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "..";

const forgotPasswordThunk = createAsyncThunk(
  "password/forgot",
  async ({ email }) => {
    const response = await api.resetPassword({
      email,
    });
    return response;
  }
);

const resetPasswordThunk = createAsyncThunk(
  "password/reset",
  async ({ email, password, code }) => {
    const response = await api.resetPassword({
      email,
      password,
      token: code,
      type: "reset",
    });
    return response;
  }
);

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
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        console.log(action);
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
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        console.log(action);
        state.reset.request = false;
        state.reset.success = true;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        console.log(action);
        state.reset.request = false;
        state.reset.failed = true;
      });
  },
});

const { reducer } = passwordSlice;
export { forgotPasswordThunk, resetPasswordThunk };
export default reducer;
