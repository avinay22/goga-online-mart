-- ====================================================================
-- GOGAMUKH ONLINE MART — MASTER POSTGRESQL SCHEMA MIGRATION
-- Location: Gogamukh, Dhemaji, Assam, India
-- Tables: 28 Tables across Identity, Catalog, Orders, Fleet, Ledger & Loyalty
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean Types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('customer', 'seller_owner', 'seller_staff', 'driver', 'admin_staff', 'super_admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE shop_status AS ENUM ('pending_approval', 'open', 'busy', 'closed', 'suspended');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE shop_size AS ENUM ('small', 'standard', 'large', 'premium');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'placed', 'payment_confirmed', 'waiting_shop_approval', 'accepted', 
    'preparing', 'ready_for_pickup', 'driver_assigned', 'picked_up', 
    'on_the_way', 'delivered', 'cancelled', 'refunded'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('initiated', 'pending', 'authorized', 'captured', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE delivery_status AS ENUM ('pending_broadcast', 'broadcasting', 'assigned', 'arrived_at_shop', 'collected', 'delivered', 'failed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE subscription_tier AS ENUM ('starter', 'growth', 'premium');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 1. Base Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  role user_role DEFAULT 'customer' NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Customer Profiles
CREATE TABLE IF NOT EXISTS public.customer_profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  referral_code VARCHAR(12) UNIQUE NOT NULL,
  referred_by UUID REFERENCES public.users(id),
  gogo_points_balance INTEGER DEFAULT 0 NOT NULL,
  completed_deliveries_count INTEGER DEFAULT 0 NOT NULL,
  free_deliveries_available INTEGER DEFAULT 0 NOT NULL,
  is_champion_opt_in BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Customer Saved Addresses
CREATE TABLE IF NOT EXISTS public.user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  address_type VARCHAR(20) DEFAULT 'Home' NOT NULL,
  recipient_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  address_line1 TEXT NOT NULL,
  landmark TEXT,
  area_colony TEXT NOT NULL,
  pincode VARCHAR(6) DEFAULT '787056' NOT NULL,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  is_default BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Seller Profiles
CREATE TABLE IF NOT EXISTS public.seller_profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  gstin VARCHAR(15),
  pan_number VARCHAR(10),
  bank_account_number VARCHAR(30),
  bank_ifsc VARCHAR(11),
  bank_beneficiary_name VARCHAR(100),
  commission_exemption_until TIMESTAMPTZ,
  current_plan subscription_tier DEFAULT 'starter' NOT NULL,
  plan_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Driver Profiles (Tum-Tum Fleet)
CREATE TABLE IF NOT EXISTS public.driver_profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  vehicle_type VARCHAR(50) DEFAULT 'Tum-Tum / E-Rickshaw' NOT NULL,
  vehicle_registration_number VARCHAR(20) NOT NULL,
  driving_license_number VARCHAR(30),
  upi_id VARCHAR(50) NOT NULL,
  is_online BOOLEAN DEFAULT FALSE NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE NOT NULL,
  registration_fee_paid BOOLEAN DEFAULT FALSE NOT NULL,
  current_latitude NUMERIC(10, 7),
  current_longitude NUMERIC(10, 7),
  last_location_updated_at TIMESTAMPTZ,
  rating NUMERIC(3, 2) DEFAULT 5.00 NOT NULL,
  total_deliveries_completed INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Driver Documents
CREATE TABLE IF NOT EXISTS public.driver_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES public.driver_profiles(id) ON DELETE CASCADE NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  document_url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE NOT NULL,
  verified_by UUID REFERENCES public.users(id),
  verified_at TIMESTAMPTZ,
  notes TEXT
);

-- 7. Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  commission_percentage NUMERIC(4, 2) DEFAULT 2.00 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. Subcategories
CREATE TABLE IF NOT EXISTS public.subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  UNIQUE(category_id, slug)
);

-- 9. Shops
CREATE TABLE IF NOT EXISTS public.shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.seller_profiles(id) ON DELETE RESTRICT NOT NULL,
  shop_name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  address_line TEXT NOT NULL,
  landmark TEXT,
  area VARCHAR(100) NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  contact_phone VARCHAR(15) NOT NULL,
  status shop_status DEFAULT 'open' NOT NULL,
  shop_size shop_size DEFAULT 'standard' NOT NULL,
  opening_time TIME DEFAULT '08:00:00' NOT NULL,
  closing_time TIME DEFAULT '20:30:00' NOT NULL,
  is_closed_override BOOLEAN DEFAULT FALSE NOT NULL,
  registration_fee_paid NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Shop Categories Bridge
CREATE TABLE IF NOT EXISTS public.shop_categories (
  shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (shop_id, category_id)
);

-- 10. Products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT NOT NULL,
  subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE RESTRICT,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  description TEXT,
  mrp NUMERIC(10, 2) NOT NULL,
  selling_price NUMERIC(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  sku VARCHAR(50),
  unit VARCHAR(30) DEFAULT 'piece' NOT NULL,
  brand VARCHAR(100),
  is_featured BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(shop_id, slug)
);

-- 11. Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE NOT NULL
);

-- 12. Product Variants
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  variant_name VARCHAR(100) NOT NULL,
  mrp NUMERIC(10, 2) NOT NULL,
  selling_price NUMERIC(10, 2) NOT NULL,
  sku VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. Inventory
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity_available INTEGER DEFAULT 0 NOT NULL,
  quantity_reserved INTEGER DEFAULT 0 NOT NULL,
  low_stock_threshold INTEGER DEFAULT 5 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT non_negative_stock CHECK (quantity_available >= 0),
  CONSTRAINT non_negative_reserved CHECK (quantity_reserved >= 0)
);

-- 14. Carts
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  shop_id UUID REFERENCES public.shops(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES public.carts(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT positive_qty CHECK (quantity > 0)
);

-- 15. Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(30) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
  shop_id UUID REFERENCES public.shops(id) ON DELETE RESTRICT NOT NULL,
  delivery_address_id UUID REFERENCES public.user_addresses(id) ON DELETE RESTRICT NOT NULL,
  
  subtotal_amount NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  delivery_fee NUMERIC(10, 2) NOT NULL,
  total_payable NUMERIC(10, 2) NOT NULL,
  
  commission_percentage NUMERIC(4, 2) NOT NULL,
  platform_commission_amount NUMERIC(10, 2) NOT NULL,
  seller_payable_amount NUMERIC(10, 2) NOT NULL,
  driver_payout_amount NUMERIC(10, 2) NOT NULL,
  platform_delivery_margin NUMERIC(10, 2) NOT NULL,
  
  status order_status DEFAULT 'placed' NOT NULL,
  delivery_otp VARCHAR(4) NOT NULL,
  special_instructions TEXT,
  
  placed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  shop_accepted_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  dispatched_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  shop_response_deadline TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 16. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE RESTRICT,
  product_name VARCHAR(200) NOT NULL,
  variant_name VARCHAR(100),
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL
);

-- 17. Delivery Pricing Rules
CREATE TABLE IF NOT EXISTS public.delivery_pricing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  min_distance_km NUMERIC(5, 2) NOT NULL,
  max_distance_km NUMERIC(5, 2) NOT NULL,
  customer_fee NUMERIC(10, 2) NOT NULL,
  driver_payout NUMERIC(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 18. Delivery Requests
CREATE TABLE IF NOT EXISTS public.delivery_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  pickup_shop_id UUID REFERENCES public.shops(id) ON DELETE RESTRICT NOT NULL,
  customer_address_id UUID REFERENCES public.user_addresses(id) ON DELETE RESTRICT NOT NULL,
  status delivery_status DEFAULT 'pending_broadcast' NOT NULL,
  estimated_distance_km NUMERIC(5, 2) NOT NULL,
  driver_payout NUMERIC(10, 2) NOT NULL,
  broadcast_started_at TIMESTAMPTZ,
  broadcast_deadline TIMESTAMPTZ,
  assigned_driver_id UUID REFERENCES public.driver_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 19. Driver Assignments
CREATE TABLE IF NOT EXISTS public.driver_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_request_id UUID REFERENCES public.delivery_requests(id) ON DELETE CASCADE NOT NULL,
  driver_id UUID REFERENCES public.driver_profiles(id) ON DELETE RESTRICT NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  accepted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  arrived_at_shop_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  verified_otp VARCHAR(4),
  status VARCHAR(30) DEFAULT 'assigned' NOT NULL
);

-- 20. Financial Ledger (Double-Entry Immutable)
CREATE TABLE IF NOT EXISTS public.financial_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  account_type VARCHAR(50) NOT NULL,
  party_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  debit NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  credit NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 21. Daily Settlements
CREATE TABLE IF NOT EXISTS public.settlement_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
  recipient_role user_role NOT NULL,
  settlement_date DATE NOT NULL,
  total_gross_amount NUMERIC(10, 2) NOT NULL,
  deductions_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  net_payable_amount NUMERIC(10, 2) NOT NULL,
  utr_reference VARCHAR(100),
  payment_method VARCHAR(50) DEFAULT 'UPI' NOT NULL,
  status VARCHAR(30) DEFAULT 'pending' NOT NULL,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 22. Gogo Rewards & Loyalty Ledger
CREATE TABLE IF NOT EXISTS public.reward_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  points_change INTEGER NOT NULL,
  reason VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 23. Daily Tiffin Subscription Plans
CREATE TABLE IF NOT EXISTS public.tiffin_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
  plan_name VARCHAR(100) NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  meal_type VARCHAR(30) NOT NULL,
  delivery_window VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 24. Tiffin Subscriptions
CREATE TABLE IF NOT EXISTS public.tiffin_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
  plan_id UUID REFERENCES public.tiffin_plans(id) ON DELETE RESTRICT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  delivery_address_id UUID REFERENCES public.user_addresses(id) ON DELETE RESTRICT NOT NULL,
  status VARCHAR(30) DEFAULT 'active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 25. Return-a-Bag Program
CREATE TABLE IF NOT EXISTS public.bag_returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
  bags_returned_count INTEGER DEFAULT 1 NOT NULL,
  reward_amount NUMERIC(5, 2) DEFAULT 3.00 NOT NULL,
  verified_by_driver_id UUID REFERENCES public.driver_profiles(id),
  verified_by_seller_id UUID REFERENCES public.seller_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 26. Shopping Champions Leaderboard Cache
CREATE TABLE IF NOT EXISTS public.shopping_champions_leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_type VARCHAR(20) NOT NULL,
  period_key VARCHAR(20) NOT NULL,
  rank_position INTEGER NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  qualifying_orders_count INTEGER NOT NULL,
  total_spend NUMERIC(10, 2) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(period_type, period_key, rank_position)
);

-- 27. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  actor_role user_role NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  old_state JSONB,
  new_state JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 28. App Settings & Configurable Rules
CREATE TABLE IF NOT EXISTS public.app_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
