import { EditUserContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const EditUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>Edit User - Admin</title>
      </Head>
      <EditUserContent />
    </>
  );
};

EditUser.getLayout = (page) => (
  // <Authenticated roles={["admin"]}>
  <AdminLayout>{page}</AdminLayout>
  // </Authenticated>
);

export default EditUser;
