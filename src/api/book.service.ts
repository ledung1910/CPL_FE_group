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
  const categoryMap = new Map<number, Category>();

  books.forEach((book) => {
    const category = book.categories;
    if (category && !categoryMap.has(category.id)) {
      categoryMap.set(category.id, category);
    }
  });

  return Array.from(categoryMap.values());
};

// Lấy tất cả categories (nếu bạn có API riêng cho categories)
export const getRealCategories = async (): Promise<Category[]> => {
  return await apiClient.get("/categories") as Category[];
};

// Thêm category
export const createCategory = async (
  categoryData: Category // Cho phép truyền cả id và name
): Promise<Category> => {
  return await apiClient.post("/categories", categoryData) as Category;
};

// Sửa category
// export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
//   return await apiClient.patch(`/categories/${id}`, data) as Category;
// };


export const updateCategory = async (
  id: number,
  data: Partial<Category>
): Promise<Category> => {
  // 1. Cập nhật category
  const updatedCategory = await apiClient.patch(`/categories/${id}`, data) as Category;

  // 2. Lấy toàn bộ sách
  const books = await getBooks();

  // 3. Lọc ra những sách đang dùng category này
  const booksToUpdate = books.filter(book => book.categories.id === id);

  // 4. Cập nhật lại category.name trong từng quyển sách
  await Promise.all(
    booksToUpdate.map(book =>
      updateBook(book.id, {
        categories: {
          ...book.categories,
          ...data, // gộp name mới
        }
      })
    )
  );

  return updatedCategory;
};


// Xoá category
export const deleteCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};
