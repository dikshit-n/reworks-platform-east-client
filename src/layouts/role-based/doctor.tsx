import { authSetup, DefaultAvatarSrc } from "@/data";
import { useAuth } from "@/hooks";
import { ExtendedSidebarLayout } from "@/layouts";
import { HEADER_PROPS } from "@/model";
import { routes } from "@/routes";
import { useRouter } from "next/router";

export const DoctorLayout: React.FC = (props) => {
  const { children } = props;
  const router = useRouter();
  const { logout, data } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    router.push(authSetup.authPage);
  };

  const headerProps: HEADER_PROPS = {
    avatar: {
      image: data.image || DefaultAvatarSrc,
      email: data.email,
      name: data.name,
      actions: [
        {
          label: "Profile",
          href: "/patient/profile",
        },
      ],
      logout: handleLogout,
    },
  };

  return (
    <ExtendedSidebarLayout
      headerProps={headerProps}
      sidebarRoutes={routes.doctor}
    >
      {children}
    </ExtendedSidebarLayout>
  );
};
