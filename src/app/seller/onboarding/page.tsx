"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Store, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function SellerOnboardingPage() {
  const [selectedSize, setSelectedSize] = useState<"small" | "standard" | "large" | "premium">("standard");

  const plans = [
    { size: "small" as const, name: "Small Shop", fee: 3000, desc: "Paan shops, roadside tea stalls, small vegetable vendors" },
    { size: "standard" as const, name: "Standard Merchant", fee: 6000, desc: "Standard grocery bhandar, bakeries, pharmacies, stationery" },
    { size: "large" as const, name: "Large Business", fee: 8000, desc: "Multi-counter retail stores, popular restaurants, electronics" },
    { size: "premium" as const, name: "Premium Enterprise", fee: 12000, desc: "Handloom silk emporiums, department stores, brand outlets" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="border-b border-forest-800/10 pb-4 text-center sm:text-left">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-forest-900">
          Register Your Gogamukh Shop
        </h1>
        <p className="text-xs sm:text-sm text-forest-700 mt-1">
          Complete company-managed digital setup, professional product photography, and packaging stickers included
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((p) => {
          const isSelected = selectedSize === p.size;
          return (
            <div
              key={p.size}
              onClick={() => setSelectedSize(p.size)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-forest-50 border-forest-800 ring-2 ring-forest-800 shadow-md"
                  : "bg-white border-forest-800/10 hover:border-forest-800/30"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-forest-900">{p.name}</h3>
                  <span className="font-bold text-xl text-forest-900">{formatPrice(p.fee)}</span>
                </div>
                <p className="text-xs text-forest-700 leading-relaxed">{p.desc}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-forest-800/10 flex items-center justify-between text-xs font-semibold text-forest-800">
                <span>One-time setup fee</span>
                {isSelected && <span className="text-emerald-700 font-bold">✓ Selected</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-white border border-forest-800/10 space-y-4 shadow-sm">
        <h3 className="font-serif font-bold text-lg text-forest-900">What Our Gogamukh Team Does:</h3>
        <ul className="text-xs text-forest-700 space-y-2">
          <li>✓ Visits your physical shop in Gogamukh</li>
          <li>✓ Photographs your products with studio-grade lighting</li>
          <li>✓ Uploads catalogue, pricing, and initial stock quantities</li>
          <li>✓ Provides official Gogamukh Online Mart branded packaging stickers</li>
          <li>✓ Hands-on training on your phone/tablet to manage daily orders</li>
        </ul>

        <div className="pt-4 border-t border-forest-800/10">
          <Link
            href="/seller/dashboard"
            className="w-full py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm text-center block shadow-brand transition-all"
          >
            Submit Registration & Schedule Shop Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
