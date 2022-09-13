import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";
import burgerApi from "../../api";

// const fetchIngredientsThunk = createAsyncThunk(
//   "ingredients/fetchStatus",
//   async () => {
//     return await api
//       .fetchIngredients()
//       .then(
//         ({ data }) =>
//           ({
//             ingredients: data,
//           } as any)
//       )
//       .catch((err: Error) => {
//         console.log(err.message);
//       });
//   }
// );

const fetchIngredientsThunk = createAsyncThunk(
  "ingredients/fetchStatus",
  async () => {
    return await burgerApi.endpoints
      .getIngredients()
      .then(
        ({ data }) =>
          ({
            ingredients: data,
          } as any)
      )
      .catch((err: Error) => {
        console.log(err.message);
      });
  }
);

export default fetchIngredientsThunk;
