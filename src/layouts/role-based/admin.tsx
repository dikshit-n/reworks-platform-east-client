import { authSetup, DefaultAvatarSrc } from "@/data";
import { useAuth } from "@/hooks";
import { MinimalSidebarLayout } from "@/layouts";
import { PROFILE_PROPS } from "@/model";
import { routes } from "@/routes";
import { useRouter } from "next/router";

export const AdminLayout: React.FC = (props) => {
  const { children } = props;
  const router = useRouter();
  const { logout, data } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    router.push(authSetup.authPage);
  };

  const profileProps: PROFILE_PROPS = {
    avatar: {
      image: data?.image || DefaultAvatarSrc,
      name: data?.name,
      email: data?.email,
      link: "/admin/profile",
    },
    logout: handleLogout,
  };

  return (
    <MinimalSidebarLayout
      profileProps={profileProps}
      sidebarRoutes={routes.admin}
    >
      {children}
    </MinimalSidebarLayout>
  );
};
