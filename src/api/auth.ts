import { AUTH_DATA, LOGIN_DATA, SIGNUP_AUTH_PROPS } from "@/model";
import { axiosInstance } from "@/utils";

class AuthApi {
  login(loginData: LOGIN_DATA): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.post("/auth/login", loginData);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  signup(signupData: SIGNUP_AUTH_PROPS): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.post(
          "/patients/signup",
          signupData
        );
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  initialize(): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.get("/auth/refresh");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  logout(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.get("/auth/logout");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const authApi = new AuthApi();
