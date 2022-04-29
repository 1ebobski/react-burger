import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const forgotPasswordThunk = createAsyncThunk(
  "password/forgot",
  async ({ email }) => {
    return api
      .forgotPassword({
        email,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        switch (err) {
          case 401:
            alert(
              `${err}: request sent by the client to the server that lacks valid authentication credentials`
            );
            break;
          case 403:
            alert(`${err}: access to the requested resource is forbidden`);
            break;
          case 404:
            alert(`${err}: not found`);
            break;
          default:
            alert(`Ошибка номер ${err}`);
        }
      });
  }
);

export default forgotPasswordThunk;
