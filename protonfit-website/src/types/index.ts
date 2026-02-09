export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: number;
  name: string;
  code: string;
  description: string;
  imageUrl: string;
  categoryId: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}