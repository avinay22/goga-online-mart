"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MOCK_CATEGORIES,
  MOCK_SHOPS,
  MOCK_PRODUCTS,
  MOCK_CHAMPIONS,
} from "@/lib/mock-data";
import ProductCard from "@/components/marketplace/ProductCard";
import { useMarketplace } from "@/lib/store";
import {
  Truck,
  Store,
  Sparkles,
  UtensilsCrossed,
  Trophy,
  ArrowRight,
  Clock,
  RotateCcw,
  Star,
  CheckCircle2,
  MapPin,
  Heart,
  ShieldCheck,
  Award,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import {
  MasterJaapiGamusaCrest,
  AuthenticGamusaBanner,
  MisingTribalBorder,
  XoraiWithGamusaIcon,
  BihuDholPepaIcon,
  TraditionalFolkTreeMotif,
  AssameseHeritagePavilion,
} from "@/components/brand/AssameseMotifs";

export default function HomePage() {
  const { completedDeliveriesCount, freeDeliveriesAvailable, gogoPoints } = useMarketplace();

  return (
    <div className="space-y-6 sm:space-y-16 pb-16 bg-[#FFFDF8] max-w-full overflow-hidden">
      {/* =====================================================================
          1. GRAND ASSAMESE HERITAGE HERO PAVILION
      ===================================================================== */}
      <section className="relative bg-gradient-to-b from-[#FFFDF8] via-[#FAF4EA] to-[#FFFDF8] text-charcoal-900 overflow-hidden pt-4 sm:pt-12 pb-6 sm:pb-16 border-b-4 border-[#C71F2D]">
        {/* Decorative Traditional Folk Tree Creepers in background corners (large screens) */}
        <div className="absolute top-6 left-6 opacity-25 pointer-events-none hidden xl:block">
          <TraditionalFolkTreeMotif className="w-40 h-40" />
        </div>
        <div className="absolute top-6 right-6 opacity-25 pointer-events-none hidden xl:block -scale-x-100">
          <TraditionalFolkTreeMotif className="w-40 h-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Traditional Hero Content & Slogan */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-6 text-center lg:text-left">
              {/* Mobile Centered Jaapi Crest (Shown on phone to create an elegant top emblem) */}
              <div className="lg:hidden flex justify-center pt-1">
                <MasterJaapiGamusaCrest className="w-20 h-20 drop-shadow-md" />
              </div>

              {/* Cultural Badge with Authentic Jaapi & Bihu Dhol Emblems */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border-2 border-[#C71F2D]/30 shadow-sm">
                <BihuDholPepaIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="text-[10px] sm:text-xs font-serif font-black text-[#C71F2D] uppercase tracking-wider">
                  Gogamukh Town Hyper-Local Mart
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-forest-900 bg-[#C71F2D]/10 px-2 py-0.5 rounded-full">
                  Dhemaji, Assam
                </span>
              </div>

              {/* Exact Tagline requested in English: "Our Gogamukh. Our Shops. Our Doorsteps." */}
              <div className="space-y-0.5 sm:space-y-1">
                <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-7xl text-forest-950 tracking-tight leading-[1.08]">
                  Our Gogamukh. <br />
                  Our Shops. <br />
                  <span className="text-[#C71F2D] underline decoration-[#D4A338] decoration-wavy decoration-2">
                    Our Doorsteps.
                  </span>
                </h1>
              </div>

              <p className="text-xs sm:text-base text-forest-800 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Rooted in the timeless traditions of Assam. Fragrant Joha rice, cold-pressed mustard oil, authentic Mising handloom, delicious homestyle Assamese thalis, and pharmacy essentials—delivered with care by our own local Tum-Tum drivers.
              </p>

              {/* Traditional Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1">
                <Link
                  href="/categories"
                  className="px-6 py-3 sm:px-7 sm:py-4 rounded-2xl bg-[#C71F2D] hover:bg-[#A81925] text-white font-black text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 border-2 border-white/30 active:scale-95"
                >
                  <span>Explore 10 Categories</span>
                  <ArrowRight className="w-4 h-4 text-[#F5D061]" />
                </Link>
                <Link
                  href="/tiffin"
                  className="px-5 py-3 sm:px-6 sm:py-4 rounded-2xl bg-white hover:bg-[#FAF4EA] text-forest-950 border-2 border-[#C71F2D]/30 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 hover:border-[#C71F2D] active:scale-95"
                >
                  <XoraiWithGamusaIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Daily Tiffin</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-1.5 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs text-forest-800 font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C71F2D] animate-ping" />
                  <span>100% Town Merchants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C71F2D]" />
                  <span>Fast Tum-Tum Delivery Under 30 Mins</span>
                </div>
              </div>
            </div>

            {/* Desktop Right Column: Grand Assamese Heritage Pavilion Graphic (Hidden on mobile to preserve perfect phone layout!) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center">
              <AssameseHeritagePavilion className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Phulam Gamusa Floral Tapestry Ribbon */}
      <AuthenticGamusaBanner className="h-4 sm:h-7 w-full shadow-md" />

      {/* =====================================================================
          MOBILE QUICK HORIZONTAL CATEGORY SCROLL (Swiggy / Blinkit style)
      ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-2">
          <span className="text-[11px] font-black text-[#C71F2D] uppercase tracking-wider">
            Quick Categories
          </span>
          <Link href="/categories" className="text-xs font-bold text-[#C71F2D] flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="flex flex-col items-center shrink-0 w-[72px] sm:w-20 group text-center"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-[#FAF4EA] border-2 border-[#C71F2D]/20 group-hover:border-[#C71F2D] transition-all p-1 shadow-sm">
                <Image
                  src={cat.image_url || "/placeholder.jpg"}
                  alt={cat.name}
                  fill
                  sizes="64px"
                  className="object-cover rounded-xl group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[10px] font-bold text-forest-950 mt-1 line-clamp-1 leading-tight group-hover:text-[#C71F2D]">
                {cat.name.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* =====================================================================
          2. ASSAMESE HERITAGE TOWN PILLARS (4 Cultural Highlights)
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {/* Card 1: Verified Local Town Shops */}
          <div className="gamusa-card p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C71F2D]" />
            <div className="space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#C71F2D]/10 border border-[#C71F2D]/20 flex items-center justify-center">
                <Store className="w-5 h-5 sm:w-6 sm:h-6 text-[#C71F2D]" />
              </div>
              <h3 className="font-serif font-black text-base sm:text-lg text-forest-950">
                100% Gogamukh Shops
              </h3>
              <p className="text-xs text-forest-700 leading-relaxed font-medium">
                Support trusted local store owners from Gogamukh Bazar, Chariali, and Station Road. No giant warehouses—pure town community.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-xs font-black text-[#C71F2D]">
              <span>Verified Town Partners</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>

          {/* Card 2: Authentic Handloom Heritage */}
          <div className="gamusa-card p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D4A338]" />
            <div className="space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#D4A338]/15 border border-[#D4A338]/30 flex items-center justify-center">
                <MasterJaapiGamusaCrest className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-serif font-black text-base sm:text-lg text-forest-950">
                Assam & Mising Weaves
              </h3>
              <p className="text-xs text-forest-700 leading-relaxed font-medium">
                Handcrafted Phulam Gamusa, traditional Mising Galuk jackets, Ege skirts, and Eri silk scarves woven with indigenous pride in Dhemaji.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-xs font-black text-[#D4A338]">
              <span>GI-Tagged Assamese Heritage</span>
            </div>
          </div>

          {/* Card 3: Daily Assamese Tiffin Bhoj */}
          <div className="gamusa-card p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C71F2D]" />
            <div className="space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#C71F2D]/10 border border-[#C71F2D]/20 flex items-center justify-center">
                <XoraiWithGamusaIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-serif font-black text-base sm:text-lg text-forest-950">
                Homestyle Daily Tiffin
              </h3>
              <p className="text-xs text-forest-700 leading-relaxed font-medium">
                Fresh daily thalis featuring aromatic Joha rice, Mati Mahor daal, fish tenga, and aloo pitika. Cooked fresh by local home kitchens.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-xs font-black text-[#C71F2D]">
              <Link href="/tiffin" className="hover:underline flex items-center gap-1">
                <span>View Daily Meal Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Green Tum-Tum Fleet */}
          <div className="gamusa-card p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600" />
            <div className="space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
              </div>
              <h3 className="font-serif font-black text-base sm:text-lg text-forest-950">
                Green Tum-Tum Fleet
              </h3>
              <p className="text-xs text-forest-700 leading-relaxed font-medium">
                Eco-friendly electric e-rickshaw drivers deliver your parcels safely within 30 minutes, keeping Gogamukh green and pollution-free.
              </p>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-xs font-black text-emerald-700">
              <span>Under 30-Min Fast Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. 5-DELIVERY REWARD LOOP (Styled as Assamese Felicitation Certificate)
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gamusa-certificate rounded-3xl p-4 sm:p-10 relative overflow-hidden bg-[#FFFDF8]">
          <AuthenticGamusaBanner className="absolute top-0 left-0 right-0 h-2.5 sm:h-3" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center pt-2">
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C71F2D]/10 text-[#C71F2D] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#C71F2D]/30">
                <MasterJaapiGamusaCrest className="w-4 h-4 shrink-0" />
                <span>Town Loyalty Program</span>
              </div>

              <h2 className="font-serif font-black text-xl sm:text-4xl text-forest-950 leading-tight">
                5-Delivery Reward Loop: <br />
                <span className="text-[#C71F2D]">Earn 1 Free Tum-Tum Delivery for Every 5 Orders!</span>
              </h2>

              <p className="text-xs sm:text-sm text-forest-800 leading-relaxed font-medium">
                Every qualifying order you place with any verified Gogamukh shop brings you closer to a 100% free Tum-Tum delivery anywhere in town. Unlocked rewards apply automatically at checkout!
              </p>

              {/* Progress Milestones: 5 Assamese Jaapi / Reward Stamps */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-[11px] sm:text-xs font-black text-forest-950">
                  <span>Your Current Cycle Progress:</span>
                  <span className="text-[#C71F2D] font-extrabold">{completedDeliveriesCount} of 5 Completed</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 sm:gap-3 pt-1">
                  {[1, 2, 3, 4, 5].map((step) => {
                    const isEarned = step <= (completedDeliveriesCount % 5 || (completedDeliveriesCount >= 5 ? 5 : 0));
                    return (
                      <div
                        key={step}
                        className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                          isEarned
                            ? "bg-[#C71F2D] text-white border-[#991522] shadow-md scale-105"
                            : "bg-[#FAF4EA] text-forest-800 border-[#C71F2D]/20 opacity-75"
                        }`}
                      >
                        <MasterJaapiGamusaCrest className="w-5 h-5 sm:w-8 sm:h-8 drop-shadow" />
                        <span className="text-[9px] sm:text-[11px] font-black mt-0.5 sm:mt-1">
                          #{step}
                        </span>
                        <span className="text-[7px] sm:text-[9px] font-bold opacity-90 truncate max-w-full">
                          {isEarned ? "Done" : "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Wallet Points & Eco-Bag Quick Balances */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-[#FAF4EA] p-3.5 sm:p-5 rounded-2xl border-2 border-[#D4A338]/40 space-y-1 sm:space-y-2">
                <div className="text-[9px] sm:text-[10px] text-forest-700 font-black uppercase tracking-wider">
                  Gogo Points
                </div>
                <div className="text-xl sm:text-3xl font-black text-forest-950">{gogoPoints} pts</div>
                <div className="text-[10px] sm:text-xs text-[#9E731B] font-bold">
                  ₹{Math.floor(gogoPoints / 10)} savings value
                </div>
              </div>

              <div className="bg-[#FAF4EA] p-3.5 sm:p-5 rounded-2xl border-2 border-[#D4A338]/40 space-y-1 sm:space-y-2">
                <div className="text-[9px] sm:text-[10px] text-forest-700 font-black uppercase tracking-wider">
                  Return-a-Bag
                </div>
                <div className="text-xl sm:text-3xl font-black text-emerald-800">₹3.00</div>
                <div className="text-[10px] sm:text-xs text-forest-700 font-bold">
                  per clean bag
                </div>
              </div>
            </div>
          </div>

          <AuthenticGamusaBanner className="h-2 w-full mt-4 sm:mt-6 opacity-80" />
        </div>
      </section>

      {/* Mising Tribal Ribbon Divider */}
      <MisingTribalBorder className="h-3 sm:h-4 w-full shadow-inner" />

      {/* =====================================================================
          4. FEATURED LOCAL SHOPS
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-8 pb-2 sm:pb-3 border-b-2 border-[#C71F2D]/20">
          <div>
            <div className="flex items-center gap-1.5">
              <Store className="w-4 h-4 text-[#C71F2D]" />
              <span className="text-[10px] sm:text-xs font-black text-[#C71F2D] uppercase tracking-wider">
                Gogamukh Merchants
              </span>
            </div>
            <h2 className="font-serif font-black text-xl sm:text-4xl text-forest-950 mt-0.5">
              Featured Local Shops
            </h2>
          </div>
          <Link
            href="/shops"
            className="text-xs sm:text-sm font-extrabold text-[#C71F2D] hover:text-[#A81925] flex items-center gap-1 transition-colors shrink-0"
          >
            <span>All Shops</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_SHOPS.map((shop) => (
            <Link
              key={shop.id}
              href={`/shops/${shop.slug}`}
              className="group gamusa-card flex flex-col overflow-hidden"
            >
              <div className="relative h-36 sm:h-44 w-full bg-[#FAF4EA] overflow-hidden">
                <Image
                  src={shop.cover_url}
                  alt={shop.shop_name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-black text-forest-950 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-[#D4A338] fill-[#D4A338]" />
                  <span>{shop.rating}</span>
                </div>
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#C71F2D] text-white text-[9px] font-black uppercase tracking-wider border border-white/20">
                  Open Now
                </div>
              </div>

              <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="text-[10px] font-extrabold text-[#D4A338] uppercase tracking-wide">
                    {shop.category_names.join(", ")}
                  </div>
                  <h3 className="font-serif font-black text-sm sm:text-base text-charcoal-900 group-hover:text-[#C71F2D] transition-colors mt-0.5">
                    {shop.shop_name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-forest-700 mt-1 line-clamp-2 leading-relaxed">
                    {shop.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-forest-900/10 flex items-center justify-between text-[11px] text-forest-800">
                  <div className="flex items-center gap-1 font-bold text-forest-950">
                    <MapPin className="w-3 h-3 text-[#C71F2D]" />
                    <span>{shop.area}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-forest-600 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{shop.opening_time} - {shop.closing_time}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. POPULAR LOCAL PRODUCTS
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-8 pb-2 sm:pb-3 border-b-2 border-[#C71F2D]/20">
          <div>
            <h2 className="font-serif font-black text-xl sm:text-4xl text-forest-950">
              Popular Local Items
            </h2>
            <p className="text-[11px] sm:text-sm text-forest-700 font-medium">
              Scented Joha rice, mustard oil, Mising handloom & homestyle meals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {MOCK_PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. ASSAMESE HOMESTYLE TIFFIN BANNER
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#8A111C] via-[#C71F2D] to-[#730D16] rounded-3xl p-5 sm:p-12 text-white shadow-2xl relative overflow-hidden border-4 border-[#D4A338]">
          <AuthenticGamusaBanner className="absolute top-0 left-0 right-0 h-2.5 sm:h-3 opacity-95" />

          <div className="max-w-2xl relative z-10 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#C71F2D] text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm">
              <XoraiWithGamusaIcon className="w-3.5 h-3.5" />
              <span>Assamese Homestyle Kitchen</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-5xl text-white leading-tight">
              Delicious Assamese Homestyle Tiffin Delivered Daily
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF4EA] leading-relaxed font-medium">
              Wholesome daily meals: hot Joha rice, Mati Mahor daal, fish tenga, and local pitika. Perfect for bank staff, teachers, students, and busy families.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/tiffin"
                className="px-6 py-3 rounded-2xl bg-white text-[#C71F2D] font-black text-xs sm:text-sm hover:bg-[#FFFDF8] shadow-lg transition-colors flex items-center gap-2 active:scale-95"
              >
                <span>View Tiffin Menus</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C71F2D]" />
              </Link>
              <div className="text-xs text-white font-bold">
                From <strong className="text-[#F5D061] font-black">₹120/meal</strong> with free delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. GOGAMUKH SHOPPING CHAMPIONS & ECO RETURN-A-BAG
      ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Champions Leaderboard */}
          <div className="lg:col-span-7 gamusa-card p-4 sm:p-8">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#C71F2D]/15">
              <div className="flex items-center gap-2.5">
                <BihuDholPepaIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                <div>
                  <h3 className="font-serif font-black text-base sm:text-xl text-forest-950">
                    Shopping Champions
                  </h3>
                  <p className="text-[10px] sm:text-xs text-forest-600 font-medium">Weekly Top 5 Residents</p>
                </div>
              </div>
              <Link href="/champions" className="text-xs font-black text-[#C71F2D] hover:text-[#A81925]">
                Full Rankings →
              </Link>
            </div>

            <div className="divide-y divide-forest-900/5 mt-2">
              {MOCK_CHAMPIONS.map((champ) => (
                <div key={champ.rank_position} className="py-2.5 sm:py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ${
                        champ.rank_position === 1
                          ? "bg-[#C71F2D] text-white ring-2 ring-[#D4A338]"
                          : champ.rank_position === 2
                          ? "bg-slate-300 text-charcoal-900"
                          : champ.rank_position === 3
                          ? "bg-amber-600 text-white"
                          : "bg-[#FAF4EA] text-forest-800"
                      }`}
                    >
                      {champ.rank_position}
                    </span>
                    <div>
                      <div className="font-extrabold text-charcoal-900 text-xs sm:text-sm">{champ.user_name}</div>
                      <div className="text-[10px] sm:text-[11px] text-forest-600">{champ.area}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-forest-950 text-xs">{champ.qualifying_orders_count} orders</span>
                    <div className="text-[10px] sm:text-[11px] text-forest-600 font-semibold">{formatPrice(champ.total_spend)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eco Return-a-Bag Feature Card */}
          <div className="lg:col-span-5 gamusa-card p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <AuthenticGamusaBanner className="absolute top-0 left-0 right-0 h-2.5" />

            <div className="space-y-3 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                <span>Return-a-Bag Eco Programme</span>
              </div>
              <h3 className="font-serif font-black text-xl sm:text-2xl text-forest-950">
                Keep Gogamukh Clean & Earn Credits
              </h3>
              <p className="text-xs text-forest-700 leading-relaxed font-medium">
                Hand over your clean Gogamukh Mart branded paper bags to our Tum-Tum driver when receiving your next order. Every verified bag earns you ₹3.00 instant wallet credit!
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/return-bag"
                className="w-full py-3 rounded-2xl bg-[#C71F2D] hover:bg-[#A81925] text-white font-black text-xs text-center block transition-colors shadow-md active:scale-95"
              >
                Log a Bag Return
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
