import { Card, Grid, styled, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { SignupForm } from "./signup-form";
import { CustomButton } from "@/components";
import { AppLogoExtendedSrc } from "@/data";

const SignupPageWrapper = styled(Grid)`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: grid;
  place-items: center;
`;

const SignupCardWrapper = styled(Card)(
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
        .signup-form {
          width: 100% !important; 
        }
    }
    .signup-form {
        display: flex;
        flex-direction: column;
        width: 60%;
    }
`
);

export const SignupContent: React.FC = () => {
  return (
    <SignupPageWrapper container>
      <SignupCardWrapper>
        <Box className="image" />
        <Box className="signup-form">
          <SignupForm />
          <Divider sx={{ my: 2 }} />
          <CustomButton href="/auth/login">Continue to login</CustomButton>
        </Box>
      </SignupCardWrapper>
    </SignupPageWrapper>
  );
};
