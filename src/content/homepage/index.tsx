import { productsApi } from "@/api";
import { AsyncDivSpinner, EmptyMessage } from "@/components";
import { authSetup, rbacSetup } from "@/data";
import { useQueryState, useSelector } from "@/hooks";
import { handleError, ignoreEmptyObject } from "@/utils";
import { Paper, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CategoryCard, Header, ProductCard } from "./components";

const StyledCategoriesWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  margin-top: 50px;
`;
const StyledProductsWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
  gap: 20px;
`;

export const HomePageContent = () => {
  const { query, replace } = useRouter();
  const { data } = useSelector((state) => state.auth);
  const searchQuery = ignoreEmptyObject(query);
  const [products = [], loading, { refetch }] = useQueryState({
    queryKey: "products",
    queryFn: () =>
      searchQuery
        ? productsApi.fetchProductsByText(searchQuery?.searchValue)
        : [],
    onError: handleError,
  });
  const [fetchingData, setFetchingData] = useState(loading);

  useEffect(() => {
    (async () => {
      setFetchingData(true);
      await refetch();
      setFetchingData(loading);
    })();
  }, [searchQuery]);

  useEffect(() => {
    setFetchingData(loading);
  }, [loading]);

  useEffect(() => {
    if (!!data) {
      replace(
        `${
          rbacSetup.homePage[data?.roles[0] as keyof typeof rbacSetup.homePage]
        }`
      );
    }
  }, []);

  const categories = [
    {
      name: "Dress",
      href: "/",
      image: "/img/dress.png",
    },
    {
      name: "Cosmetics",
      href: "/",
      image: "/img/cosmetics.png",
    },
    {
      name: "Mobile Phones",
      href: "/",
      image: "/img/mobile.png",
    },
    {
      name: "Laptops",
      href: "/",
      image: "/img/laptop.png",
    },
    {
      name: "Toys",
      href: "/",
      image: "/img/toys.png",
    },
  ];

  return (
    <>
      <Header />
      {loading || fetchingData ? (
        <Paper
          sx={{ width: "calc(100% - 20px)", margin: "30px auto", padding: 1 }}
        >
          <AsyncDivSpinner count={4} />
        </Paper>
      ) : searchQuery ? (
        <StyledProductsWrapper>
          {products.length === 0 ? (
            <EmptyMessage sx={{ my: 10 }}>
              No products found for your search key
            </EmptyMessage>
          ) : (
            products.map((el, index) => <ProductCard {...el} key={index} />)
          )}
        </StyledProductsWrapper>
      ) : (
        <StyledCategoriesWrapper>
          {categories.map((el, index) => (
            <CategoryCard {...el} key={index} />
          ))}
        </StyledCategoriesWrapper>
      )}
    </>
  );
};
