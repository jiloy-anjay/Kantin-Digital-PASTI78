'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Order, OrderStatus, User } from '@/types';
import { INITIAL_MENUS, INITIAL_ORDERS, INITIAL_USERS, PREORDER_SLOTS } from '@/lib/mock-data';
import { voiceService } from '@/lib/speech';

interface CartContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (menu: MenuItem) => void;
  removeFromCart: (menuId: string) => void;
  updateQuantity: (menuId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => boolean;
  isPreOrder: boolean;
  setIsPreOrder: (val: boolean) => void;
  selectedSlot: string;
  setSelectedSlot: (slotId: string) => void;
  customTime: string;
  setCustomTime: (time: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  orders: Order[];
  createOrder: (stallId: string, stallName: string) => Order | null;
  updateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  menus: MenuItem[];
  toggleMenuAvailability: (menuId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeOrder: Order | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>(INITIAL_MENUS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isPreOrder, setIsPreOrder] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('slot-1');
  const [customTime, setCustomTime] = useState<string>('10:00');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('emoney');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('pasti78_current_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Default to student Ahmad
        setCurrentUser(INITIAL_USERS[0]);
      }

      const savedCart = localStorage.getItem('pasti78_cart_next');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('pasti78_orders_next');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedMenus = localStorage.getItem('pasti78_menus_next');
      if (savedMenus) {
        try {
          const parsedMenus: MenuItem[] = JSON.parse(savedMenus);
          // Merge INITIAL_MENUS with parsedMenus to keep availability toggle while including all new menus
          const mergedMenus = INITIAL_MENUS.map((item) => {
            const existing = parsedMenus.find((m) => m.id === item.id);
            return existing ? { ...item, isAvailable: existing.isAvailable } : item;
          });
          setMenus(mergedMenus);
          localStorage.setItem('pasti78_menus_next', JSON.stringify(mergedMenus));
        } catch {
          setMenus(INITIAL_MENUS);
        }
      } else {
        setMenus(INITIAL_MENUS);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const handleSetCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('pasti78_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pasti78_current_user');
    }
  };

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('pasti78_cart_next', JSON.stringify(newCart));
  };

  const addToCart = (menu: MenuItem) => {
    if (!menu.isAvailable) return;

    voiceService.playPop();
    const existing = cart.find((i) => i.id === menu.id);
    let updated: CartItem[];

    if (existing) {
      updated = cart.map((i) => (i.id === menu.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      updated = [
        ...cart,
        {
          id: menu.id,
          stallId: menu.stallId,
          name: menu.name,
          price: menu.price,
          image: menu.image,
          quantity: 1,
        },
      ];
    }
    saveCartToStorage(updated);
  };

  const removeFromCart = (menuId: string) => {
    const updated = cart.filter((i) => i.id !== menuId);
    saveCartToStorage(updated);
  };

  const updateQuantity = (menuId: string, delta: number) => {
    voiceService.playPop();
    const existing = cart.find((i) => i.id === menuId);
    if (!existing) return;

    const nextQty = existing.quantity + delta;
    if (nextQty <= 0) {
      removeFromCart(menuId);
    } else {
      const updated = cart.map((i) => (i.id === menuId ? { ...i, quantity: nextQty } : i));
      saveCartToStorage(updated);
    }
  };

  const clearCart = () => {
    saveCartToStorage([]);
    setAppliedPromo(null);
    setDiscount(0);
    setOrderNotes('');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = Math.max(0, subtotal - discount);

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'PASTI78') {
      if (subtotal >= 15000) {
        setAppliedPromo('PASTI78');
        setDiscount(5000);
        voiceService.playChime();
        return true;
      }
    } else if (cleanCode === 'ISTIRAHAT') {
      if (subtotal >= 10000) {
        setAppliedPromo('ISTIRAHAT');
        setDiscount(Math.round(subtotal * 0.1));
        voiceService.playChime();
        return true;
      }
    }
    return false;
  };

  const createOrder = (stallId: string, stallName: string): Order | null => {
    if (!currentUser || cart.length === 0) return null;

    // Generate random code ORD-XXXX
    const code = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    let pickupText = 'Pesan Langsung (Sekarang)';
    if (isPreOrder) {
      if (selectedSlot === 'slot-custom') {
        pickupText = `Waktu Khusus (${customTime} WIB)`;
      } else {
        const slot = PREORDER_SLOTS.find((s) => s.id === selectedSlot);
        pickupText = slot ? `${slot.name} (${slot.time})` : 'Jam Istirahat';
      }
    }

    let payMethodName = 'QRIS Kantin Digital';
    if (paymentMethod === 'emoney') {
      payMethodName = 'Kartu Pelajar Digital (E-Money)';
      // Deduct student balance
      if (currentUser.balance >= totalPrice) {
        const updatedUser = { ...currentUser, balance: currentUser.balance - totalPrice };
        handleSetCurrentUser(updatedUser);
      }
    } else if (paymentMethod === 'ewallet') {
      payMethodName = 'Dompet Digital (E-Wallet)';
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderCode: code,
      userId: currentUser.id,
      userName: currentUser.name,
      userNisn: currentUser.nisn,
      stallId,
      stallName,
      totalPrice,
      discount,
      isPreOrder,
      pickupTime: pickupText,
      paymentMethod: payMethodName,
      notes: orderNotes,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      items: cart.map((i) => ({
        menuItemId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
    };

    const nextOrders = [newOrder, ...orders];
    setOrders(nextOrders);
    localStorage.setItem('pasti78_orders_next', JSON.stringify(nextOrders));

    // Clear Cart
    clearCart();

    // Voice announcement trigger
    voiceService.notifyOrderPlaced(newOrder.orderCode);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    const updatedOrders = orders.map((o) => {
      if (o.id === orderId || o.orderCode === orderId) {
        return { ...o, status: nextStatus };
      }
      return o;
    });

    setOrders(updatedOrders);
    localStorage.setItem('pasti78_orders_next', JSON.stringify(updatedOrders));

    const targetOrder = updatedOrders.find((o) => o.id === orderId || o.orderCode === orderId);
    if (targetOrder) {
      if (nextStatus === 'READY') {
        voiceService.notifyOrderReady(targetOrder.orderCode, targetOrder.stallName || 'Stan Kantin');
      } else if (nextStatus === 'COOKING') {
        voiceService.speak(`Pesanan ${targetOrder.orderCode.replace('-', ' ')} sedang dimasak oleh penjual.`);
      }
    }
  };

  const toggleMenuAvailability = (menuId: string) => {
    const updated = menus.map((m) => {
      if (m.id === menuId) {
        return { ...m, isAvailable: !m.isAvailable };
      }
      return m;
    });
    setMenus(updated);
    localStorage.setItem('pasti78_menus_next', JSON.stringify(updated));
    voiceService.playPop();
  };

  // Find most recent active order for current student
  const activeOrder =
    currentUser && currentUser.role === 'STUDENT'
      ? orders.find(
        (o) =>
          (o.userId === currentUser.id || o.userName === currentUser.name) &&
          o.status !== 'COMPLETED' &&
          o.status !== 'CANCELLED'
      ) || null
      : null;

  return (
    <CartContext.Provider
      value={{
        currentUser,
        setCurrentUser: handleSetCurrentUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        totalPrice,
        appliedPromo,
        applyPromoCode,
        isPreOrder,
        setIsPreOrder,
        selectedSlot,
        setSelectedSlot,
        customTime,
        setCustomTime,
        orderNotes,
        setOrderNotes,
        paymentMethod,
        setPaymentMethod,
        orders,
        createOrder,
        updateOrderStatus,
        menus,
        toggleMenuAvailability,
        isCartOpen,
        setIsCartOpen,
        activeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
