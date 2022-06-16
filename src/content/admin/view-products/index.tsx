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
import { Box, styled, Typography } from "@mui/material";
import { DUMMY_DATA } from "./dummy-data";

const ProductsContainerWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  min-height: 100%;
  box-sizing: border-box !important;
  .search-bar {
    position: sticky;
    top: 0;
    padding: 10px;
    box-sizing: border-box;
  }
  .pagination {
    position: sticky;
    bottom: 0;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`
);

const EmptyMessage = styled(Typography)`
  text-align: center;
  width: 100%;
  padding: 10px 0;
`;

export const ViewProductsContent: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // loadProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      productsCSV: null,
    },
    onSubmit: () => {},
  });

  // backend functions
  const loadProducts = async () => {
    setLoading(true);
    try {
      const products = await productsApi.fetchProducts();
      setProducts(products);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      // extract values from the file
      const result = await parseCSVFile(file, {
        transformHeader: (header) => productDetailHeader[header],
      });
      const products = result.data;
      formik.resetForm({ values: formik.initialValues });
      console.log(products);
      // post to backend
      await productsApi.uploadProducts(products);
      window.flash({ message: "Uploaded successfully" });
      loadProducts();
    } catch (err) {
      handleError(err);
    }
    setUploading(false);
  };

  const fields: CONFIG_TYPE = [
    {
      name: "productsCSV",
      type: "file",
      onChange: handleFileUpload,
      supportedFormats: ["csv"],
      convertToBase64: false,
      onError: (error) => window.flash({ message: error, variant: "error" }),
    },
  ];

  const COLUMNS = [
    { Header: "Product Name", accessor: "readable_name" },
    { Header: "Description", accessor: "item_desc" },
  ];

  const actions = (
    <TableActionsWrapper>
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
              config={fields}
              formik={formik}
            />
          </CustomPopover>
        </span>
      </Tooltip>
    </TableActionsWrapper>
  );

  return (
    <ProductsContainerWrapper>
      <div>Searchbox</div>
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
  );
};
