import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "..";

const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }) => {
    const res = await api.authenticate({
      email,
      password,
      name,
      type: "register",
    });
    return res;
  }
);

const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await api.authenticate({ email, password, type: "login" });
    return res;
  }
);

const logoutThunk = createAsyncThunk(
  "auth/logout",
  async ({ refreshToken }) => {
    const res = await api.authenticate({ refreshToken, type: "logout" });
    return res;
  }
);

const tokenThunk = createAsyncThunk("auth/token", async ({ refreshToken }) => {
  const res = await api.authenticate({ refreshToken, type: "token" });
  return res;
});

const getUserThunk = createAsyncThunk(
  "auth/get-user",
  async ({ accessToken, refreshToken }) => {
    const res = await api.authenticate({
      accessToken,
      refreshToken,
      type: "user",
      userActionType: "get",
    });
    return res;
  }
);

const updateUserThunk = createAsyncThunk(
  "auth/update-user",
  async ({ name, email, accessToken }) => {
    const res = await api.authenticate({
      name,
      email,
      accessToken,
      type: "user",
      userActionType: "update",
    });
    return res;
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.registration.request = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.registration.request = false;
        state.registration.success = true;
        state.user = { ...user };
      })
      .addCase(registerThunk.rejected, (state) => {
        state.registration.request = false;
        state.registration.failed = true;
      })
      .addCase(loginThunk.pending, (state) => {
        state.login.request = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.login.request = false;
        state.login.success = true;
        state.user = { ...user };
      })
      .addCase(loginThunk.rejected, (state) => {
        state.login.request = false;
        state.login.failed = true;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.logout.request = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.logout.request = false;
        state.logout.success = true;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.logout.request = false;
        state.logout.failed = true;
      })
      .addCase(tokenThunk.pending, (state) => {
        state.tokenRequest = true;
      })
      .addCase(tokenThunk.fulfilled, (state, action) => {
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
        const { user } = action.payload;
        state.user = { ...user };
        state.getUser.request = false;
        state.getUser.success = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.getUser.request = false;
        state.getUser.failed = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.updateUser.request = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = { ...user };
        state.updateUser.request = false;
        state.updateUser.success = true;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.updateUser.request = false;
        state.updateUser.failed = true;
      });
  },
});

const { reducer } = authSlice;
export {
  registerThunk,
  loginThunk,
  logoutThunk,
  tokenThunk,
  getUserThunk,
  updateUserThunk,
};
export default reducer;
