import { DefaultAvatarSrc } from "@/data";
import { ignoreEmptyObject } from "@/utils";
import { styled } from "@mui/material";
import { useRouter } from "next/router";
import { DUMMY_DATA } from "../admin/view-products/dummy-data";
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
      {searchQuery ? (
        <StyledProductsWrapper>
          {DUMMY_DATA.map((el, index) => (
            <ProductCard {...el} key={index} />
          ))}
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
