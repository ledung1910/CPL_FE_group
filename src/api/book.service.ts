import { apiClient } from './api.client';
import { Book, ApiResponse } from '../../interfaces';

export const BookService = {
  // Lấy danh sách sách
  getBooks: async (): Promise<Book[]> => {
    const response = await apiClient.get<ApiResponse>('/books');
    return response.data.books; 
  },

  // Lấy chi tiết sách
  getBookById: async (id: string): Promise<Book> => {
    const response = await apiClient.get<{ data: Book }>(`/books/${id}`);
    return response.data.data;
  },

  // Tạo sách mới
  createBook: async (bookData: Omit<Book, 'id'>): Promise<Book> => {
    const response = await apiClient.post<Book>('/books', bookData);
    return response.data; // Axios trả về data đã được parse
  },

  // Cập nhật sách
  updateBook: async (id: string, bookData: Partial<Book>): Promise<Book> => {
    const response = await apiClient.patch<Book>(`/books/${id}`, bookData);
    return response.data;
  },

  // Xóa sách
  deleteBook: async (id: string): Promise<void> => {
    await apiClient.delete(`/books/${id}`);
  }
};