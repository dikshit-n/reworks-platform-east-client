import { userApi } from "@/api";
import { CustomButton, CustomCard, RecursiveContainer } from "@/components";
import { ADD_USER, CONFIG_TYPE } from "@/model";
import { userAddSchema } from "@/schema";
import { handleError } from "@/utils";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

export const AddUserContent: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (data: ADD_USER) => {
    setSubmitting(true);
    try {
      await userApi.createUser(data);
      push("/admin/user");
      window.flash({ message: "Updated successfully" });
    } catch (err) {
      handleError(err);
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSubmit,
    validationSchema: userAddSchema,
  });

  const config: CONFIG_TYPE = [
    {
      name: "name",
      label: "Name",
    },
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
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
    },
  ];

  return (
    <CustomCard header="Add New User">
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer
          config={config}
          formik={formik}
          validationSchema={userAddSchema}
        />
        <CustomButton type="submit" loading={submitting}>
          Submit
        </CustomButton>
      </form>
    </CustomCard>
  );
};
