import { EditUserContent } from "@/content/admin";
import { Authenticated } from "@/guard";
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
  <Authenticated roles={["admin"]}>{page}</Authenticated>
);

export default EditUser;
