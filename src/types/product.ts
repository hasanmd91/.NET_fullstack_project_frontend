import { category } from '../types/category';

export interface product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  CategoryId: string;
  images: { imageUrl: string }[];
}

export interface newProduct {
  title: string;
  description: string;
  price: number;
  quantity: number;
  CategoryId: string;
  images: { imageUrl: string }[];
}

export interface newProductYup {
  title: string;
  price: number;
  description: string;
  images: string;
  categoryId: number;
}

export interface updatedProduct {
  id: number;
  updatedData: Partial<newProduct>;
}
