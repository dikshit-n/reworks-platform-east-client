import { yup } from "@/utils";

// auth
export const authenticationSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  // password: yup.string().password().required("Password is required"),
  password: yup.string().required("Password is required"),
});
