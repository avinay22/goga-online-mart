# Gogamukh Online Mart (GOM)
> **Our Gogamukh. Our Shops. Our Doorsteps.**  
> *A Complete Hyper-Local Marketplace & Tum-Tum Delivery Ecosystem for Gogamukh, Dhemaji, Assam, India.*

---

## 🌟 Executive Overview
**Gogamukh Online Mart** is an indigenous hyper-local marketplace platform connecting residents, local merchants, and Tum-Tum (electric e-rickshaw) delivery drivers across Gogamukh, Dhemaji, Assam.

Rooted in authentic Assamese and Mising tribal heritage, the platform unifies four dedicated user experiences onto a single Next.js 15 App Router architecture with a shared PostgreSQL database and real-time state machine:
1. **Customer Web App & PWA** (`/`)
2. **Seller Admin Panel** (`/seller`)
3. **Tum-Tum Delivery Partner Portal** (`/driver`)
4. **Master Admin Command Center** (`/admin`)

---

## 🎨 Authentic Assamese Heritage Design System
- **Gamusa Crimson Red (`#C71F2D` / `#9C1420`):** Inspired by the woven floral embroidery of the authentic Assamese *Phulam Gamusa*.
- **Handloom Cotton Ivory (`#FFFDF8`):** The clean, natural base of traditional Eri & cotton fabric.
- **Muga Silk Gold (`#D4A338` / `#F5D061`):** Celebrating the golden silk of Assam in merchant badges, seals, and accents.
- **Brahmaputra Forest Green (`#0D2418`):** Evergreen natural heritage of Upper Assam.
- **Master Jaapi & Gamusa Crest:** Conical bamboo Jaapi with 16-point traditional felt petals and draped Phulam Gamusa scarves.
- **Mising Tribal Handloom Ribbons:** Traditional diamond lozenges and chevron weaves representing Dhemaji's indigenous weaving traditions.

---

## 🏗️ Technology Stack
- **Framework:** Next.js 15 (App Router, Server Actions, TypeScript)
- **Styling:** Tailwind CSS with custom Assamese token system
- **Database & Auth:** Supabase / PostgreSQL 16 with Row-Level Security (RLS)
- **Icons:** Lucide React
- **Payments:** Razorpay Marketplace & Webhooks with HMAC verification
- **State & Realtime:** Unified React Context Store with real-time state machine transitions

---

## 🚀 Key Modules & Capabilities

### 🛒 1. Customer Storefront
- **10 Core Local Categories:** Grocery & Daily Needs, Food & Restaurants, Pharmacy & Healthcare, Fashion & Accessories, Beauty & Personal Care, Gifts & Toys, Electronics & Mobile, Hardware & Electrical, Books & Education, Home & Appliances.
- **Single-Shop Cart Enforcement:** Ensures orders are packed together at one shop for rapid 20-30 minute Tum-Tum delivery.
- **Live Order Tracking Stepper:** Real-time progression (Placed → Accepted → Ready → Driver Assigned → Picked Up → Delivered).
- **4-Digit Customer OTP:** Verification code required from customer before driver can mark delivery complete.
- **5-Delivery Free Delivery Programme:** Unlocks free Tum-Tum delivery every 5 completed orders.
- **Gogo Rewards:** Loyalty point tally on every purchase.
- **Daily Tiffin Subscription:** 7-day, 15-day, and 30-day homestyle Assamese meal plans.
- **Return-a-Bag Eco Reward:** ₹3.00 credit for returning branded paper bags.
- **Shopping Champions:** Weekly, monthly, and yearly top customer leaderboards.

### 🏬 2. Seller Admin Panel
- **5-Minute SLA Acceptance Counter:** Automatic countdown timer with sound notifications. If seller does not respond within 5 minutes, order auto-cancels and initiates instant refund.
- **Product & Stock Management:** Instant Out-of-Stock locking when inventory reaches zero.
- **Finance & Payouts:** Category-wise 1%–3% commission deduction, 30-day 0% introductory exemption, and daily UPI settlement records.

### 🛺 3. Tum-Tum Delivery Partner Portal
- **Online/Offline Availability Switch:** Flexible on-demand work without rigid shifts.
- **90-Second Radar Broadcast:** Proximity-based delivery requests with guaranteed payouts.
- **OTP Delivery Handover:** Driver enters customer's 4-digit OTP to complete run and trigger immutable financial split.
- **Driver Earnings:** Daily payout history with next-morning UPI transfer records.

### 🛡️ 4. Master Admin Command Center
- **Operations Pulse:** Gross GMV, active Tum-Tum fleet, platform commissions, and delivery margins.
- **Dynamic Delivery Pricing Engine:** Configurable distance slabs (Short, Medium, Long, Rural) defining customer fees vs driver payouts vs platform margins.
- **Universal Order Oversight:** Real-time visibility and manual override controls across all shops.
- **Batch Settlements:** Daily settlement generation for sellers and drivers.

---

## 📦 Setup & Development

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and configure your credentials:
```bash
cp .env.example .env.local
```

### 3. Database Migration
Deploy the PostgreSQL migration located at:
```
supabase/migrations/20261121_000001_initial_schema.sql
```
And load sample seed data:
```
supabase/seed.sql
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧑‍💻 Previewing Different Roles
A **Role Switcher Bar** is pinned to the top header in preview mode, allowing you to instantly switch between:
- **Customer App** (`/`)
- **Seller Panel** (`/seller/dashboard`)
- **Tum-Tum Driver** (`/driver/dashboard`)
- **Master Admin** (`/admin/dashboard`)
