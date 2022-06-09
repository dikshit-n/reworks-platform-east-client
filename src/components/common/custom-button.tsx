import { CUSTOM_BUTTON_PROPS } from "@/model";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

const LinkStyledButton = styled(Button)(
  ({ theme }) => `
  padding: 0;
  color: ${theme.colors.primary.main};
  text-align: left;
  font-weight: normal;
  :hover {
    text-decoration: underline;
    background: none;
  }
`
);

export const CustomButton: React.FC<CUSTOM_BUTTON_PROPS> = (props) => {
  const { push, replace } = useRouter();
  const { loading, href, linkStyle, ...rest } = props;

  const goto = (route: CUSTOM_BUTTON_PROPS["href"]) => {
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

  const ButtonComponent = linkStyle ? LinkStyledButton : Button;

  return (
    <ButtonComponent
      variant={linkStyle ? undefined : "contained"}
      color={linkStyle ? undefined : "primary"}
      startIcon={loading ? <CircularProgress size="1rem" /> : null}
      {...rest}
      disabled={loading || props.disabled}
      sx={{ borderRadius: "30px", ...rest.sx }}
      onClick={
        href || rest.onClick
          ? (e) => {
              if (href) goto(href);
              if (rest.onClick) rest.onClick(e);
            }
          : undefined
      }
    >
      {rest.children}
    </ButtonComponent>
  );
};
