import { AppLogoSrc, authSetup } from "@/data";
import { CONFIG_TYPE } from "@/model";
import { Paper, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSearchString } from "@/utils";
import { CustomButton, RecursiveContainer } from "@/components";
import { useFormik } from "formik";
import LoginIcon from "@mui/icons-material/Login";

const StyledHeader = styled(Paper)`
  position: sticky;
  top: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 50px auto 80px;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  border-radius: 0;
`;

export const Header = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { searchValue: "" },
    onSubmit: () => {},
  });

  const handleSearch = ({ target: { value } }) => {
    const searchString = getSearchString({ searchValue: value });
    router.replace(`/${searchString}`);
  };

  const searchBar: CONFIG_TYPE = [
    {
      name: "searchValue",
      type: "debounce-text",
      onChange: handleSearch,
      placeholder: "Search Products",
      addon: {
        position: "start",
        component: <SearchIcon />,
      },
    },
  ];

  return (
    <StyledHeader>
      <Image width={50} height={50} src={AppLogoSrc} />
      <RecursiveContainer config={searchBar} formik={formik} />
      <CustomButton
        startIcon={<LoginIcon />}
        size="small"
        href={authSetup.authPage}
      >
        Login
      </CustomButton>
    </StyledHeader>
  );
};
