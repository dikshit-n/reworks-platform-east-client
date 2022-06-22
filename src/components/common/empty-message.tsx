import { styled, Typography, TypographyProps } from "@mui/material";

export const StyledEmptyMessage = styled(Typography)`
  text-align: center;
  width: 100%;
  padding: 20px 0;
`;

export const EmptyMessage: React.FC<TypographyProps> = (props) => {
  return (
    <StyledEmptyMessage variant="h3" {...props}>
      {props.children}
    </StyledEmptyMessage>
  );
};
