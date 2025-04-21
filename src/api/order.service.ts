import { Order, OrderItem, Address } from "../../interfaces";
import { post, get, patch } from "./request";
import { addDays } from 'date-fns';

export const createOrder = async (order: Omit<Order, "id" | "created_at">): Promise<Order> => {
    const payload = { ...order, created_at: new Date().toISOString() };
    return await post<Order>("/orders", payload);
};

export const createInstantOrder = async (userId: number, bookId: string, quantity: number, price: number, paymentMethod: string = "COD", shippingAddress: Address): Promise<Order> => {
    const orderItem: OrderItem = { book_id: bookId, quantity, price };
    const payload: Omit<Order, "id" | "created_at"> = { user_id: userId, items: [orderItem], total_amount: quantity * price, status: 'pending', payment_method: paymentMethod, shipping_address: shippingAddress };
    return createOrder(payload);
};

export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
    return await get<Order[]>(`/orders?user_id=${userId}`);
};

export const getOrders = async (): Promise<Order[]> => {
    return await get<Order[]>("/orders");
};

export const getOrderById = async (id: string): Promise<Order> => {
    return await get<Order>(`/orders/${id}`);
};

export const updateOrderStatus = async (id: string, status: Order['status'], updated_at: string): Promise<{ status: Order['status'], updated_at: string }> => {
    return await patch<{ status: Order['status'], updated_at: string }>(`/orders/${id}`, { status, updated_at });
};

export function getEstimatedDeliveryDate(order: Order): Date | null {
    const createdDate = new Date(order.created_at)
    const updatedDate = order.updated_at ? new Date(order.updated_at) : null
  
    switch (order.status) {
      case 'pending':
      case 'processing':
        return addDays(createdDate, 3)
      case 'shipping':
        return updatedDate ? addDays(updatedDate, 1) : null
      case 'delivered':
      case 'cancelled':
        return updatedDate
      default:
        return null
    }
  }
  
