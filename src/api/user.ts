import { ADD_USER, USERS, USER_DETAILS, USER_PROFILE } from "@/model";
import { axiosInstance, createApiFunction } from "@/utils";

class UserApi {
  fetchProfile(): Promise<USER_PROFILE> {
    return createApiFunction(() => axiosInstance.get("/user/profile"));
  }
  fetchUsers(): Promise<USERS> {
    return createApiFunction(() => axiosInstance.get("/users"));
  }
  createUser(details: ADD_USER): Promise<USER_DETAILS> {
    return createApiFunction(() => axiosInstance.post("/users", details));
  }
  updateUser(details: Partial<USER_DETAILS>): Promise<void> {
    return createApiFunction(() =>
      axiosInstance.patch(`/user/${details._id}`, details)
    );
  }
  deleteUser(_id: USER_DETAILS["_id"]): Promise<void> {
    return createApiFunction(() => axiosInstance.delete(`/user/${_id}`));
  }
}

export const userApi = new UserApi();
