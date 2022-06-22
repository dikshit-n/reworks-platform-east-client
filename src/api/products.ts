import { axiosInstance, createApiFunction } from "@/utils";

class ProductsApi {
  fetchProducts(searchKey: string): Promise<Array<any>> {
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
