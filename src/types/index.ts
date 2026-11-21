// Core domain types for Gogamukh Online Mart

export type UserRole = 'customer' | 'seller_owner' | 'seller_staff' | 'driver' | 'admin_staff' | 'super_admin';
export type ShopStatus = 'pending_approval' | 'open' | 'busy' | 'closed' | 'suspended';
export type ShopSize = 'small' | 'standard' | 'large' | 'premium';
export type OrderStatus =
  | 'placed'
  | 'payment_confirmed'
  | 'waiting_shop_approval'
  | 'accepted'
  | 'preparing'
  | 'ready_for_pickup'
  | 'driver_assigned'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'initiated' | 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
export type DeliveryStatus =
  | 'pending_broadcast'
  | 'broadcasting'
  | 'assigned'
  | 'arrived_at_shop'
  | 'collected'
  | 'delivered'
  | 'failed'
  | 'cancelled';

export type SubscriptionTier = 'starter' | 'growth' | 'premium';

export interface User {
  id: string;
  phone_number: string;
  email?: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface CustomerProfile {
  id: string;
  referral_code: string;
  referred_by?: string;
  gogo_points_balance: number;
  completed_deliveries_count: number;
  free_deliveries_available: number;
  is_champion_opt_in: boolean;
}

export interface UserAddress {
  id: string;
  user_id: string;
  address_type: string;
  recipient_name: string;
  phone_number: string;
  address_line1: string;
  landmark?: string;
  area_colony: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  is_default: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  commission_percentage: number;
  is_active: boolean;
}

export interface Shop {
  id: string;
  owner_id: string;
  shop_name: string;
  slug: string;
  description: string;
  logo_url: string;
  cover_url: string;
  address_line: string;
  landmark: string;
  area: string;
  latitude: number;
  longitude: number;
  contact_phone: string;
  status: ShopStatus;
  shop_size: ShopSize;
  opening_time: string;
  closing_time: string;
  is_closed_override: boolean;
  rating: number;
  category_names: string[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  mrp: number;
  selling_price: number;
  sku?: string;
}

export interface Product {
  id: string;
  shop_id: string;
  shop_name?: string;
  category_id: string;
  category_slug?: string;
  name: string;
  slug: string;
  description: string;
  mrp: number;
  selling_price: number;
  is_active: boolean;
  unit: string;
  brand?: string;
  is_featured: boolean;
  images: string[];
  stock_quantity: number;
  variants?: ProductVariant[];
}

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  variant_name?: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer_name?: string;
  customer_phone?: string;
  shop_id: string;
  shop_name?: string;
  shop_address?: string;
  delivery_address: UserAddress;
  items: OrderItem[];
  subtotal_amount: number;
  discount_amount: number;
  delivery_fee: number;
  total_payable: number;
  commission_percentage: number;
  platform_commission_amount: number;
  seller_payable_amount: number;
  driver_payout_amount: number;
  platform_delivery_margin: number;
  status: OrderStatus;
  delivery_otp: string;
  special_instructions?: string;
  driver_name?: string;
  driver_phone?: string;
  driver_vehicle?: string;
  placed_at: string;
  shop_accepted_at?: string;
  ready_at?: string;
  dispatched_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  shop_response_deadline?: string;
}

export interface DeliveryPricingRule {
  id: string;
  min_distance_km: number;
  max_distance_km: number;
  customer_fee: number;
  driver_payout: number;
  platform_margin: number;
  is_active: boolean;
}

export interface TiffinPlan {
  id: string;
  shop_id: string;
  shop_name: string;
  plan_name: string;
  description: string;
  duration_days: number;
  price: number;
  meal_type: 'Lunch' | 'Dinner' | 'Both';
  delivery_window: string;
  image_url: string;
  is_active: boolean;
}

export interface ShoppingChampion {
  rank_position: number;
  user_name: string;
  area: string;
  qualifying_orders_count: number;
  total_spend: number;
}
