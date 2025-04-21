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
    total_amount: number; // Tổng tiền cuối cùng sau khi áp dụng voucher và phí ship
    status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
    created_at: string;
    updated_at?: string;
    payment_method: string;
    shipping_address: Address;
    shipping_method?: ShippingMethod; // Thêm dòng này
    shipping_fee: number; // Thêm: Phí ship *trước* khi áp dụng voucher
    voucher?: Voucher | null; // Thêm dòng này, có thể là null nếu không dùng voucher
    subtotal: number; // Thêm: Tổng tiền hàng *trước* khi áp dụng voucher
    total_discount: number; // Thêm: Tổng tiền giảm giá (bao gồm giảm giá sản phẩm và voucher)
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
    discount_value: number; // Giá trị giảm
    min_items?: number; // Số lượng sản phẩm tối thiểu
    min_order_value?: number; // Giá trị đơn hàng tối thiểu (chỉ tính tiền sản phẩm)
    applicable_shipping_method?: ShippingMethod; // Áp dụng cho phương thức vận chuyển nào (nếu là discount_type 'shipping')
    requires_freeship_extra?: boolean; // Yêu cầu có sản phẩm freeship_extra
    requires_ship_now?: boolean; // Yêu cầu có sản phẩm ship_now
  }

export type ShippingMethod = 'NOW' | 'Standard';

export interface ApiResponse {
    books: Book[];
    categories?: Category[];
    users?: User[];
    orders?: Order[];
}