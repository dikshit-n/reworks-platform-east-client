import { authApi } from "@/api";
import { authSetup } from "@/data";
import { useSelector, useActions } from "@/hooks";
import {
  AUTH_DATA,
  LOGIN_AUTH_PROPS,
  SIGNUP_AUTH_PROPS,
  USE_AUTH_OPTIONS,
} from "@/model";
import { deleteCookie, getCookie, setCookie } from "@/utils";

export function useAuth() {
  const { auth } = useSelector((state) => state);
  const { auth: authActions } = useActions();

  function initialize({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = getCookie("token");
        if (!token) throw new Error("Session expired");
        const data = await authApi.initialize();
        if (updateRedux)
          authActions.initialize({ data, isAuthenticated: true });
        resolve(data);
      } catch (err) {
        if (updateRedux) authActions.logout();
        reject(err);
      }
    });
  }

  function login(
    loginDetails: LOGIN_AUTH_PROPS,
    { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await authApi.login(loginDetails);
        setCookie(authSetup.tokenAccessor, data.token);
        if (updateRedux) authActions.login(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  function signup(
    signupDetails: SIGNUP_AUTH_PROPS,
    { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await authApi.signup(signupDetails);
        setCookie(authSetup.tokenAccessor, data.token);
        if (updateRedux) authActions.login(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  function logout({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await authApi.logout();
        deleteCookie(authSetup.tokenAccessor);
        if (updateRedux) authActions.logout();
        resolve();
      } catch (err) {
        if (updateRedux) authActions.logout();
        reject(err);
      }
    });
  }

  const authUsableData = {
    ...auth,
    login,
    signup,
    logout,
    initialize,
  };

  return authUsableData;
}
