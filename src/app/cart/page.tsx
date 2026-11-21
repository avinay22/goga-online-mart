"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Store,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    freeDeliveriesAvailable,
  } = useMarketplace();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-forest-50 border border-forest-800/10 flex items-center justify-center mx-auto text-forest-800">
          <ShoppingBag className="w-10 h-10 text-forest-700" />
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Your Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-forest-700 max-w-md mx-auto">
          Explore local groceries, delicious restaurant thalis, and pharmacy essentials from verified Gogamukh merchants.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-forest-800 text-white font-bold text-xs hover:bg-forest-900 shadow-brand transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const shopName = cart[0].product.shop_name || "Local Merchant";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="border-b border-forest-800/10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
            Shopping Cart
          </h1>
          <p className="text-xs text-forest-700 mt-1">
            Order fulfilled directly by <strong className="text-forest-900">{shopName}</strong>
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-terracotta hover:text-terracotta-700 font-semibold flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Single Shop Guarantee Notice */}
          <div className="p-3.5 rounded-xl bg-forest-50 border border-forest-800/10 flex items-center gap-3 text-xs text-forest-800">
            <Store className="w-4 h-4 text-forest-800 shrink-0" />
            <div>
              <span className="font-semibold">Single-Shop Express Order:</span> All items will be packed together at {shopName} for rapid Tum-Tum delivery.
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-forest-800/10 divide-y divide-forest-800/10 shadow-sm overflow-hidden">
            {cart.map((item) => {
              const unitPrice = item.variant ? item.variant.selling_price : item.product.selling_price;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div key={item.id} className="p-4 sm:p-5 flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-sage-50 shrink-0 border border-forest-800/10">
                    <Image
                      src={item.product.images[0] || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs sm:text-sm text-charcoal-900 truncate">
                      {item.product.name}
                    </h3>
                    <div className="text-[11px] text-forest-600 mt-0.5">
                      {item.variant ? item.variant.variant_name : item.product.unit}
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-forest-900 mt-1">
                      {formatPrice(unitPrice)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-forest-800/20 rounded-lg bg-ivory overflow-hidden">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1.5 text-forest-800 hover:bg-forest-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 font-bold text-xs text-forest-900 min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1.5 text-forest-800 hover:bg-forest-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="text-right shrink-0">
                    <div className="font-bold text-xs sm:text-sm text-forest-900">
                      {formatPrice(lineTotal)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-forest-400 hover:text-terracotta transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary & Checkout Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-forest-900 pb-3 border-b border-forest-800/10">
              Bill Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-forest-700">
                <span>Item Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatPrice(cartSubtotal)}</span>
              </div>

              <div className="flex justify-between text-forest-700">
                <div className="flex items-center gap-1">
                  <span>Tum-Tum Delivery Fee</span>
                  {freeDeliveriesAvailable > 0 && (
                    <span className="px-1.5 py-0.2 rounded bg-muga-100 text-muga-800 text-[10px] font-bold">
                      FREE REWARD
                    </span>
                  )}
                </div>
                <span className="font-semibold text-charcoal-900">
                  {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(deliveryFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-forest-800/10 flex justify-between text-sm sm:text-base font-bold text-forest-900">
                <span>To Pay</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Gogo Points Earnable Preview */}
            <div className="p-3 rounded-xl bg-muga-50 border border-muga-300/40 text-[11px] text-muga-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-muga-500 fill-muga-400 shrink-0" />
              <span>You will earn <strong>+{Math.floor(cartTotal * 0.05)} Gogo Points</strong> on this order!</span>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-brand transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-[11px] text-forest-600 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Secure Razorpay Checkout • Verified Shop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
