import { createSlice } from "@reduxjs/toolkit";
import { IStore, TUser } from "../../types";

import {
  registerThunk,
  loginThunk,
  logoutThunk,
  tokenThunk,
  getUserThunk,
  updateUserThunk,
} from "./thunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    registration: {
      request: false,
      success: false,
      failed: false,
    },
    login: {
      request: false,
      success: false,
      failed: false,
    },
    logout: {
      request: false,
      success: false,
      failed: false,
    },
    token: {
      request: false,
      success: false,
      failed: false,
    },
    getUser: {
      request: false,
      success: false,
      failed: false,
    },
    updateUser: {
      request: false,
      success: false,
      failed: false,
    },
  } as IStore["auth"],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.registration.request = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const { user }: { user: TUser } = action.payload;
          state.registration.request = false;
          state.registration.success = true;
          state.user = { ...user };
        }
      })
      .addCase(registerThunk.rejected, (state) => {
        state.registration.request = false;
        state.registration.failed = true;
      })
      .addCase(loginThunk.pending, (state) => {
        state.login.request = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const { user }: { user: TUser } = action.payload;
          state.login.request = false;
          state.login.success = true;
          state.user = { ...user };
        }
      })
      .addCase(loginThunk.rejected, (state) => {
        state.login.request = false;
        state.login.failed = true;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.logout.request = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.logout.request = false;
        state.logout.success = true;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.logout.request = false;
        state.logout.failed = true;
      })
      .addCase(tokenThunk.pending, (state) => {
        state.token.request = true;
      })
      .addCase(tokenThunk.fulfilled, (state) => {
        state.token.request = false;
        state.token.success = true;
      })
      .addCase(tokenThunk.rejected, (state) => {
        state.token.request = false;
        state.token.failed = true;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.getUser.request = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const { user }: { user: TUser } = action.payload;
          state.user = { ...user };
          state.getUser.request = false;
          state.getUser.success = true;
        }
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.user = null;
        state.getUser.request = false;
        state.getUser.failed = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.updateUser.request = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const { user }: { user: TUser } = action.payload;
          state.user = { ...user };
          state.updateUser.request = false;
          state.updateUser.success = true;
        }
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.updateUser.request = false;
        state.updateUser.failed = true;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
