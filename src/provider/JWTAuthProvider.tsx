import { useAuth } from "@/hooks";
import { getError } from "@/utils";
// import { getError } from "@/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const JWTAuthProvider: React.FC = (props) => {
  const { initialize, isInitialized } = useAuth();
  const { isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    const initializeApp = async () => {
      try {
        await initialize();
        // window.flash({ message: "Authentication successfull" });
      } catch (err) {
        window.flash({ message: getError(err).message, variant: "error" });
      }
    };
    initializeApp();
  }, [isReady]);

  return <>{isInitialized ? props.children : <div>Initializing...</div>}</>;
};
