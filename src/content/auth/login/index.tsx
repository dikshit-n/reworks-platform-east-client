import { Card, Grid, styled, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { LoginForm } from "./login-form";
import { CustomButton } from "@/components";
import { AppLogoExtendedSrc } from "@/data";
import { useRouter } from "next/router";

const LoginPageWrapper = styled(Grid)`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: grid;
  place-items: center;
`;

const LoginCardWrapper = styled(Card)(
  ({ theme }) => `
    width: 90%;
    max-width: 600px;
    height: fit-content;
    min-height: 200px;
    padding: 30px;
    display: flex;
    gap: 10px;
    .image {
        display: block;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("${AppLogoExtendedSrc}");
        width: 40%;
        border-right: 1px solid lightgrey;
    }
    ${theme.breakpoints.down("sm")} {
        .image {
            display: none;
        }
        .login-form {
          width: 100% !important; 
        }
    }
    .login-form {
        display: flex;
        flex-direction: column;
        width: 60%;
    }
`
);

export const LoginContent: React.FC = () => {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <LoginPageWrapper container>
      <LoginCardWrapper>
        <Box className="image" />
        <Box className="login-form">
          <LoginForm />
          <Divider sx={{ my: 2 }} />
          <CustomButton href="/auth/signup">Create Account</CustomButton>
        </Box>
      </LoginCardWrapper>
    </LoginPageWrapper>
  );
};
