import { THEME, THEME_NAMES } from "@/theme";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getTheme = () => {
  try {
    return (
      (window.localStorage.getItem("theme") as THEME) ||
      THEME_NAMES.PureLightThemeMinimalSidebar
    );
  } catch {
    return THEME_NAMES.PureLightThemeMinimalSidebar;
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
