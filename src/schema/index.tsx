import { yup } from "@/utils";

// auth
export const authenticationSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  // password: yup.string().password().required("Password is required"),
  password: yup.string().required("Password is required"),
});

// user
export const userAddSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  // password: yup.string().password().required('Password is required'),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .confirmPassword("password")
    .required("Confirm Password is required"),
});
export const userEditSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  // password: yup.string().password().required('Password is required'),
  password: yup.string().required("Password is required"),
});
