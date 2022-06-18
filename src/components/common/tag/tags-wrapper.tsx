import { styled } from "@mui/material";

const StyledTagsWrapper = styled("div")(
  `display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 5px;
`
);

export const TagsWrapper: React.FC = (props) => (
  <StyledTagsWrapper>{props.children}</StyledTagsWrapper>
);
