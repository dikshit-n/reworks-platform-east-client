import { useQuery } from "react-query";
import { UseQueryOptions } from "react-query";

export const useQueryState = (options: UseQueryOptions) => {
  const { data, isLoading, ...otherOptions } = useQuery(options);

  return [data, isLoading, otherOptions];
};
