import { category } from '../types/category';

export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: category;
  images: string[];
  quantity?: number;
  inStock?: boolean;
}

export interface newProduct {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}

export interface updatedProduct {
  id: number;
  updatedData: Partial<newProduct>;
}
