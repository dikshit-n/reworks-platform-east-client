// import { PRODUCT_DETAILS } from "@/model";
import { axiosInstance, createApiFunction, getSearchString } from "@/utils";

class ProductsApi {
  fetchProducts(
    query?: { searchKey: string; page?: string | number } | null
  ): Promise<Array<any>> {
    const { searchKey = "", page = 1 } = query || {};
    return createApiFunction(() =>
      axiosInstance.get(
        `/products/search${getSearchString({ page, searchKey })}`
      )
    );
  }
  uploadProducts(products): Promise<void> {
    return createApiFunction(() =>
      axiosInstance.post("/products/csv/import", products)
    );
  }
  deleteProduct(_id: string): Promise<void> {
    return createApiFunction(() => axiosInstance.delete(`/products/${_id}`));
  }
}

export const productsApi = new ProductsApi();
