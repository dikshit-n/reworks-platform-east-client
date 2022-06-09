import { CustomButton, JustifyBetween, RecursiveContainer } from "@/components";
import { rbacSetup } from "@/data";
import { useAuth } from "@/hooks";
import { CONFIG_TYPE, LOGIN_AUTH_PROPS } from "@/model";
import { authenticationSchema } from "@/schema";
import { getError } from "@/utils";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

export const LoginForm: React.FC = (props) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { push, query } = useRouter();
  const backToURL = query.backToURL as string;

  const handleSubmit = async (submitData: LOGIN_AUTH_PROPS) => {
    setLoading(true);
    try {
      const { roles } = await login(submitData);
      push(backToURL || rbacSetup.homePage[`${roles[0]}`]);
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setLoading(false);
    console.log(submitData);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: authenticationSchema,
  });

  const fields: CONFIG_TYPE = [
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Login with email
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer
          config={fields}
          formik={formik}
          validationSchema={authenticationSchema}
        />
        <JustifyBetween sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}>
          <CustomButton color="success" type="submit" loading={loading}>
            Login
          </CustomButton>
          <CustomButton linkStyle>Forgot Password ?</CustomButton>
        </JustifyBetween>
      </form>
    </>
  );
};
