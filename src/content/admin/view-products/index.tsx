import {
  AsyncDivSpinner,
  CustomIconButton,
  CustomPopover,
  RecursiveContainer,
  TableActionsWrapper,
} from "@/components";
import Tooltip from "@mui/material/Tooltip";
import BackupIcon from "@mui/icons-material/Backup";
import { useFormik } from "formik";
import { CONFIG_TYPE } from "@/model";
import { handleError, parseCSVFile } from "@/utils";
import { useEffect, useState } from "react";
import { productsApi } from "@/api";
import { productDetailHeader } from "@/data";
import { ProductCard } from "./components";
import { Box, Paper, styled, Typography } from "@mui/material";
import { DUMMY_DATA } from "./dummy-data";
import SearchIcon from "@mui/icons-material/Search";
import queryString from "query-string";
import { useRouter } from "next/router";

const ProductsContainerWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  min-height: 100%;
  box-sizing: border-box !important;
  .pagination {
    position: sticky;
    bottom: 0;
    width: 100%;
    padding: 10px;
  }
`
);

const ProductsHeader = styled(Box)`
  position: sticky;
  top: 0;
  margin-left: -10px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  z-index: 1;
  padding: 0 10px;
  box-shadow: none;
  align-items: center;
  background-color: white;
  width: calc(100% + 10px);
  box-sizing: content-box !important;
  .MuiOutlinedInput-root {
    border-radius: 5px !important;
  }
`;

const EmptyMessage = styled(Typography)`
  text-align: center;
  width: 100%;
  padding: 10px 0;
`;

export const ViewProductsContent: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // loadProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      productsCSV: null,
      searchValue: "",
    },
    onSubmit: () => {},
  });

  // backend functions
  const loadProducts = async () => {
    setLoading(true);
    try {
      const productKey = queryString.parse(`${router.query}`);
      console.log(productKey);
      const products = [];
      // const products =  await productsApi.fetchProducts();
      setProducts(products);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleSearch = ({ target: { value } }) => {
    const searchString = queryString.stringify(
      { productId: value },
      { skipNull: true, skipEmptyString: true }
    );
    router.replace(`/admin${searchString ? `?${searchString}` : ""}`);
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      // extract values from the file
      const result = await parseCSVFile(file, {
        transformHeader: (header) => productDetailHeader[header],
      });
      const products = result.data;
      formik.resetForm({ values: { ...formik.values, productsCSV: null } });
      // post to backend
      await productsApi.uploadProducts(products);
      window.flash({ message: "Uploaded successfully" });
      loadProducts();
    } catch (err) {
      handleError(err);
    }
    setUploading(false);
  };

  const uploadFile: CONFIG_TYPE = [
    {
      name: "productsCSV",
      type: "file",
      onChange: handleFileUpload,
      supportedFormats: ["csv"],
      convertToBase64: false,
      onError: (error) => window.flash({ message: error, variant: "error" }),
    },
  ];

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

  const actions = (
    <Tooltip title={uploading ? "Uploading Products" : "Upload Products"}>
      <span>
        <CustomPopover
          disabled={uploading}
          trigger={{
            component: (
              <CustomIconButton loading={uploading}>
                <BackupIcon />
              </CustomIconButton>
            ),
          }}
        >
          <RecursiveContainer
            formContainerProps={{
              style: { padding: "5px 20px", width: 200 },
            }}
            config={uploadFile}
            formik={formik}
          />
        </CustomPopover>
      </span>
    </Tooltip>
  );

  return (
    <>
      <ProductsHeader>
        <RecursiveContainer config={searchBar} formik={formik} />
        {actions}
      </ProductsHeader>
      <ProductsContainerWrapper>
        {DUMMY_DATA.map((el) => (
          <ProductCard {...el} />
        ))}
        {/* {loading ? (
        <AsyncDivSpinner />
      ) : products.length === 0 ? (
        <EmptyMessage variant="h4">No Items Found</EmptyMessage>
      ) : (
      )} */}
        <div className="pagination">Pagination</div>
      </ProductsContainerWrapper>
    </>
  );
};
