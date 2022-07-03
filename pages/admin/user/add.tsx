import { AddUserContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const AddUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add User - Admin</title>
      </Head>
      <AddUserContent />
    </>
  );
};

AddUser.getLayout = (page) => (
  // <AdminLayout>{page}</AdminLayout>
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default AddUser;
