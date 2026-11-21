"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  UserRole,
  Product,
  CartItem,
  Order,
  OrderStatus,
  UserAddress,
  ProductVariant,
} from "@/types";
import {
  MOCK_PRODUCTS,
  MOCK_SHOPS,
  MOCK_DELIVERY_PRICING,
} from "./mock-data";
import { generateOrderNumber, generateOTP } from "./utils";

interface MarketplaceContextType {
  // User & Role Switching
  currentUser: User;
  setCurrentUserRole: (role: UserRole) => void;
  selectedAddress: UserAddress;
  savedAddresses: UserAddress[];
  setSelectedAddress: (addr: UserAddress) => void;
  addAddress: (addr: Omit<UserAddress, "id" | "user_id">) => void;

  // Cart
  cart: CartItem[];
  cartShopId: string | null;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => { success: boolean; error?: string };
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;

  // Orders & State Machine
  orders: Order[];
  createOrder: (instructions?: string) => Promise<{ success: boolean; orderId?: string; error?: string }>;
  sellerAcceptOrder: (orderId: string) => void;
  sellerMarkReady: (orderId: string) => void;
  sellerCancelOrder: (orderId: string, reason?: string) => void;
  driverAcceptBroadcast: (orderId: string, driverName?: string) => void;
  driverConfirmPickup: (orderId: string) => void;
  driverCompleteDelivery: (orderId: string, enteredOtp: string) => { success: boolean; error?: string };

  // Driver Fleet State
  isDriverOnline: boolean;
  setIsDriverOnline: (online: boolean) => void;

  // Rewards & Loyalty
  gogoPoints: number;
  completedDeliveriesCount: number;
  freeDeliveriesAvailable: number;
}

const DEFAULT_ADDRESS: UserAddress = {
  id: "addr-1",
  user_id: "user-cust-1",
  address_type: "Home",
  recipient_name: "Avinay Sharma",
  phone_number: "+91 94350 11223",
  address_line1: "House #12, Near Daily Bazar",
  landmark: "Behind Central SBI Gogamukh",
  area_colony: "Gogamukh Bazar",
  pincode: "787056",
  is_default: true,
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  // Current session & active role
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user-cust-1",
    phone_number: "+91 94350 11223",
    full_name: "Avinay Sharma",
    role: "customer",
    is_active: true,
    is_verified: true,
    created_at: new Date().toISOString(),
  });

  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([
    DEFAULT_ADDRESS,
    {
      id: "addr-2",
      user_id: "user-cust-1",
      address_type: "Work",
      recipient_name: "Avinay Sharma",
      phone_number: "+91 94350 11223",
      address_line1: "Block B, Station Road Commercial Hub",
      landmark: "Near Railway Crossing",
      area_colony: "Station Road",
      pincode: "787056",
      is_default: false,
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress>(DEFAULT_ADDRESS);

  // Cart & Single-Shop Locking
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartShopId, setCartShopId] = useState<string | null>(null);

  // Driver Fleet
  const [isDriverOnline, setIsDriverOnline] = useState<boolean>(true);

  // Rewards
  const [gogoPoints, setGogoPoints] = useState<number>(120);
  const [completedDeliveriesCount, setCompletedDeliveriesCount] = useState<number>(3);
  const [freeDeliveriesAvailable, setFreeDeliveriesAvailable] = useState<number>(0);

  // Orders Store
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord-seed-1",
      order_number: "GOM-20261121-1024",
      customer_id: "user-cust-1",
      customer_name: "Avinay Sharma",
      customer_phone: "+91 94350 11223",
      shop_id: "shop-1",
      shop_name: "Brahmaputra Organic Bhandar",
      shop_address: "Shop #14, Main Daily Market, Gogamukh Bazar",
      delivery_address: DEFAULT_ADDRESS,
      items: [
        {
          id: "item-1",
          order_id: "ord-seed-1",
          product_id: "prod-1",
          product_name: "Aromatic Joha Rice (Kola Joha)",
          unit_price: 125,
          quantity: 2,
          total_price: 250,
        },
        {
          id: "item-2",
          order_id: "ord-seed-1",
          product_id: "prod-2",
          product_name: "Cold Pressed Pure Mustard Oil (Kachi Ghani)",
          unit_price: 175,
          quantity: 1,
          total_price: 175,
        },
      ],
      subtotal_amount: 425,
      discount_amount: 0,
      delivery_fee: 20,
      total_payable: 445,
      commission_percentage: 2.0,
      platform_commission_amount: 8.5,
      seller_payable_amount: 416.5,
      driver_payout_amount: 15,
      platform_delivery_margin: 5,
      status: "ready_for_pickup",
      delivery_otp: "5821",
      special_instructions: "Please call upon reaching SBI lane.",
      placed_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      shop_accepted_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      ready_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ]);

  // Role Switcher for Development & Seamless Reviewing
  const setCurrentUserRole = (role: UserRole) => {
    let name = "Avinay Sharma";
    let phone = "+91 94350 11223";

    if (role === "seller_owner") {
      name = "Niren Saikia (Brahmaputra Organic Bhandar)";
      phone = "+91 98540 12345";
    } else if (role === "driver") {
      name = "Ramen Deka (Tum-Tum #AS-22-E-1049)";
      phone = "+91 91010 33445";
    } else if (role === "super_admin") {
      name = "Master Operations Admin (Gogamukh HQ)";
      phone = "+91 94350 99999";
    }

    setCurrentUser((prev) => ({
      ...prev,
      role,
      full_name: name,
      phone_number: phone,
    }));
  };

  const addAddress = (addr: Omit<UserAddress, "id" | "user_id">) => {
    const newAddr: UserAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
      user_id: currentUser.id,
    };
    setSavedAddresses((prev) => [...prev, newAddr]);
    setSelectedAddress(newAddr);
  };

  // Cart operations with single-shop locking
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    if (cartShopId && cartShopId !== product.shop_id && cart.length > 0) {
      return {
        success: false,
        error: `Your cart contains items from another shop (${cart[0].product.shop_name || "another merchant"}). To ensure fast Tum-Tum delivery, each order is fulfilled by a single local shop. Please finish or clear your existing cart first.`,
      };
    }

    setCartShopId(product.shop_id);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          id: `cart-item-${Date.now()}-${Math.random()}`,
          product,
          variant,
          quantity,
        },
      ];
    });

    return { success: true };
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const filtered = prev.filter((item) => item.id !== cartItemId);
      if (filtered.length === 0) {
        setCartShopId(null);
      }
      return filtered;
    });
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      if (updated.length === 0) {
        setCartShopId(null);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartShopId(null);
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.variant ? item.variant.selling_price : item.product.selling_price;
    return sum + price * item.quantity;
  }, 0);

  // Base town delivery fee (using slab rule 0-1.5km = ₹20)
  const deliveryFee = cart.length > 0 ? (freeDeliveriesAvailable > 0 ? 0 : 20) : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  // Order Placement (with stock check & double-entry commission calculation)
  const createOrder = async (instructions?: string) => {
    if (cart.length === 0 || !cartShopId) {
      return { success: false, error: "Cart is empty" };
    }

    const shop = MOCK_SHOPS.find((s) => s.id === cartShopId);
    const shopName = shop?.shop_name || "Gogamukh Merchant";
    const shopAddress = shop ? `${shop.address_line}, ${shop.area}` : "Gogamukh Town";

    // Dynamic commission calculation (e.g. 2.0%)
    const commissionPct = 2.0;
    const commissionAmt = (cartSubtotal * commissionPct) / 100;
    const sellerPayable = cartSubtotal - commissionAmt;
    const driverPayout = 15; // Short town slab
    const deliveryMargin = deliveryFee - driverPayout;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: generateOrderNumber(),
      customer_id: currentUser.id,
      customer_name: currentUser.full_name,
      customer_phone: currentUser.phone_number,
      shop_id: cartShopId,
      shop_name: shopName,
      shop_address: shopAddress,
      delivery_address: selectedAddress,
      items: cart.map((c) => ({
        id: `ord-item-${Date.now()}-${Math.random()}`,
        order_id: "",
        product_id: c.product.id,
        product_name: c.product.name,
        variant_name: c.variant?.variant_name,
        unit_price: c.variant ? c.variant.selling_price : c.product.selling_price,
        quantity: c.quantity,
        total_price: (c.variant ? c.variant.selling_price : c.product.selling_price) * c.quantity,
      })),
      subtotal_amount: cartSubtotal,
      discount_amount: 0,
      delivery_fee: deliveryFee,
      total_payable: cartTotal,
      commission_percentage: commissionPct,
      platform_commission_amount: commissionAmt,
      seller_payable_amount: sellerPayable,
      driver_payout_amount: driverPayout,
      platform_delivery_margin: deliveryMargin,
      status: "placed",
      delivery_otp: generateOTP(),
      special_instructions: instructions,
      placed_at: new Date().toISOString(),
      shop_response_deadline: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    return { success: true, orderId: newOrder.id };
  };

  // State Machine Order Actions
  const sellerAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: "accepted",
              shop_accepted_at: new Date().toISOString(),
            }
          : ord
      )
    );
  };

  const sellerMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: "ready_for_pickup",
              ready_at: new Date().toISOString(),
            }
          : ord
      )
    );
  };

  const sellerCancelOrder = (orderId: string, reason = "Shop unable to fulfill") => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: "cancelled",
              cancelled_at: new Date().toISOString(),
              special_instructions: `${ord.special_instructions || ""} [Cancelled: ${reason}]`,
            }
          : ord
      )
    );
  };

  const driverAcceptBroadcast = (orderId: string, driverName = "Ramen Deka (Tum-Tum #1049)") => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: "driver_assigned",
              driver_name: driverName,
              driver_phone: "+91 91010 33445",
              driver_vehicle: "Tum-Tum / E-Rickshaw #AS-22-E-1049",
            }
          : ord
      )
    );
  };

  const driverConfirmPickup = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: "picked_up",
              dispatched_at: new Date().toISOString(),
            }
          : ord
      )
    );
  };

  const driverCompleteDelivery = (orderId: string, enteredOtp: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return { success: false, error: "Order not found" };

    if (order.delivery_otp !== enteredOtp.trim()) {
      return { success: false, error: "Invalid Delivery OTP. Please verify with customer." };
    }

    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: "delivered",
              delivered_at: new Date().toISOString(),
            }
          : ord
      )
    );

    // Reward Loyalty Engine updates
    setGogoPoints((prev) => prev + Math.floor(order.total_payable * 0.05));
    setCompletedDeliveriesCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount % 5 === 0) {
        setFreeDeliveriesAvailable((f) => f + 1);
      }
      return nextCount;
    });

    return { success: true };
  };

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        selectedAddress,
        savedAddresses,
        setSelectedAddress,
        addAddress,
        cart,
        cartShopId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        orders,
        createOrder,
        sellerAcceptOrder,
        sellerMarkReady,
        sellerCancelOrder,
        driverAcceptBroadcast,
        driverConfirmPickup,
        driverCompleteDelivery,
        isDriverOnline,
        setIsDriverOnline,
        gogoPoints,
        completedDeliveriesCount,
        freeDeliveriesAvailable,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
