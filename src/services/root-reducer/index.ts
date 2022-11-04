import authReducer from "../auth";
import burgerReducer from "../burger";
import orderReducer from "../order";
import passwordReducer from "../password";
import feedReducer from "../feed";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  auth: authReducer,
  burger: burgerReducer,
  order: orderReducer,
  password: passwordReducer,
  feed: feedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
