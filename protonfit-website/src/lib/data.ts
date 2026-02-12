import axios from 'axios';
import api from './api';
import { Category, PaginatedResponse, Product, BudgetProductDTO, BudgetRequestDTO } from '@/types';


export async function getCategories(): Promise<{ status: number; data: Category[] | null }> {
  try {
    const response = await api.get<Category[]>('/categories');
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Erro ao buscar categorias:", error.response.data);
      return { status: error.response.status, data: null };
    } else {
      console.error("Erro desconhecido ao buscar categorias:", error);
      return { status: 500, data: null };
    }
  }
}

export async function getCategoryById(id: number): Promise<{ status: number; data: Category | null }> {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ao buscar categoria ${id}:`, error.response.data);
      return { status: error.response.status, data: null };
    } else {
      console.error(`Erro desconhecido ao buscar categoria ${id}:`, error);
      return { status: 500, data: null };
    }
  }
}


export async function getProductById(id: number): Promise<{ status: number; data: Product | null }> {
  try {
    const response = await api.get<Product>(`/products/details/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ao buscar produto ${id}:`, error.response.data);
      return { status: error.response.status, data: null };
    } else {
      console.error(`Erro desconhecido ao buscar produto ${id}:`, error);
      return { status: 500, data: null };
    }
  }
}


export async function getProductsByCategoryId(
  categoryId: number,
  page: number = 0,
  size: number = 12
): Promise<{ status: number; data: PaginatedResponse<Product> | null }> {
  try {
    const response = await api.get<PaginatedResponse<Product>>(`/products?categoryId=${categoryId}&page=${page}&size=${size}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ao buscar produtos da categoria ${categoryId}:`, error.response.data);
      return { status: error.response.status, data: null };
    } else {
      console.error(`Erro desconhecido ao buscar produtos da categoria ${categoryId}:`, error);
      return { status: 500, data: null };
    }
  }
}

export async function sendBudgetRequest(budgetData: BudgetRequestDTO): Promise<{ status: number; message?: string }> {
  try {    
    const response = await api.post('/budget', budgetData);
    return { status: response.status, message: response.data.message || 'Pedido de orçamento enviado com sucesso!' };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Erro ao enviar pedido de orçamento:", error.response.data);
      return { status: error.response.status, message: error.response.data.message || 'Erro ao enviar pedido de orçamento.' };
    } else {
      console.error("Erro desconhecido ao enviar pedido de orçamento:", error);
      return { status: 500, message: 'Erro desconhecido ao enviar pedido de orçamento.' };
    }
  }
}