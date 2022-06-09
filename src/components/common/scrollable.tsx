import Box, { BoxProps } from "@mui/system/Box";

export const Scrollable: React.FC<{
  fullHeight?: boolean;
  containerProps?: BoxProps;
}> = ({ fullHeight = false, containerProps = {}, children }) => {
  return (
    <Box
      {...containerProps}
      sx={{
        ...containerProps.sx,
        height: fullHeight ? "100%" : "fit-content",
        maxHeight: "100%",
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};
