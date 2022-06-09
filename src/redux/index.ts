import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "@/redux";
import { TypedUseSelectorHook } from "react-redux";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from "react-redux";

export const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export * from "./slices";
export * from "./actions";
export * from "./reducer";
