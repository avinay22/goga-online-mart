"use client";

import React, { use } from "react";
import Link from "next/link";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data";
import ProductCard from "@/components/marketplace/ProductCard";
import { ArrowLeft, Filter } from "lucide-react";

export default function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  const products = MOCK_PRODUCTS.filter((p) => p.category_slug === slug);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-forest-900">Category Not Found</h2>
        <p className="text-xs text-forest-700">The requested category does not exist in Gogamukh Online Mart.</p>
        <Link href="/categories" className="inline-block px-4 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold">
          Return to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-forest-700">
        <Link href="/" className="hover:text-forest-900">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-forest-900">Categories</Link>
        <span>/</span>
        <span className="font-semibold text-forest-900">{category.name}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-forest-900 text-ivory-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-brand">
        <div className="max-w-2xl relative z-10 space-y-2">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs text-muga-300 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
          <h1 className="font-serif font-bold text-2xl sm:text-4xl text-white">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-forest-200 leading-relaxed font-light">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-forest-800">
            Showing {products.length} products from verified Gogamukh shops
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-forest-800/10 p-12 text-center space-y-3">
            <h3 className="font-serif font-bold text-lg text-forest-900">Catalogue Updating</h3>
            <p className="text-xs text-forest-700 max-w-md mx-auto">
              Our Gogamukh team is actively cataloguing and photographing fresh items for {category.name}. Check back shortly!
            </p>
            <Link href="/" className="inline-block px-4 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold">
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
