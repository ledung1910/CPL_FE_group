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
    user_id: number;
    items: OrderItem[];
    total_amount: number;
    status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
    created_at: string;
    updated_at?: string;
    payment_method: string;
    shipping_address: Address;
    shipping_method?: ShippingMethod;
    shipping_fee: number;
    voucher?: Voucher | null;
    subtotal: number;
    total_discount: number;
  }

export interface OrderItem {
    book_id: string;
    quantity: number;
    price: number;
}

export interface Voucher {
    id: string;
    name: string;
    discount_type: 'shipping' | 'total_order' | 'total_order_shipping';
    discount_value: number;
    min_items?: number;
    min_order_value?: number;
    applicable_shipping_method?: ShippingMethod;
    requires_freeship_extra?: boolean;
    requires_ship_now?: boolean;
  }

export type ShippingMethod = 'NOW' | 'Standard';

export interface ApiResponse {
    books: Book[];
    categories?: Category[];
    users?: User[];
    orders?: Order[];
}