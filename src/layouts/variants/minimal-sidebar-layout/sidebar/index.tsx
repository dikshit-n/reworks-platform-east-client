import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { SidebarContext } from "@/context";
import { SidebarMenu } from "./sidebar-menu";
import {
  MINIMAL_SIDEBAR_LAYOUT_PROPS,
  SIDEBAR_MENU_ITEMS_STRUCTURE,
} from "@/model";
import { layoutSetup } from "../layout-setup";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { HideAboveMD, HideBelowMD } from "@/components";
import DarkModeToggle from "react-dark-mode-toggle";

const StyledSidebarContainerMobile = styled(Box)`
  width: ${layoutSetup.sidebar.width};
  min-width: ${layoutSetup.sidebar.width};
  padding: 20px;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
`;

const StyledSidebarContainerDesktop = styled(StyledSidebarContainerMobile)(
  ({ theme }) => `
  ${theme.breakpoints.down("md")} {
    display: none !important;
    position: fixed;
    top: 0;
    left: 0;
  }
  `
);

const StyledSidebar = styled(Box)(
  ({ theme }) => `
    border-radius: 50px;
    box-shadow: ${theme.sidebar.boxShadow};
    width: fit-content;
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    background: ${theme.sidebar.background};
    display: grid !important;
    grid-template-rows: 1fr auto;
  `
);

const BottomComponent = styled(Box)(
  ({ theme }) => `
    width: 100%;
    min-width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    .MuiIconButton-root {
      color: ${theme.sidebar.menuItemColor};
      border-radius: 50%;
      &:hover {
        color: ${theme.sidebar.menuItemColorActive};
        background: ${theme.sidebar.menuItemBgActive};
        &.has-default-icon {
          .MuiButton-startIcon {
            opacity: 1;
          }
        }
      }
    }
  `
);

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    background: none;
    box-shadow: none;
  }
`;

const FlexCenter = styled(Box)`
  display: flex;
  padding-top: 2px;
  justify-content: center;
  height: 50px;
  overflow: hidden;
  width: 100%;
`;

const StyledDivider = styled(Divider)(
  ({ theme }) => `
    background: ${theme.sidebar.dividerBg};
    width: calc(100% - 20px);
    margin: auto;
`
);

const Section = styled(Box)``;

export const Sidebar: React.FC<{
  routes?: SIDEBAR_MENU_ITEMS_STRUCTURE;
  profileProps?: MINIMAL_SIDEBAR_LAYOUT_PROPS["profileProps"];
  bottomComponent?: MINIMAL_SIDEBAR_LAYOUT_PROPS["bottomComponent"];
}> = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isOpen, closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <StyledSidebarContainerDesktop>
        <StyledSidebar sx={{ display: { xs: "none", lg: "inline-block" } }}>
          <Section>
            <SidebarMenu routes={props.routes} closeSidebar={closeSidebar} />
          </Section>
          <Section>
            <StyledDivider />
            <BottomComponent>
              {props.bottomComponent || (
                <IconButton disableRipple onClick={props.profileProps?.logout}>
                  <PowerSettingsNewIcon />
                </IconButton>
              )}
            </BottomComponent>
          </Section>
        </StyledSidebar>
      </StyledSidebarContainerDesktop>
      <StyledDrawer open={isOpen} onClose={closeSidebar}>
        <StyledSidebarContainerMobile>
          <StyledSidebar>
            <Section>
              <SidebarMenu routes={props.routes} closeSidebar={closeSidebar} />
            </Section>
            <HideBelowMD>
              <Section>
                <StyledDivider />
                <BottomComponent>
                  {props.bottomComponent || (
                    <IconButton
                      disableRipple
                      onClick={props.profileProps?.logout}
                    >
                      <PowerSettingsNewIcon />
                    </IconButton>
                  )}
                </BottomComponent>
              </Section>
            </HideBelowMD>
            <HideAboveMD>
              <FlexCenter>
                <DarkModeToggle
                  className="dark-mode-toggler"
                  checked={isDarkMode}
                  size={50}
                  onChange={setIsDarkMode}
                />
              </FlexCenter>
            </HideAboveMD>
          </StyledSidebar>
        </StyledSidebarContainerMobile>
      </StyledDrawer>
    </>
  );
};
