"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function FloatingCartBar() {
  const pathname = usePathname();
  const { cart, cartTotal } = useMarketplace();

  // Hide on cart, checkout, or non-customer portals
  if (
    cart.length === 0 ||
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname.startsWith("/seller") ||
    pathname.startsWith("/driver") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shopName = cart[0]?.product.shop_name || "Local Shop";

  return (
    <div className="fixed bottom-[60px] md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:w-96 z-40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <Link
        href="/cart"
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#9C1420] via-[#C71F2D] to-[#800F19] text-white shadow-2xl border-2 border-[#D4A338] hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-black text-xs sm:text-sm">
                {totalItems} {totalItems === 1 ? "Item" : "Items"}
              </span>
              <span className="text-white/60">•</span>
              <span className="font-black text-xs sm:text-sm text-[#F5D061]">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#FAF5EB]/90 truncate">
              {shopName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm pl-2 shrink-0 bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F5D061]" />
        </div>
      </Link>
    </div>
  );
}
