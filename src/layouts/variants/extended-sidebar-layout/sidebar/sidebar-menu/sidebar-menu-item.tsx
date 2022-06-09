import { SIDEBAR_MENU_ITEM_STRUCTURE, SIDEBAR_MENU_PROPS } from "@/model";
import { isActiveRoute } from "@/utils";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";

export const SidebarMenuItem: React.FC<
  SIDEBAR_MENU_ITEM_STRUCTURE & {
    closeSidebar?: SIDEBAR_MENU_PROPS["closeSidebar"];
  }
> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { link, label, icon, items, closeSidebar = () => {} } = props;
  const router = useRouter();

  if (items) {
    return (
      <ListItem component="div" className="sub-menu">
        <Button
          startIcon={
            icon || (
              <FiberManualRecordIcon sx={{ width: 10, height: 10, mx: 0.5 }} />
            )
          }
          endIcon={
            isOpen ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />
          }
          className={clsx({
            "Mui-active": isOpen,
            "drop-down-toggle": true,
          })}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {label}
        </Button>
        <Collapse in={isOpen}>
          {items.map((el, index) => (
            <SidebarMenuItem key={index} {...el} />
          ))}
        </Collapse>
      </ListItem>
    );
  }
  return link ? (
    <ListItem component="div">
      <Link href={link} passHref>
        <Button
          className={clsx({
            "Mui-active": isActiveRoute({ path: router.asPath, route: link }),
            "has-default-icon": !!!icon, // if an icon is not provided, we will use a default icon
          })}
          startIcon={
            icon || (
              <FiberManualRecordIcon sx={{ width: 10, height: 10, mx: 0.5 }} />
            )
          }
          component="a"
          disableRipple
          onClick={closeSidebar}
        >
          {label}
        </Button>
      </Link>
    </ListItem>
  ) : null;
};
