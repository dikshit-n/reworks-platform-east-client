import { styled } from "@mui/material/styles";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import Box from "@mui/material/Box";
import { SidebarProvider } from "@/context";
import { EXTENDED_SIDEBAR_LAYOUT_PROPS } from "@/model";
import { layoutSetup } from "./layout-setup";

const LayoutContainer = styled(Box)(
  ({ theme }) => `
    width: 100%;
    zIndex: 0;
    height: 100vh;
    overflow: hidden;
    ${theme.breakpoints.up("lg")} {
      display: grid;
      grid-template-columns: ${layoutSetup.sidebar.width} calc(100vw - ${
    layoutSetup.sidebar.width
  });
    }
  `
);
const MainContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled(Box)(
  ({ theme }) => `
  width: 100%;
  position: relative;
  height: calc(100vh - ${layoutSetup.header.height});
  max-height: calc(100vh - ${layoutSetup.header.height});

  // margin approach
  // ${theme.breakpoints.up("lg")} {
    // margin-left: ${layoutSetup.sidebar.width};
  //   width: calc(100% - ${layoutSetup.sidebar.width});
  // }
  `
);

export const ExtendedSidebarLayout: React.FC<EXTENDED_SIDEBAR_LAYOUT_PROPS> = (
  props
) => {
  const { children } = props;

  return (
    <SidebarProvider>
      <LayoutContainer>
        <Sidebar routes={props.sidebarRoutes} />
        <MainContainer>
          <Header {...props.headerProps} />
          <ContentContainer>{children}</ContentContainer>
        </MainContainer>
      </LayoutContainer>
    </SidebarProvider>
  );
};
