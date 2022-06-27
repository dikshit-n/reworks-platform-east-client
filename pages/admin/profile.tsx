import { ProfileContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile - Admin</title>
      </Head>
      <ProfileContent />
    </>
  );
};

Profile.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default Profile;
