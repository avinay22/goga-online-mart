"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  IndianRupee,
  Layers,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Store,
} from "lucide-react";

export default function SellerDashboardPage() {
  const { orders } = useMarketplace();
  const [shopStatus, setShopStatus] = useState<"open" | "busy" | "closed">("open");

  const pendingOrders = orders.filter((o) => ["placed", "waiting_shop_approval"].includes(o.status));
  const activeOrders = orders.filter((o) => ["accepted", "preparing", "ready_for_pickup", "driver_assigned", "picked_up"].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === "delivered");

  const totalSales = completedOrders.reduce((sum, o) => sum + o.subtotal_amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Shop Live Status Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-800/10">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
            Merchant Overview
          </h1>
          <p className="text-xs text-forest-700 mt-0.5">
            Real-time orders, stock availability, and daily revenue
          </p>
        </div>

        {/* Status Switcher (Open / Busy / Closed) */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-forest-800/15 shadow-sm">
          <button
            onClick={() => setShopStatus("open")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              shopStatus === "open"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-forest-700 hover:text-forest-900"
            }`}
          >
            ● Open
          </button>
          <button
            onClick={() => setShopStatus("busy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              shopStatus === "busy"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-forest-700 hover:text-forest-900"
            }`}
          >
            ● Busy
          </button>
          <button
            onClick={() => setShopStatus("closed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              shopStatus === "closed"
                ? "bg-red-700 text-white shadow-sm"
                : "text-forest-700 hover:text-forest-900"
            }`}
          >
            ● Closed
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-2">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Pending Acceptance</span>
            <Clock className="w-4 h-4 text-terracotta" />
          </div>
          <div className="font-serif font-bold text-3xl text-forest-900">{pendingOrders.length}</div>
          <div className="text-[10px] text-terracotta font-semibold">5-min response timer active</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-2">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>In Preparation / Transit</span>
            <ShoppingBag className="w-4 h-4 text-forest-700" />
          </div>
          <div className="font-serif font-bold text-3xl text-forest-900">{activeOrders.length}</div>
          <div className="text-[10px] text-forest-600">Waiting or assigned to Tum-Tum</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-2">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Completed Deliveries</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif font-bold text-3xl text-forest-900">{completedOrders.length}</div>
          <div className="text-[10px] text-emerald-700 font-semibold">100% verified with OTP</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-2">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Product Revenue</span>
            <IndianRupee className="w-4 h-4 text-muga-600" />
          </div>
          <div className="font-serif font-bold text-3xl text-forest-900">{formatPrice(totalSales)}</div>
          <div className="text-[10px] text-forest-600">30-day 0% commission active</div>
        </div>
      </div>

      {/* Urgent Orders Alert Box */}
      {pendingOrders.length > 0 && (
        <div className="p-4 rounded-2xl bg-terracotta/10 border border-terracotta/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-terracotta text-white font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest-950">You have {pendingOrders.length} new incoming order(s)!</h4>
              <p className="text-xs text-forest-700">Please review and click Accept within 5 minutes.</p>
            </div>
          </div>
          <Link
            href="/seller/orders"
            className="px-4 py-2 rounded-lg bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Go to Orders Queue →
          </Link>
        </div>
      )}
    </div>
  );
}
