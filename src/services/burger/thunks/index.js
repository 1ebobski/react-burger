import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

const fetchIngredientsThunk = createAsyncThunk(
  "ingredients/fetchStatus",
  async () => {
    return await api
      .fetchIngredients()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(({ data }) => data)
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

export default fetchIngredientsThunk;
