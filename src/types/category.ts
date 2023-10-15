export interface category {
  id: number;
  name: string;
  image: string;
}

export interface newCategory {
  name: string;
  image: string;
}

export interface updatedCategory {
  id: number;
  updatedData: Partial<newCategory>;
}
