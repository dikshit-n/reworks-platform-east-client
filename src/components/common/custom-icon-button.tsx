import { CUSTOM_ICON_BUTTON_PROPS } from "@/model";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

export const CustomIconButton: React.FC<CUSTOM_ICON_BUTTON_PROPS> = (props) => {
  const { push, replace } = useRouter();
  const { href, loading, ...rest } = props;

  const goto = (route: CUSTOM_ICON_BUTTON_PROPS["href"]) => {
    if (route) {
      if (typeof route === "string") push(route);
      else if ("url" in route) {
        if (route.options?.replace) replace(route.url, route.as, route.options);
        else push(route.url, route.as, route.options);
      } else {
        if (route.replace) replace(route);
        else push(route);
      }
    }
  };

  return (
    <IconButton
      color="primary"
      {...rest}
      onClick={
        loading || rest.disabled
          ? undefined
          : href || rest.onClick
          ? (e) => {
              if (href) goto(href);
              if (rest.onClick) rest.onClick(e);
            }
          : undefined
      }
    >
      {loading ? <CircularProgress size="1rem" /> : rest.children}
    </IconButton>
  );
};
