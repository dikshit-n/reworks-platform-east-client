import { SIDEBAR_MENU_ITEMS_STRUCTURE } from "@/model";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ListIcon from "@mui/icons-material/List";

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
    ],
  },
];
