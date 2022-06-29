import { AddUserContent } from "@/content/admin";
import { Authenticated } from "@/guard";
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
  <Authenticated roles={["admin"]}>{page}</Authenticated>
);

export default AddUser;
