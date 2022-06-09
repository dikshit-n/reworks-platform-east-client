import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from ".";
import { themeReducer } from "./slices/theme";

export const reducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});
