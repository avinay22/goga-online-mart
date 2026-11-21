"use client";

import React, { useState } from "react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Layers, AlertTriangle, Plus } from "lucide-react";

export default function SellerInventoryPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS.filter((p) => p.shop_id === "shop-1"));

  const updateStock = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock_quantity: Math.max(0, p.stock_quantity + delta) } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Inventory & Stock Management
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Automatic out-of-stock locking when quantity reaches zero
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="divide-y divide-forest-800/10">
          {products.map((p) => {
            const isLow = p.stock_quantity <= 5;
            const isOut = p.stock_quantity === 0;

            return (
              <div key={p.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-forest-900 text-sm">{p.name}</h4>
                  <div className="text-forest-600 mt-0.5">{p.unit}</div>
                  <div className="mt-1">
                    {isOut ? (
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">
                        Out of Stock (Hidden from Shoppers)
                      </span>
                    ) : isLow ? (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                        Low Stock Alert ({p.stock_quantity} left)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        In Stock ({p.stock_quantity} units)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStock(p.id, -5)}
                    className="px-2.5 py-1.5 rounded-lg border border-forest-800/20 hover:bg-forest-50 font-bold text-xs"
                  >
                    -5
                  </button>
                  <span className="font-bold text-sm text-forest-900 min-w-[32px] text-center">
                    {p.stock_quantity}
                  </span>
                  <button
                    onClick={() => updateStock(p.id, 10)}
                    className="px-2.5 py-1.5 rounded-lg bg-forest-800 text-white hover:bg-forest-900 font-bold text-xs"
                  >
                    +10 Restock
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
