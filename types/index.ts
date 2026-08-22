export type Role = 'STUDENT' | 'SELLER';
export type OrderStatus = 'PENDING' | 'COOKING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  nisn?: string;
  balance: number;
  avatar?: string;
}

export interface Stall {
  id: string;
  name: string;
  description?: string;
  sellerId: string;
  image?: string;
  rating: number;
  openTime: string;
  category?: string;
}

export interface MenuItem {
  id: string;
  stallId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: 'makanan' | 'minuman' | 'snack';
  isAvailable: boolean;
  isBestSeller?: boolean;
  image?: string;
}

export interface OrderItem {
  id?: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  userId: string;
  userName?: string;
  userNisn?: string;
  stallId: string;
  stallName?: string;
  totalPrice: number;
  discount?: number;
  isPreOrder: boolean;
  pickupTime?: string;
  paymentMethod: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string | Date;
  items: OrderItem[];
}

export interface CartItem {
  id: string;
  stallId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface PreOrderSlot {
  id: string;
  name: string;
  time: string;
  badge: string;
  desc: string;
}
