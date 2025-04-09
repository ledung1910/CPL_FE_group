import { Book, Category } from "../../interfaces";
import apiClient from "./api.client";

// Lấy tất cả sách
export const getBooks = async (): Promise<Book[]> => {
  return await apiClient.get("/books") as Book[];
};

// Lấy sách theo ID
export const getBookById = async (id: string): Promise<Book> => {
  return await apiClient.get(`/books/${id}`) as Book;
};

// Tạo mới sách
export const createBook = async (bookData: Omit<Book, "id">): Promise<Book> => {
  return await apiClient.post("/books", bookData) as Book;
};

// Cập nhật sách
export const updateBook = async (
  id: string,
  bookData: Partial<Book>
): Promise<Book> => {
  return await apiClient.patch(`/books/${id}`, bookData) as Book;
};

// Xoá sách
export const deleteBook = async (id: string): Promise<void> => {
  await apiClient.delete(`/books/${id}`);
};

export const getCategories = async (): Promise<Category[]> => {
  const books = await getBooks();
  const categoryMap = new Map<string, Category>();

  books.forEach((book) => {
    const category = book.categories;
    if (category && !categoryMap.has(category.id)) {
      categoryMap.set(category.id, category);
    }
  });

  return Array.from(categoryMap.values());
};