import { category } from '../types/category';

export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: category;
  images: string[];
}

export interface newProduct {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
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
