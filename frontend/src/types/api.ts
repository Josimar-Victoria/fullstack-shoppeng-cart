import { Item } from "@/lib/types";

export interface CreateProductResponse {
  message: string;
  product: Item;
}

export interface ProductDetailResponse {
  message: string;
  product: Item;
}

export interface UpdateProductResponse {
  message: string;
  product: Item;
}

export interface MyProductsResponse {
  message: string;
  products: Item[];
}

export interface DeleteResponse {
  message: string;
}