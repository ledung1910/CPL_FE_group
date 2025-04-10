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

export const getRealCategories = async (): Promise<Category[]> => {
  return await apiClient.get("/categories") as Category[];
};

export const createCategory = async (
  categoryData: Category
): Promise<Category> => {
  return await apiClient.post("/categories", categoryData) as Category;
};

export const updateCategory = async (
  id: number,
  data: Partial<Category>
): Promise<Category> => {
  const updatedCategory = await apiClient.patch(`/categories/${id}`, data) as Category;
  const books = await getBooks();
  const booksToUpdate = books.filter(book => book.categories.id === id);
  await Promise.all(
    booksToUpdate.map(book =>
      updateBook(book.id, {
        categories: {
          ...book.categories,
          ...data,
        }
      })
    )
  );
  return updatedCategory;
};


export const deleteCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};
