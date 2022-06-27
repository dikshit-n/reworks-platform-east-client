import { axiosInstance, createApiFunction } from "@/utils";

class ProductsApi {
  fetchProducts(): Promise<Array<any>> {
    return createApiFunction(() => axiosInstance.get(`/products`));
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
