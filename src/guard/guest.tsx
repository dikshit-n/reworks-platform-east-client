import { authSetup } from "@/data";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Guest: React.FC = (props) => {
  const [verified, setVerified] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (isAuthenticated) router.replace(authSetup.homePage);
    else setVerified(true);
  }, [router.isReady]);

  if (!verified) return null;

  return <>{props.children}</>;
};
