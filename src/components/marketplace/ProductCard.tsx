"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Plus, Minus, Check, AlertCircle } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, updateCartQuantity, cart } = useMarketplace();
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isOutOfStock = product.stock_quantity <= 0;
  const discountPct = Math.round(((product.mrp - product.selling_price) / product.mrp) * 100);

  const cartItem = cart.find((item) => item.product.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    const res = addToCart(product, 1);
    if (res.success) {
      setAdded(true);
      setErrorMsg(null);
      setTimeout(() => setAdded(false), 1200);
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateCartQuantity(product.id, cartQuantity - 1);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQuantity < product.stock_quantity) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="group gamusa-card flex flex-col overflow-hidden relative">
      {/* Product Image & Badges */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full bg-[#FAF4EA] overflow-hidden block">
        <Image
          src={product.images[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Traditional Gamusa Red Discount Tag */}
        {discountPct > 0 && (
          <span className="absolute top-2 left-2 bg-[#C71F2D] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-lg shadow-sm border border-white/20">
            {discountPct}% OFF
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-charcoal-900/65 backdrop-blur-[2px] flex items-center justify-center p-2 text-center">
            <span className="bg-charcoal-900 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-xl uppercase tracking-wider border border-white/20">
              Out of Stock
            </span>
          </div>
        )}

        {/* Shop badge */}
        {product.shop_name && (
          <span className="absolute bottom-1.5 left-1.5 right-1.5 truncate bg-[#0D2418]/90 backdrop-blur-sm text-[#F5D061] text-[9px] sm:text-[10px] px-2 py-0.5 rounded-lg font-bold border border-[#D4A338]/30">
            {product.shop_name}
          </span>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold text-forest-700/80 mb-0.5">{product.unit}</div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif font-bold text-xs sm:text-sm text-charcoal-900 line-clamp-2 group-hover:text-[#C71F2D] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-3 border-t-2 border-[#C71F2D]/10 flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Pricing */}
          <div>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="font-black text-xs sm:text-base text-forest-950">
                {formatPrice(product.selling_price)}
              </span>
              {product.mrp > product.selling_price && (
                <span className="text-[10px] sm:text-[11px] text-charcoal-500 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
            <div className="text-[8px] sm:text-[9px] text-emerald-800 font-extrabold truncate">
              {product.stock_quantity > 0 ? "In Stock" : "Unavailable"}
            </div>
          </div>

          {/* Add / Stepper CTA */}
          {cartQuantity > 0 ? (
            <div className="flex items-center rounded-xl bg-[#FAF4EA] border-2 border-[#C71F2D] overflow-hidden shadow-sm">
              <button
                onClick={handleDecrease}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#C71F2D] hover:bg-[#C71F2D]/10 active:scale-95 transition-all"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <span className="w-6 sm:w-7 text-center font-black text-xs sm:text-sm text-forest-950">
                {cartQuantity}
              </span>
              <button
                onClick={handleIncrease}
                disabled={cartQuantity >= product.stock_quantity}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white bg-[#C71F2D] hover:bg-[#A81925] active:scale-95 transition-all disabled:opacity-50"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1 transition-all shadow-sm active:scale-95 ${
                isOutOfStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-emerald-600 text-white"
                  : "bg-[#C71F2D] text-white hover:bg-[#A81925]"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Single-Shop Conflict Error Alert */}
        {errorMsg && (
          <div className="mt-1.5 p-1.5 rounded-lg bg-[#C71F2D]/10 border border-[#C71F2D]/30 text-[9px] text-[#C71F2D] flex items-start gap-1 font-semibold">
            <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
            <span className="flex-1 leading-tight">{errorMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
