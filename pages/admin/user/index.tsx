import { ViewUsersContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const ViewUsers: NextPage = () => {
  return (
    <>
      <Head>
        <title>View Users - Admin</title>
      </Head>
      <ViewUsersContent />
    </>
  );
};

ViewUsers.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default ViewUsers;
