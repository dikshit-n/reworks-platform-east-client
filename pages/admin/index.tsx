import { ViewProductsContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const AdminHome: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>View Products</title>
      </Head>
      <ViewProductsContent />
    </>
  );
};

AdminHome.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default AdminHome;
