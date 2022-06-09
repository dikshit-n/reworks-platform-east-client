import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { SidebarContext } from "@/context";
import { SidebarMenu } from "./sidebar-menu";
import { SIDEBAR_MENU_ITEMS_STRUCTURE } from "@/model";
import { layoutSetup } from "../layout-setup";

const StyledSidebar = styled(Box)(
  ({ theme }) => `
    width: ${layoutSetup.sidebar.width};
    min-width: ${layoutSetup.sidebar.width};
    background: ${theme.sidebar.background};
    height: 100vh;
    overflow: auto;
    position: relative;
    ${theme.breakpoints.down("lg")} {
      position: fixed;
      top: 0;
      left: 0;
    }
  `
);

export const Sidebar: React.FC<{ routes?: SIDEBAR_MENU_ITEMS_STRUCTURE }> = (
  props
) => {
  const { isOpen, closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <StyledSidebar sx={{ display: { xs: "none", lg: "inline-block" } }}>
        <SidebarMenu routes={props.routes} closeSidebar={closeSidebar} />
      </StyledSidebar>
      <Drawer open={isOpen} onClose={closeSidebar}>
        <StyledSidebar>
          <SidebarMenu routes={props.routes} />
        </StyledSidebar>
      </Drawer>
    </>
  );
};
