export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
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
