export type product = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  category: category;
  images: Image[];
  reviews: Review[];
};

type category = {
  name: string;
  id: string;
  createdDate: string;
  updatedDate: string;
};

type Image = {
  imageUrl: string;
  id: string;
  createdDate: string;
  updatedDate: string;
};

type Review = {
  content: string;
  ratings: number;
  productId: string;
  userId: string;
  id: string;
  createdDate: string;
  updatedDate: string;
};

export interface newProduct {
  title: string;
  description: string;
  price: number;
  quantity: number;
  CategoryId: string;
  images: { imageUrl: string }[];
}

export interface updatedProduct {
  id: number;
  updatedData: Partial<newProduct>;
}
