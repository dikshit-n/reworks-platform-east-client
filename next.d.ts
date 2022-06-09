import type { ReactElement, ReactNode } from "react";
import type {
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";

// https://nextjs.org/docs/basic-features/layouts#with-typescript -- different approach
declare module "next" {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
