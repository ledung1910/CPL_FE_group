export interface Book {
    id: string;
    name: string;
    authors: Author[];
    categories: Category;
    current_seller: Seller;
    description: string;
    images: BookImage[];
    list_price: number;
    original_price: number;
    quantity_sold: QuantitySold;
    rating_average: number;
    short_description: string;
    specifications: Specification[];
    book_cover?: string | null;
}

export interface Author {
    id: number;
    name: string;
    slug: string;
}

export interface Category {
    id: number;
    name: string;
    is_leaf: boolean;
}

export interface Seller {
    id: number;
    sku: string;
    name: string;
    link: string;
    logo: string;
    price: number;
    product_id: string;
    store_id: number;
    is_best_store: boolean;
    is_offline_installment_supported: boolean | null;
}

export interface BookImage {
    base_url: string;
    is_gallery: boolean;
    label: string | null;
    large_url: string;
    medium_url: string;
    small_url: string;
    thumbnail_url: string;
    position: number | null;
}

export interface QuantitySold {
    text: string;
    value: number;
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