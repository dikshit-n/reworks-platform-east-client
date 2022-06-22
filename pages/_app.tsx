import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import { AuthProvider } from "@/provider";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/redux";
import { Public } from "@/guard";
import { ThemeProvider } from "@/theme";
import "@/assets/scss/global.scss";
import { createEventEmitters } from "@/utils";
import { CustomModal, FlashMessage } from "@/components";
import { SnackbarProvider } from "notistack";
import { useScrollTop } from "@/hooks";
import Router from "next/router";
import Head from "next/head";

// emotion cache -- to make styles available in the entire component tree
// https://mui.com/guides/server-rendering/#heading-handling-the-request
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "src/createEmotionCache";

// to switch between light and dark mode (for future implementation)
// and for some font style changes
import CssBaseline from "@mui/material/CssBaseline";

// the progress bar at the top of the application when a page is loading
import nProgress from "nprogress";
import "nprogress/nprogress.css";

// react-query setup -- https://react-query.tanstack.com/quick-start
import { QueryClientProvider, QueryClient } from "react-query";
import { projectSetup } from "@/data";

// to wrap guards for each page
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// emotion cache setup
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

// react-query setup -- https://react-query.tanstack.com/quick-start
const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => <Public>{page}</Public>);
  // scroll the page to top on every route change
  useScrollTop();

  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  useEffect(() => createEventEmitters(), []);

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>{projectSetup.title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <StoreProvider store={store}>
          <ThemeProvider>
            <SnackbarProvider
              maxSnack={6}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <CssBaseline />
              <CustomModal />
              <FlashMessage />
              <AuthProvider>
                {getLayout(<Component {...pageProps} />)}
              </AuthProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </StoreProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
