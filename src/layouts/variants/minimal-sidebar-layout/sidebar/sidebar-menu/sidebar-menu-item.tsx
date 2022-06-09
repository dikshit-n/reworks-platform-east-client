import { FC, useState, MouseEvent } from "react";
import clsx from "clsx";
import NextLink from "next/link";

import {
  IconButton,
  Box,
  Tooltip,
  Popover,
  ListItem,
  styled,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone";
import { SIDEBAR_MENU_ITEM_STRUCTURE, SIDEBAR_MENU_PROPS } from "@/model";
import { useRouter } from "next/router";
import { isActiveRoute } from "@/utils";

const IndicatorWrapper = styled(Box)(
  ({ theme }) => `
  position: absolute;
  top: 50%;
  margin-top: -9px;
  right: -${theme.spacing(0.4)};
  width: 18px;
  height: 18px;

  .MuiSvgIcon-root {
    width: 100%;
    height: auto;
  }
`
);

const PopoverWrapper = styled(Popover)(
  ({ theme }) => `
  .MuiList-root {
    min-width: 240px;
    padding: ${theme.spacing(2)} !important;

    .MuiListItem-root {
      padding: 2px 0 !important;

      .MuiIconButton-root {
        width: 100% !important;
        height: auto !important;
        justify-content: flex-start !important;
        font-weight: bold !important;
        background: transparent !important;
        color: ${theme.colors.alpha.black[70]} !important;
        padding: ${theme.spacing(1, 2)} !important;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(1.8)};
          top: 19px;
        }

        .name-wrapper {
          display: block !important;
        }

        &.Mui-active,
        &:hover {
          background: ${theme.colors.alpha.black[10]} !important;
          color: ${theme.sidebar.menuItemColorActive} !important;
        }
      }
    }  
  }
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.black[100],
    color: theme.palette.getContrastText(theme.colors.alpha.black[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.black[100],
  },
}));

export const SidebarMenuItem: FC<
  SIDEBAR_MENU_ITEM_STRUCTURE & {
    closeSidebar?: SIDEBAR_MENU_PROPS["closeSidebar"];
  }
> = ({ items, link, icon: Icon, label, closeSidebar = () => {}, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const open = Boolean(anchorEl);

  if (items) {
    return (
      <ListItem component="div" className="Mui-children" key={label} {...rest}>
        <TooltipWrapper
          title={label}
          disableInteractive
          placement="right"
          arrow
        >
          <IconButton
            className={clsx({ "Mui-active": isOpen })}
            onClick={handleClick}
          >
            {Icon || null}

            <IndicatorWrapper>
              {open ? (
                <KeyboardArrowLeftTwoToneIcon />
              ) : (
                <KeyboardArrowRightTwoToneIcon />
              )}
            </IndicatorWrapper>
          </IconButton>
        </TooltipWrapper>
        <PopoverWrapper
          disableScrollLock
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          open={open}
        >
          {items.map((el, index) => (
            <SidebarMenuItem key={index} {...el} />
          ))}
        </PopoverWrapper>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={label} {...rest}>
      <NextLink href={link} passHref>
        <TooltipWrapper
          title={label}
          disableInteractive
          placement="right"
          arrow
        >
          <IconButton
            component="a"
            className={clsx({
              "Mui-active": isActiveRoute({ path: router.asPath, route: link }),
            })}
            disableRipple
            onClick={closeSidebar}
          >
            {Icon || null}
            {/* <span className="name-wrapper">{label}</span> */}
          </IconButton>
        </TooltipWrapper>
      </NextLink>
    </ListItem>
  );
};

export default SidebarMenuItem;
