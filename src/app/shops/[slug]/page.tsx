"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_SHOPS, MOCK_PRODUCTS } from "@/lib/mock-data";
import ProductCard from "@/components/marketplace/ProductCard";
import { MapPin, Phone, Clock, Star, ArrowLeft, ShieldCheck } from "lucide-react";

export default function ShopProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const shop = MOCK_SHOPS.find((s) => s.slug === slug);
  const shopProducts = MOCK_PRODUCTS.filter((p) => p.shop_id === shop?.id);

  if (!shop) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-forest-900">Shop Not Found</h2>
        <p className="text-xs text-forest-700">The requested local shop does not exist or has not yet registered.</p>
        <Link href="/shops" className="inline-block px-4 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold">
          Browse All Shops
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-forest-700">
        <Link href="/" className="hover:text-forest-900">Home</Link>
        <span>/</span>
        <Link href="/shops" className="hover:text-forest-900">Shops</Link>
        <span>/</span>
        <span className="font-semibold text-forest-900">{shop.shop_name}</span>
      </div>

      {/* Shop Profile Banner & Header */}
      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-64 w-full bg-forest-900">
          <Image
            src={shop.cover_url}
            alt={shop.shop_name}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <Link
            href="/shops"
            className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-forest-900 text-xs font-semibold flex items-center gap-1.5 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Shops</span>
          </Link>
        </div>

        {/* Shop Info Container */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  Open for Delivery
                </span>
                <span className="text-xs text-forest-600 font-semibold">• {shop.category_names.join(", ")}</span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900 mt-1">
                {shop.shop_name}
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-muga-50 border border-muga-300 text-muga-800 font-bold text-sm flex items-center gap-1.5">
                <Star className="w-4 h-4 text-muga-500 fill-muga-400" />
                <span>{shop.rating}</span>
                <span className="text-[10px] text-forest-600 font-normal">(Verified Local Rating)</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-forest-700 max-w-3xl leading-relaxed">
            {shop.description}
          </p>

          <div className="pt-3 border-t border-forest-800/10 flex flex-wrap items-center gap-6 text-xs text-forest-800">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest-600" />
              <span>{shop.address_line}, {shop.area} (Landmark: {shop.landmark})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forest-600" />
              <span>{shop.opening_time} - {shop.closing_time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-forest-600" />
              <span>{shop.contact_phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Products Catalogue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-forest-900">
            Products from {shop.shop_name}
          </h2>
          <span className="text-xs text-forest-600 font-medium">
            {shopProducts.length} items available
          </span>
        </div>

        {shopProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {shopProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-forest-800/10 text-xs text-forest-700">
            No active products listed currently.
          </div>
        )}
      </div>
    </div>
  );
}
