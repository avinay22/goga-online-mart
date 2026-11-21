"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_PRODUCTS, MOCK_SHOPS } from "@/lib/mock-data";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingBag,
  Store,
  Check,
  AlertCircle,
} from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  const shop = MOCK_SHOPS.find((s) => s.id === product?.shop_id);

  const { addToCart, cart } = useMarketplace();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-forest-900">Product Not Found</h2>
        <p className="text-xs text-forest-700">The product you are looking for is not listed.</p>
        <Link href="/" className="inline-block px-4 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold">
          Back to Homepage
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock_quantity <= 0;
  const discountPct = Math.round(((product.mrp - product.selling_price) / product.mrp) * 100);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const res = addToCart(product, quantity);
    if (res.success) {
      setAdded(true);
      setErrorMsg(null);
      setTimeout(() => setAdded(false), 2000);
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-forest-700">
        <Link href="/" className="hover:text-forest-900">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-forest-900">Categories</Link>
        <span>/</span>
        <span className="font-semibold text-forest-900">{product.name}</span>
      </div>

      <div className="bg-white rounded-2xl border border-forest-800/10 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-sage-50 border border-forest-800/10">
            <Image
              src={product.images[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            {discountPct > 0 && (
              <span className="absolute top-3 left-3 bg-gamusa-red text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                {discountPct}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Details & Purchase Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {shop && (
              <Link
                href={`/shops/${shop.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sage-100 text-forest-800 hover:bg-sage-200 text-xs font-semibold transition-colors"
              >
                <Store className="w-3.5 h-3.5 text-forest-700" />
                <span>Sold by: {shop.shop_name} ({shop.area})</span>
              </Link>
            )}

            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-charcoal-900 leading-snug">
              {product.name}
            </h1>

            <div className="text-xs font-medium text-forest-600">
              Unit: <strong className="text-forest-900">{product.unit}</strong>
              {product.brand && ` • Brand: ${product.brand}`}
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-xl bg-sage-50 border border-forest-800/10 flex items-baseline gap-3">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
                {formatPrice(product.selling_price)}
              </span>
              {product.mrp > product.selling_price && (
                <span className="text-sm text-charcoal-700 line-through">
                  MRP {formatPrice(product.mrp)}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700">
                Save {formatPrice(product.mrp - product.selling_price)}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-xs text-forest-900 uppercase tracking-wider">About This Item</h3>
              <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Delivery Promise */}
            <div className="p-3.5 rounded-xl bg-forest-50 border border-forest-800/10 flex items-center gap-3 text-xs text-forest-800">
              <Truck className="w-5 h-5 text-forest-800 shrink-0" />
              <div>
                <strong className="block font-semibold">Fast Tum-Tum Delivery to Your Gate</strong>
                <span className="text-forest-600 text-[11px]">Prepared fresh & delivered across Gogamukh within 20–35 minutes.</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-3 pt-6 border-t border-forest-800/10">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-terracotta/10 border border-terracotta/30 text-xs text-terracotta-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="flex-1">{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-forest-800/20 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-forest-800 hover:bg-forest-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 font-bold text-sm text-forest-900 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-forest-800 hover:bg-forest-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-brand transition-all ${
                  isOutOfStock
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : added
                    ? "bg-emerald-600 text-white"
                    : "bg-forest-800 hover:bg-forest-900 text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-muga-400" />
                    <span>Add to Cart ({formatPrice(product.selling_price * quantity)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
