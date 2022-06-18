import queryString from "query-string";

export const isActiveRoute = ({
  path,
  route,
}: {
  path: string;
  route: string;
}) => {
  path = getValidRouteName(path);
  route = getValidRouteName(route);
  return path === route;
};

const getValidRouteName = (pathname: string) => {
  if (pathname) {
    let newPathname = pathname;
    if (!newPathname.startsWith("/")) {
      newPathname = `/${newPathname}`;
    }
    if (!newPathname.endsWith("/")) {
      newPathname = `${newPathname}/`;
    }
    return newPathname;
  }
  return pathname;
};

export const getSearchString = (
  object: Record<string, any>,
  options?: queryString.StringifyOptions
) => {
  let searchString = queryString.stringify(object, {
    skipNull: true,
    skipEmptyString: true,
    ...options,
  });
  searchString = `${searchString ? `?${searchString}` : ""}`;
  return searchString;
};
