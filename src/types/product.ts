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

export type Image = {
  imageUrl: string;
  id: string;
  createdDate: string;
  updatedDate: string;
};

export type Review = {
  id: string;
  content: string;
  ratings: number;
  productId: string;
  userId: string;
  createdDate: string;
  updatedDate: string;
};

export type newReview = Omit<Review, 'id' | 'createdDate' | 'updatedDate'>;

export type newProduct = {
  title: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  images: { imageUrl: string }[];
};

export type updatedProduct = {
  id: string;
  updatedData: newProduct;
};
