import { styled } from "@mui/material/styles";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import Box from "@mui/material/Box";
import { SidebarProvider } from "@/context";
import { MINIMAL_SIDEBAR_LAYOUT_PROPS } from "@/model";
import { layoutSetup } from "./layout-setup";

const LayoutContainer = styled(Box)(
  ({ theme }) => `
    width: 100%;
    zIndex: 0;
    height: 100vh;
    overflow: hidden;
    ${theme.breakpoints.up("md")} {
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
  padding: 0 20px;

  // margin approach
  // ${theme.breakpoints.up("lg")} {
    // margin-left: ${layoutSetup.sidebar.width};
  //   width: calc(100% - ${layoutSetup.sidebar.width});
  // }
  `
);

export const MinimalSidebarLayout: React.FC<MINIMAL_SIDEBAR_LAYOUT_PROPS> = (
  props
) => {
  const { children, profileProps, bottomComponent } = props;

  return (
    <SidebarProvider>
      <LayoutContainer>
        <Sidebar
          routes={props.sidebarRoutes}
          profileProps={profileProps}
          bottomComponent={bottomComponent}
        />
        <MainContainer>
          <Header
            {...props.headerProps}
            profileProps={profileProps}
            extraComponent={bottomComponent}
          />
          <ContentContainer>{children}</ContentContainer>
        </MainContainer>
      </LayoutContainer>
    </SidebarProvider>
  );
};
