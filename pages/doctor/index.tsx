import { DoctorDashboardContent } from "@/content/doctor";
import { Authenticated } from "@/guard";
import { DoctorLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const DoctorHome: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <DoctorDashboardContent />
    </>
  );
};

DoctorHome.getLayout = (page) => (
  <Authenticated roles={["doctor"]}>
    <DoctorLayout>{page}</DoctorLayout>
  </Authenticated>
);

export default DoctorHome;
