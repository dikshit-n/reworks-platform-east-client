import { styled } from "@mui/material";

const StyledTagWrapper = styled("div")(
  ({ theme }) => `
        display: flex;
        width: fit-content;
        flex-direction: row;
        align-items: center;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 4px 4px 5px 0 #c2c2c2; 
        .tag-name {
            background-color: ${theme.colors.primary.main};
            padding: 5px 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            > small {
                color: white;
                margin: 0;
            }
        }
        .tag-content {
            padding: 5px 10px;
            > small {
                margin: 0;
            }
        }
`
);

export const Tag = (props) => {
  const { name, value } = props;
  return (
    <StyledTagWrapper>
      <div className="tag-name">
        <small>{name}</small>
      </div>
      <div className="tag-content">
        <small>{value}</small>
      </div>
    </StyledTagWrapper>
  );
};
