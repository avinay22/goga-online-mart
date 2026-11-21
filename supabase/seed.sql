-- ====================================================================
-- GOGAMUKH ONLINE MART — SEED DATA
-- Authentic Gogamukh Merchants, Categories, Tum-Tum Delivery Slabs
-- ====================================================================

-- 1. Insert 10 Main Categories
INSERT INTO public.categories (name, slug, description, image_url, display_order, commission_percentage) VALUES
('Grocery & Daily Needs', 'grocery-daily-needs', 'Farm fresh vegetables, Joha rice, mustard oil & daily kitchen essentials', '/categories/grocery.jpg', 1, 2.00),
('Food & Restaurants', 'food-restaurants', 'Authentic Assamese thalis, pitha, local sweets & daily tiffin', '/categories/food.jpg', 2, 3.00),
('Pharmacy & Healthcare', 'pharmacy-healthcare', 'Prescription medicines, baby care & wellness essentials from verified pharmacies', '/categories/pharmacy.jpg', 3, 1.50),
('Fashion & Accessories', 'fashion-accessories', 'Traditional Muga & Eri silk, Gamusa, everyday clothing & footwear', '/categories/fashion.jpg', 4, 3.00),
('Beauty & Personal Care', 'beauty-personal-care', 'Herbal cosmetics, skincare, haircare & hygiene essentials', '/categories/beauty.jpg', 5, 2.50),
('Gifts & Toys', 'gifts-toys', 'Local bamboo handicrafts, celebration items, toys & greeting cards', '/categories/gifts.jpg', 6, 2.50),
('Electronics & Mobile', 'electronics-mobile', 'Smartphones, mobile accessories, chargers & electronic gadgets', '/categories/electronics.jpg', 7, 1.50),
('Hardware & Electrical', 'hardware-electrical', 'Paints, electrical wiring, tools & household repair hardware', '/categories/hardware.jpg', 8, 2.00),
('Books & Education', 'books-education', 'School textbooks, competitive exam books, notebooks & art stationery', '/categories/books.jpg', 9, 2.00),
('Home & Appliances', 'home-appliances', 'Kitchen cookware, brass utensils, storage, fans & home decor', '/categories/home.jpg', 10, 2.00)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Configurable Tum-Tum Delivery Distance Slabs
INSERT INTO public.delivery_pricing_rules (min_distance_km, max_distance_km, customer_fee, driver_payout) VALUES
(0.0, 1.5, 20.00, 15.00), -- Short town run (Gogamukh Bazar to Ward 1-3): ₹5 platform margin
(1.5, 3.5, 35.00, 27.00), -- Medium distance (Station Road to Chauldhowa): ₹8 platform margin
(3.5, 6.0, 50.00, 40.00), -- Peripheral cluster (Bordoibam & outward wards): ₹10 platform margin
(6.0, 10.0, 75.00, 60.00) -- Extended rural delivery: ₹15 platform margin
ON CONFLICT DO NOTHING;

-- 3. Initial App Settings
INSERT INTO public.app_settings (key, value, description) VALUES
('seller_response_timeout_minutes', '5', 'Minutes before an unaccepted order auto-cancels and refunds'),
('driver_acceptance_timeout_seconds', '90', 'Seconds Tum-Tum drivers have to accept an order broadcast'),
('five_delivery_reward_free_count', '1', 'Number of free deliveries earned after 5 completed orders'),
('gogo_points_per_rupee', '0.05', '5 points earned per ₹100 spent'),
('bag_return_credit_rupees', '3.00', 'Amount credited to customer per clean returned reusable bag')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
