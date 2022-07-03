import { userApi } from "@/api";
import { CustomButton, CustomCard, RecursiveContainer } from "@/components";
import { useQueryState } from "@/hooks";
import { CONFIG_TYPE, USER_DETAILS } from "@/model";
import { userEditSchema } from "@/schema";
import { handleError } from "@/utils";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

export const EditUserContent: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { query, push } = useRouter();
  const { _id } = query;

  const [userDetails, loading] = useQueryState({
    queryKey: `user.${_id}`,
    queryFn: () => userApi.fetchUser(`${_id}`),
    onError: handleError,
  });

  const handleSubmit = async (data: Partial<USER_DETAILS>) => {
    setSubmitting(true);
    try {
      await userApi.updateUser(data);
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
      ...userDetails,
    },
    onSubmit: handleSubmit,
    validationSchema: userEditSchema,
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
  ];

  return (
    <CustomCard
      header={`Edit ${userDetails?.name || "User"} Details`}
      loading={loading}
    >
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer
          config={config}
          formik={formik}
          validationSchema={userEditSchema}
        />
        <CustomButton type="submit" loading={submitting}>
          Submit
        </CustomButton>
      </form>
    </CustomCard>
  );
};
