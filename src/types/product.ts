import { category } from '../types/category';

export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: category;
  images: string[];
}

export interface NewProduct {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}

export interface UpdatedProduct {
  id: number;
  updatedData: Partial<NewProduct>;
}
