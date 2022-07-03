import { SIDEBAR_MENU_ITEMS_STRUCTURE } from "@/model";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";

export const adminRoutes: SIDEBAR_MENU_ITEMS_STRUCTURE = [
  {
    heading: "General",
    items: [
      {
        label: "Profile",
        link: "/admin/profile",
        icon: <AccountCircleIcon />,
      },
      {
        label: "View Products",
        link: "/admin",
        icon: <ListIcon />,
      },
      {
        label: "User",
        link: "/admin/user",
        icon: <PersonIcon />,
      },
    ],
  },
];
