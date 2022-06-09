import { styled } from "@mui/material";

export const HideBelowMD = styled("div")(
  ({ theme }) => `
        ${theme.breakpoints.down("md")} {
            display: none;
        }
        `
);

export const HideAboveMD = styled("div")(
  ({ theme }) => `
        ${theme.breakpoints.up("md")} {
            display: none;
        }
    `
);
