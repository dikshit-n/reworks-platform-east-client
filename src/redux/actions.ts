import { authActions } from "./slices";
import { themeActions } from "./slices/theme";

export const actions = {
  auth: { ...authActions },
  theme: { ...themeActions },
};
