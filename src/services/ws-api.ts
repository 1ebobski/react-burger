import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isOrder } from "./schemaValidators";

export type Channel = "redux" | "general";

export interface Order {
  ingredients: string[];
  // channel: Channel;
  _id: string;
  status: "created" | "pending" | "done";
  number: number;
  createdAt: string;
  updatedAt: string;
}

// {
//   "success": true,
//   "orders": [
//     {
//       "ingredients": [
//         "60d3463f7034a000269f45e7",
//         "60d3463f7034a000269f45e9",
//         "60d3463f7034a000269f45e8",
//         "60d3463f7034a000269f45ea"
//       ],
//       "_id": "",
//       "status": "done",
//       "number": 0,
//       "createdAt": "2021-06-23T14:43:22.587Z",
//       "updatedAt": "2021-06-23T14:43:22.603Z"
//     }
//   ],
//   "total": 1,
//   "totalToday": 1
// }

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (build) => ({
    getOrders: build.query<Order[], Channel>({
      query: (channel) => `orders/${channel}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket("wss://norma.nomoreparties.space");
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (!isOrder(data) || data.channel !== arg) return;

            updateCachedData((draft) => {
              draft.push(data);
            });
          };

          ws.addEventListener("message", listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
  }),
});

export const { useGetOrdersQuery } = api;
