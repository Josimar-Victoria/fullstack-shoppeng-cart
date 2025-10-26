export interface IProduct {
  id: string;
  name: string;
  price: number;
  type: string;
  stock: number;
  image: string;
  category: string;
  description: string;
  rating?: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface IProductResponse {
  message: string;
  product?: IProduct;
  products?: IProduct[];
}
