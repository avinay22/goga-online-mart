"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { Sparkles, Gift, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";

export default function RewardsPage() {
  const { gogoPoints, completedDeliveriesCount, freeDeliveriesAvailable } = useMarketplace();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Gogo Rewards & Loyalty
        </h1>
        <p className="text-xs text-forest-700 mt-1">
          Earn points on every order and unlock free deliveries across Gogamukh
        </p>
      </div>

      {/* 5-Delivery Free Delivery Progress Card */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-ivory rounded-2xl p-6 sm:p-8 shadow-brand space-y-4 border border-muga-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-muga-400" />
            <h2 className="font-serif font-bold text-xl text-white">5-Delivery Free Delivery Loop</h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-muga-400 text-forest-950 font-bold text-xs">
            {completedDeliveriesCount} Completed
          </span>
        </div>

        <p className="text-xs text-forest-200">
          Every 5 completed orders unlocks 1 completely free Tum-Tum delivery anywhere in our service area.
        </p>

        {/* 5-Step Bar */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((step) => {
            const isFilled = step <= (completedDeliveriesCount % 5 || (completedDeliveriesCount >= 5 ? 5 : 0));
            return (
              <div
                key={step}
                className={`h-3 rounded-full transition-all ${
                  isFilled ? "bg-muga-400 shadow-sm" : "bg-white/20"
                }`}
              />
            );
          })}
        </div>

        <div className="pt-2 text-xs text-forest-200">
          {freeDeliveriesAvailable > 0 ? (
            <span className="text-muga-300 font-bold">
              🎉 You have {freeDeliveriesAvailable} free delivery coupon available! Applied automatically at next checkout.
            </span>
          ) : (
            <span>
              Complete <strong>{5 - (completedDeliveriesCount % 5)} more orders</strong> to unlock your next free delivery!
            </span>
          )}
        </div>
      </div>

      {/* Points Ledger & Breakdown */}
      <div className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-forest-800/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-muga-500 fill-muga-400" />
            <h3 className="font-serif font-bold text-lg text-forest-900">Gogo Points Balance</h3>
          </div>
          <span className="font-bold text-2xl text-muga-600">{gogoPoints} pts</span>
        </div>

        <div className="text-xs text-forest-700 leading-relaxed">
          You earn <strong>5 Gogo points for every ₹100 spent</strong> on eligible groceries, food, and essentials. Points can be redeemed for order discounts or local merchant offers.
        </div>

        <div className="pt-3 border-t border-forest-800/10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-forest-900"
          >
            <span>Order now to earn more points</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
