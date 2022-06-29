import {
  AsyncDivSpinner,
  CustomIconButton,
  CustomPagination,
  CustomPopover,
  EmptyMessage,
  RecursiveContainer,
} from "@/components";
import Tooltip from "@mui/material/Tooltip";
import BackupIcon from "@mui/icons-material/Backup";
import { useFormik } from "formik";
import { CONFIG_TYPE } from "@/model";
import {
  downloadLink,
  getSearchString,
  handleError,
  parseCSVFile,
} from "@/utils";
import { useState } from "react";
import { productsApi } from "@/api";
import { productDetailHeader } from "@/data";
import { ProductCard } from "./components";
import { Box, styled } from "@mui/material";
import { DUMMY_DATA } from "./dummy-data";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useQueryState } from "@/hooks";
import DownloadIcon from "@mui/icons-material/Download";

const ProductsContainerWrapper = styled(Box)`
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
`;

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

export const ViewProductsContent: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const page = `${router.query?.page || 1}`;
  const [products, loading, { refetch }] = useQueryState({
    queryKey: ["products", page],
    queryFn: () => productsApi.fetchProducts(page),
    onError: handleError,
    keepPreviousData: true,
  });

  const formik = useFormik({
    initialValues: {
      productsCSV: null,
      searchValue: "",
    },
    onSubmit: () => {},
  });

  const handleSearch = ({ target: { value } }) => {
    const searchString = getSearchString({ productId: value });
    router.replace(`/admin${searchString}`);
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      // extract values from the file
      const { data: products } = await parseCSVFile(file, {
        transformHeader: (header) => productDetailHeader[header],
      });
      formik.resetForm({ values: { ...formik.values, productsCSV: null } });
      // post to backend
      await productsApi.uploadProducts(products);
      window.flash({ message: "Uploaded successfully" });
      refetch();
    } catch (err) {
      handleError(err);
    }
    setUploading(false);
  };

  const handleSampeDownload = () =>
    downloadLink({
      link: "/files/sample-product-upload.csv",
      name: "Sample Product Upload CSV",
    });

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
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Download Sample">
        <span>
          <CustomIconButton onClick={handleSampeDownload}>
            <DownloadIcon />
          </CustomIconButton>
        </span>
      </Tooltip>
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
    </Box>
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
          products.map((el, index) => <ProductCard {...el} />)
        )} */}
        <div className="pagination">
          <CustomPagination count={10} />
        </div>
      </ProductsContainerWrapper>
    </>
  );
};
