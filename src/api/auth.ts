import {
  AUTH_DATA,
  EMAIL_LOGIN_DATA,
  PHONE_NUMBER_LOGIN_DATA,
  SEND_OTP_SUBMIT_DATA,
  SIGNUP_PROPS,
  VERIFY_OTP_SUBMIT_DATA,
} from "@/model";
import { axiosInstance } from "@/utils";

class AuthApi {
  loginWithEmail(loginData: EMAIL_LOGIN_DATA): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.post("/auth/login", loginData);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  loginWithPhoneNumber(loginData: PHONE_NUMBER_LOGIN_DATA): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.post("/auth/otp/login", loginData);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  signup(signupData: SIGNUP_PROPS): Promise<AUTH_DATA> {
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
  sendOTP(submitData: SEND_OTP_SUBMIT_DATA): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post("/patients/otp/send", submitData);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  verifyOTP(submitData: VERIFY_OTP_SUBMIT_DATA): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post("/patients/otp/verify", submitData);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  initialize(): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.post("/auth/refresh");
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
