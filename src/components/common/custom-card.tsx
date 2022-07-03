import { AsyncDivSpinner } from "@/components";
import {
  styled,
  BoxProps,
  CardProps,
  Card,
  Box,
  Typography,
} from "@mui/material";
import { ComponentProps, ElementType } from "react";

const CardHeader = styled("div")(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  // background-color: ${theme.palette.background.paper};
  margin: 10px 0;
  border-radius: 5px;
  // box-shadow: 0 0 10px 0 ${theme.colors.alpha.black[10]};
  `
);

const CardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const CardHeaderText = styled(Typography)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    font-size: 22px;
`
);

export interface CUSTOM_CARD_PROPS<T extends ElementType<any> = "div">
  extends CardProps {
  loading?: boolean;
  containerProps?: BoxProps<T>;
  cardBodyProps?: BoxProps;
  headerContainerProps?: ComponentProps<"div">;
  header?: string | React.ReactElement;
  actions?: React.ReactElement | string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export const CustomCard: React.FC<CUSTOM_CARD_PROPS> = (props) => {
  const {
    loading,
    header,
    actions,
    containerProps = {},
    cardBodyProps = {},
    headerContainerProps = {},
    isEmpty = false,
    emptyMessage = "No details found",
    ...rest
  } = props;

  let cardHeader: any = null;
  if (header) {
    cardHeader = (
      <CardHeader {...headerContainerProps}>
        {typeof header === "string" ? (
          <CardHeaderText>{header}</CardHeaderText>
        ) : (
          { header }
        )}
        {actions}
      </CardHeader>
    );
  }

  return (
    <CardContainer
      {...containerProps}
      sx={{ m: 2, ...containerProps.sx }}
      className={["custom-scrollbar", containerProps?.className]
        .filter((el) => el)
        .join(" ")}
    >
      {cardHeader}
      <Card {...rest}>
        <Box {...cardBodyProps} sx={{ p: 2, ...cardBodyProps.sx }}>
          {loading ? (
            <AsyncDivSpinner />
          ) : isEmpty ? (
            <Typography
              variant="h3"
              sx={{ textAlign: "center", py: 5, fontWeight: "lighter" }}
            >
              {emptyMessage}
            </Typography>
          ) : (
            props.children
          )}
        </Box>
      </Card>
    </CardContainer>
  );
};
