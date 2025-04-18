import { Order, OrderItem, Address } from "../../interfaces";
import { post, get, patch } from "./request";

const ORDER_BASE_URL = "/orders";

const orderService = {
    createOrder: async (order: Omit<Order, "id" | "created_at">): Promise<Order> => {
        const payload = { ...order, created_at: new Date().toISOString() };
        return await post<Order>(ORDER_BASE_URL, payload);
    },

    createInstantOrder: async (userId: number, bookId: string, quantity: number, price: number, paymentMethod: string = "COD", shippingAddress: Address): Promise<Order> => {
        const orderItem: OrderItem = { book_id: bookId, quantity, price };
        const payload: Omit<Order, "id" | "created_at"> = { user_id: userId, items: [orderItem], total_amount: quantity * price, status: 'pending', payment_method: paymentMethod, shipping_address: shippingAddress };
        return orderService.createOrder(payload);
    },

    getOrdersByUser: async (userId: number): Promise<Order[]> => {
        return await get<Order[]>(`${ORDER_BASE_URL}?user_id=${userId}`);
    },
    getOrders: async (): Promise<Order[]> => {
        return await get<Order[]>(ORDER_BASE_URL);
    },

    getOrderById: async (id: string): Promise<Order> => {
        return await get<Order>(`${ORDER_BASE_URL}/${id}`);
    },
    updateOrderStatus: async (id: string, status: Order['status'], updated_at: string): Promise<{ status: Order['status'], updated_at: string }> => {
        return await patch<{ status: Order['status'], updated_at: string }>(`/orders/${id}`, { status, updated_at });
    }
};

export default orderService;