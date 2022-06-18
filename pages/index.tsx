import { rbacSetup } from "@/data";
import { Public } from "@/guard";
import { useAuth } from "@/hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { HomePageLayout } from "@/layouts";
import { useEffect } from "react";
import { HomePageContent } from "@/content/homepage";

// either a public page / redirect to login page

const Home: NextPage = () => {
  const { data } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    // if (data) {
    //   const role = data?.roles ? data?.roles[0] : "admin";
    //   router.replace(
    //     `${rbacSetup.homePage[role as keyof typeof rbacSetup.homePage]}`
    //   );
    // }
  }, [router.isReady]);

  return <HomePageContent />;
};

Home.getLayout = (page) => (
  <Public>
    <HomePageLayout>{page}</HomePageLayout>
  </Public>
);

export default Home;
