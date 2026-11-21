"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Package, Plus, Edit, Trash2 } from "lucide-react";

export default function SellerProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS.filter((p) => p.shop_id === "shop-1"));

  const toggleProductActive = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, is_active: !p.is_active } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-800/10 pb-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
            Product Catalogue
          </h1>
          <p className="text-xs text-forest-700 mt-0.5">
            Manage your store's listings, retail prices, and instant availability
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="divide-y divide-forest-800/10">
          {products.map((product) => (
            <div key={product.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-sage-50 shrink-0 border border-forest-800/10">
                  <Image
                    src={product.images[0] || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-charcoal-900">{product.name}</h3>
                  <div className="text-[11px] text-forest-600 mt-0.5">
                    {product.unit} • Stock: <strong className="text-forest-900">{product.stock_quantity} available</strong>
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-forest-900 mt-1">
                    {formatPrice(product.selling_price)}
                    <span className="text-[11px] text-charcoal-600 line-through ml-2">
                      MRP {formatPrice(product.mrp)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleProductActive(product.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    product.is_active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {product.is_active ? "Active" : "Hidden"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
