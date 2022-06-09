import Box, { BoxProps } from "@mui/material/Box";

export const JustifyBetween: React.FC<
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
> = ({ align, ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        ...rest.sx,
        display: "flex",
        justifyContent: "space-between",
        alignItems: align,
      }}
    >
      {rest.children}
    </Box>
  );
};
