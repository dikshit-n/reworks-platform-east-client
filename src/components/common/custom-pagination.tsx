import { CUSTOM_PAGINATION_PROPS } from "@/model";
import PaginationItem from "@mui/material/PaginationItem";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { getSearchString } from "@/utils";
import { CustomLink } from "@/components";

export const CustomPagination: React.FC<CUSTOM_PAGINATION_PROPS> = (props) => {
  const { pathname, query } = useRouter();
  const { to = pathname, page, count, pageAccessor = "page", ...rest } = props;
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
      />
    )
  );
};
