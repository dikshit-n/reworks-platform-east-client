import Box, { BoxProps } from "@mui/material/Box";

export const FlexRow: React.FC<
  BoxProps & {
    align?:
      | "stretch"
      | "center"
      | "flex-start"
      | "flex-end"
      | "baseline"
      | "initial"
      | "inherit";
  }
> = ({ align = "center", ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        ...rest.sx,
        display: "flex",
        alignItems: align,
      }}
    >
      {rest.children}
    </Box>
  );
};
