import { authSetup } from "@/data";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { rbacSetup } from "@/data";

// this guard will redirect the page if the user is not authenticated
export const Authenticated: React.FC<{
  // #rbac-setup
  roles?: typeof rbacSetup.roles;
}> = ({ roles, children }) => {
  const [verified, setVerified] = useState(false);
  const { isAuthenticated, data } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (!isAuthenticated || !data)
      router.push({
        pathname: authSetup.authPage,
        query: { backToURL: router.pathname },
      });
    else {
      const role = data?.roles ? data?.roles[0] : "admin";
      // if the user's role doesn't match, then redirect user to 404 page
      if (roles && !roles.includes(role)) router.replace("/404");
      else setVerified(true);
    }
  }, [router.isReady]);

  if (!verified) return null;

  return <>{children}</>;
};
