import { THEME } from "@/theme";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getTheme = () => {
  try {
    return (
      (window.localStorage.getItem("theme") as THEME) ||
      "pure-light-theme-minimal-sidebar"
    );
  } catch {
    return "pure-light-theme-minimal-sidebar";
  }
};
const initialState: THEME = getTheme();

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(_state: THEME, action: PayloadAction<THEME>) {
      return action.payload;
    },
  },
});

export const { actions: themeActions, reducer: themeReducer } = slice;
