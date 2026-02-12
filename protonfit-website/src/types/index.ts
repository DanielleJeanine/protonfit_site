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

export interface BudgetProductDTO {
  productName: string;
  productCode: string;
  productQuantity: number;
}

export interface BudgetRequestDTO {
  name: string;
  email: string;
  phone: string;
  company?: string; 
  message?: string;
  products: BudgetProductDTO[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}