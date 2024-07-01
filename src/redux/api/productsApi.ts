// productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategory, ProductForApi } from "../../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: ProductForApi[]; total: number },
      { limit: number; skip: number }
    >({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(
                ({ id }) => ({ type: "Product", id } as const)
              ),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query<ProductForApi, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getCategories: builder.query<ProductCategory[], void>({
      query: () => "products/categories",
    }),
    updateProduct: builder.mutation<
      void,
      { id: number; data: Partial<ProductForApi> }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} = productsApi;
