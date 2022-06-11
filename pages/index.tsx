import { rbacSetup } from "@/data";
import { Authenticated } from "@/guard";
import { useAuth } from "@/hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { HomePageLayout } from "@/layouts";
import { useEffect } from "react";

// either a public page / redirect to login page

const Home: NextPage = () => {
  const { data } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (data) {
      const role = data?.roles ? data?.roles[0] : "admin";
      router.replace(
        `${rbacSetup.homePage[role as keyof typeof rbacSetup.homePage]}`
      );
    }
  }, [router.isReady]);

  return <div>Loading...</div>;
};

Home.getLayout = (page) => (
  <Authenticated>
    <HomePageLayout>{page}</HomePageLayout>
  </Authenticated>
);

export default Home;
