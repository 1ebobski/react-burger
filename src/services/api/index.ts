// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { TIngredient } from "../../types";

// Define a service using a base URL and expected endpoints
const burgerApi = createApi({
  reducerPath: "burgerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://norma.nomoreparties.space/api/",
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], string>({
      query: () => `ingredients/`,
    }),
  }),
});

export default burgerApi;
