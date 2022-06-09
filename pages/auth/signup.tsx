import { Guest } from "@/guard";
import { NextPage } from "next";
import { SignupContent } from "@/content/auth";
import Head from "next/head";
import { projectSetup } from "@/data";

const Signup: NextPage = () => (
  <>
    <Head>
      <title>{projectSetup.title} - Signup</title>
    </Head>
    <SignupContent />
  </>
);

Signup.getLayout = (page) => <Guest>{page}</Guest>;

export default Signup;
