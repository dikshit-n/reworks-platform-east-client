import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { SidebarContext } from "@/context";
import { CustomIconButton, CustomPopover, CustomButton } from "@/components";
import { CUSTOM_ICON_BUTTON_PROPS, HEADER_PROPS } from "@/model";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { CUSTOM_BUTTON_PROPS } from "@/model";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import { projectSetup } from "@/data";
import { layoutSetup } from "./layout-setup";

const StyledHeader = styled(Box)(
  ({ theme }) => `
    height: ${layoutSetup.header.height};
    width: 100%;
    background: ${theme.header.background};
    box-shadow: ${theme.header.boxShadow};

    // margin approach
    // ${theme.breakpoints.up("lg")} {
    //   width: calc(100% - 290px);
    //   margin-left: 290px;
    // }
  `
);

const AvatarPopoverWrapper = styled(Card)`
  max-width: fit-content;
`;
const UserInfoWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.black[10]};
    display: grid;
    grid-template-columns: 50px auto;
    padding: 10px;
  `
);
const UserDetailsWrapper = styled(Box)`
  display: flex;
  width: 100%;
  max-width: 100%;
  flex-direction: column;
  > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const UserActionButton = styled((props: CUSTOM_BUTTON_PROPS) => (
  <CustomButton {...props} />
))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
`;

const ToggleSidebar = styled((props: CUSTOM_ICON_BUTTON_PROPS) => (
  <CustomIconButton {...props} />
))(
  ({ theme }) => `
    ${theme.breakpoints.up("lg")} {
      display: none;
    }
  `
);

export const Header: React.FC<HEADER_PROPS> = (props) => {
  const { isOpen, toggleSidebar } = useContext(SidebarContext);

  const { avatar = {} } = props;

  return (
    <StyledHeader>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          padding: "0 10px",
        }}
      >
        <Typography variant="h3">{projectSetup.title}</Typography>
        <Stack direction="row">
          <CustomPopover
            closeOnClick={false}
            trigger={{
              component: (
                <CustomIconButton sx={{ borderRadius: "50%" }}>
                  <Avatar src={avatar.image || undefined} alt={avatar.name} />
                </CustomIconButton>
              ),
            }}
          >
            <AvatarPopoverWrapper elevation={2}>
              <UserInfoWrapper>
                <Avatar src={avatar.image || undefined} alt={avatar.name} />
                <UserDetailsWrapper>
                  <Typography>{avatar.name}</Typography>
                  <Typography>{avatar.email}</Typography>
                </UserDetailsWrapper>
              </UserInfoWrapper>
              <Divider />
              <List sx={{ padding: 0 }}>
                <ListItem>
                  {avatar.actions?.map((el, index) => (
                    <UserActionButton
                      key={index}
                      variant="outlined"
                      fullWidth
                      endIcon={<ArrowForwardIosIcon />}
                      {...el}
                    >
                      {el.label}
                    </UserActionButton>
                  ))}
                </ListItem>
              </List>
              <Divider />
              <Box m={1}>
                <CustomButton
                  fullWidth
                  onClick={avatar.logout}
                  sx={{ borderRadius: 20 }}
                  endIcon={<LockOpenOutlined />}
                >
                  Sign Out
                </CustomButton>
              </Box>
            </AvatarPopoverWrapper>
          </CustomPopover>
          <ToggleSidebar onClick={toggleSidebar}>
            {isOpen ? <CloseTwoToneIcon /> : <MenuTwoToneIcon />}
          </ToggleSidebar>
        </Stack>
      </Box>
    </StyledHeader>
  );
};
