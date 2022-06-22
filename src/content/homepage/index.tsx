import { productsApi } from "@/api";
import { AsyncDivSpinner, EmptyMessage } from "@/components";
import { useQueryState } from "@/hooks";
import { handleError, ignoreEmptyObject } from "@/utils";
import { Paper, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  const { query } = useRouter();
  const searchQuery = ignoreEmptyObject(query);
  const [products = [], loading, { refetch }] = useQueryState({
    queryKey: "products",
    queryFn: () =>
      searchQuery ? productsApi.fetchProducts(searchQuery?.searchValue) : [],
    onError: handleError,
  });

  useEffect(() => {
    refetch();
  }, [searchQuery]);

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
      {loading ? (
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
