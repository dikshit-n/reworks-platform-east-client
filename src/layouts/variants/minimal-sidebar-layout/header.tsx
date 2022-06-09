import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { SidebarContext } from "@/context";
import { CustomIconButton, HideAboveMD, HideBelowMD } from "@/components";
import {
  CUSTOM_ICON_BUTTON_PROPS,
  MINIMAL_SIDEBAR_HEADER_PROPS,
} from "@/model";
import { layoutSetup } from "./layout-setup";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DarkModeToggle from "react-dark-mode-toggle";

const StyledHeader = styled(Box)(
  ({ theme }) => `
    height: ${layoutSetup.header.height};
    border-radius: 50px;
    width: calc(100% - 20px);
    margin: 20px auto;
    background: ${theme.header.background};
    box-shadow: ${theme.header.boxShadow};

    // margin approach
    // ${theme.breakpoints.up("lg")} {
    //   width: calc(100% - ${layoutSetup.sidebar.width});
    //   margin-left: ${layoutSetup.sidebar.width};
    // }
  `
);

const ToggleSidebar = styled((props: CUSTOM_ICON_BUTTON_PROPS) => (
  <CustomIconButton {...props} />
))(
  ({ theme }) => `
    position: fixed;
    top: calc(${layoutSetup.header.height} + 50px);
    left: -5px;
    z-index: 100;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background: ${theme.colors.primary.main};
    color: white;
    ${theme.breakpoints.up("md")} {
      display: none;
    }
  `
);

export const Header: React.FC<MINIMAL_SIDEBAR_HEADER_PROPS> = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { isOpen, toggleSidebar } = useContext(SidebarContext);

  const { brandLogo } = props;

  return (
    <>
      <StyledHeader>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            padding: "0 20px",
          }}
        >
          <Image
            width={50}
            height={50}
            src={brandLogo || "/img/app-logo.png"}
          />
          <HideAboveMD>
            {props.extraComponent || (
              <IconButton disableRipple onClick={props.profileProps?.logout}>
                <PowerSettingsNewIcon />
              </IconButton>
            )}
          </HideAboveMD>
          <HideBelowMD sx={{ display: "grid", placeItems: "center" }}>
            <DarkModeToggle
              className="dark-mode-toggler"
              checked={isDarkMode}
              size={50}
              onChange={setIsDarkMode}
            />
          </HideBelowMD>
        </Box>
      </StyledHeader>
      {!isOpen && (
        <ToggleSidebar onClick={toggleSidebar} disableRipple>
          <ChevronRightIcon />
        </ToggleSidebar>
      )}
    </>
  );
};
