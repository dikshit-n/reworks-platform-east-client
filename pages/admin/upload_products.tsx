import { UploadProductsContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const UploadProducts: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Upload Products</title>
      </Head>
      <UploadProductsContent />
    </>
  );
};

UploadProducts.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default UploadProducts;
