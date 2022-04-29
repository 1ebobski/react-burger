import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

export const createOrderThunk = createAsyncThunk(
  "order/fetchStatus",
  async ({ ingredients }) => {
    return api
      .createOrder({ ingredients })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        switch (err) {
          case 401:
            console.log(
              `${err}: request sent by the client to the server that lacks valid authentication credentials`
            );
            break;
          case 403:
            console.log(
              `${err}: access to the requested resource is forbidden`
            );
            break;
          case 404:
            console.log(`${err}: not found`);
            break;
          default:
            console.log(`Ошибка номер ${err}`);
        }
      });
  }
);
