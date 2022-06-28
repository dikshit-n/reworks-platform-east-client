import { axiosInstance, createApiFunction, getSearchString } from "@/utils";

class ProductsApi {
  fetchProducts(page?: string | number): Promise<Array<any>> {
    return createApiFunction(() =>
      axiosInstance.get(`/products${getSearchString({ page })}`)
    );
  }
  fetchProductsByText(searchKey: string): Promise<Array<any>> {
    return createApiFunction(() =>
      axiosInstance.post(`/products/search`, { searchKey })
    );
  }
  uploadProducts(products): Promise<void> {
    return createApiFunction(() =>
      axiosInstance.post("/products/csv/import", products)
    );
  }
}

export const productsApi = new ProductsApi();
