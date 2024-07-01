export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  _id: string;
};

export type OrderType = {
  name: string;
  address: string;
  city: string;
  country: string;
  state: string;
  pinCode: number;
  status: "Processing" | "Shipped" | "Delivered";
  subtotal: number;
  discount: number;
  shippingCharges: number;
  tax: number;
  total: number;
  orderItems: OrderItemType[];
  _id: string;
};

export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
}

export interface ProductFormValues {
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  reviews: Review[];
}

export interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

export interface ProductForApi {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  description: string;
  reviews: { reviewerName: string; rating: number; comment: string }[];
}

export interface ProductCategory {
  slug: string;
  name: string;
}
