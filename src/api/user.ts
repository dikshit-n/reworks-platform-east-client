import { USER_PROFILE } from "@/model";
import { axiosInstance, createApiFunction } from "@/utils";

class UserApi {
  fetchProfile(): Promise<USER_PROFILE> {
    return createApiFunction(() => axiosInstance.get("/user/profile"));
  }
}

export const userApi = new UserApi();
