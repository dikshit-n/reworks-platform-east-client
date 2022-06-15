import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const TableActionsWrapper: React.FC = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};
