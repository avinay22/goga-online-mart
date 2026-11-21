"use client";

import React, { useState } from "react";
import { MOCK_SHOPS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Store, Check, ShieldCheck, Star } from "lucide-react";

export default function AdminSellersPage() {
  const [shops, setShops] = useState(MOCK_SHOPS);

  const toggleStatus = (shopId: string) => {
    setShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, status: s.status === "open" ? "closed" : "open" } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Shops & Merchant Directory
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Manage local business registrations, categories, and 30-day 0% commission exemptions
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="divide-y divide-forest-800/10">
          {shops.map((shop) => (
            <div key={shop.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-forest-900">{shop.shop_name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sage-200 text-forest-800">
                    {shop.shop_size}
                  </span>
                </div>
                <div className="text-xs text-forest-600 mt-1">
                  {shop.address_line}, {shop.area} • Contact: {shop.contact_phone}
                </div>
                <div className="text-[11px] text-muga-700 font-semibold mt-0.5">
                  Categories: {shop.category_names.join(", ")}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStatus(shop.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    shop.status === "open"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  ● {shop.status === "open" ? "Open for Orders" : "Closed"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
