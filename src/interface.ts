export interface Book {
    id: string;
    name: string;
    authors: Author[] ;
    categories: Category;
    current_seller: Seller ;
    description: string ;
    images: BookImage[];
    list_price: number;
    original_price: number;
    specifications: Specification[] ;
    book_cover?: string ;
}

export interface Author {
    id: string;
    name: string;
  }

  export interface Category {
    id: string;
    name: string;
  }

export interface Seller {
    price: number;
    is_best_store: boolean;
}

export interface BookImage {
    id: string;
    large_url: string;
}

export interface Specification {
    name: string;
    attributes: Attribute[];
}

export interface Attribute {
    code: string;
    name: string;
    value: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: Address;
    orders?: Order[];
}

export interface Address {
    street: string;
    city: string;
    state: string;
    is_default: boolean;
}

export interface Order {
    id: string;
    user_id: string;
    items: OrderItem[];
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
    updated_at: string;
    payment_method: string;
    shipping_address: Address;
}

export interface OrderItem {
    book_id: string;
    quantity: number;
    price: number;
}

export interface ApiResponse {
    books: Book[];
    categories?: Category[];
    users?: User[];
    orders?: Order[];
}