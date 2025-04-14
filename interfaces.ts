export interface Book {
    id: string;
    name: string;
    authors: Author[];
    categories: Category;
    current_seller: Seller;
    description: string;
    images: BookImage[];
    original_price: number;
    specifications: Specification[];
    is_ship_now: boolean;
    is_freeship_extra: boolean;
    is_top_deal: boolean;
    rating_average: number;
    quantity_sold: QuantitySold;
}

export interface Author {
    id: string;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}
export interface QuantitySold{
    text: string;
    value: number;
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
    name: string;
    value: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: Address;
    orders?: Order[];
    role: "User" | "Admin";
}

export interface Address {
    street: string;
    city: string;
    district: string;
}

export interface Order {
    id: string;
    user_id: string;
    items: OrderItem[];
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
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