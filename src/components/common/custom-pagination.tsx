import { CUSTOM_PAGINATION_PROPS } from "@/model";
import PaginationItem from "@mui/material/PaginationItem";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { getSearchString } from "@/utils";
import { CustomLink } from "@/components";
import { useTheme } from "@mui/material";

export const CustomPagination: React.FC<CUSTOM_PAGINATION_PROPS> = (props) => {
  const theme = useTheme();
  const { pathname, query } = useRouter();
  const {
    to = pathname,
    page,
    count,
    pageAccessor = "page",
    stickToBottom = true,
    ...rest
  } = props;
  let renderPage = parseInt(`${page || 0}`);

  if (!renderPage)
    renderPage = parseInt(`${query ? query[pageAccessor] : 0}`) || 1;

  const getDestinationHref = (pageNumber) => {
    const searchString = getSearchString({
      ...query,
      [pageAccessor]: pageNumber === 1 ? undefined : pageNumber,
    });
    return `${to}${searchString}`;
  };

  const stickToBottomStyle: any = {
    position: "sticky",
    bottom: 0,
    width: "100%",
    backgroundColor: theme.palette.background.default,
  };

  const sx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 0",
    ...(stickToBottom ? { ...rest.sx, ...stickToBottomStyle } : { ...rest.sx }),
  };

  return (
    !!renderPage &&
    count > 1 && (
      <Pagination
        count={count}
        page={renderPage}
        renderItem={(item) => (
          <PaginationItem
            href={getDestinationHref(item.page)}
            component={CustomLink}
            {...item}
          />
        )}
        {...rest}
        sx={sx}
      />
    )
  );
};
