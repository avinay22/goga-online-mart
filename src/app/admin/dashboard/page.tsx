"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Store,
  Truck,
  IndianRupee,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { orders } = useMarketplace();

  const totalGMV = orders.reduce((sum, o) => sum + o.total_payable, 0) + 12850;
  const platformCommissions = orders.reduce((sum, o) => sum + o.platform_commission_amount, 0) + 257;
  const platformDeliveryMargins = orders.reduce((sum, o) => sum + o.platform_delivery_margin, 0) + 140;

  const activeOrders = orders.filter((o) => !["delivered", "cancelled"].includes(o.status));
  const pendingSellerOrders = orders.filter((o) => ["placed", "waiting_shop_approval"].includes(o.status));

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
            Marketplace Operations Pulse
          </h1>
          <p className="text-xs text-forest-700 mt-0.5">
            Ecosystem overview: Gross merchandise value, active Tum-Tum deliveries, and revenue split
          </p>
        </div>
      </div>

      {/* KPI Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-1">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Gross Platform GMV</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">{formatPrice(totalGMV)}</div>
          <div className="text-[10px] text-forest-600">Total customer spend in Gogamukh</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-1">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Platform Commission</span>
            <IndianRupee className="w-4 h-4 text-muga-600" />
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">{formatPrice(platformCommissions)}</div>
          <div className="text-[10px] text-emerald-700 font-semibold">1% to 3% category-wise</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-1">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Delivery Margin</span>
            <Truck className="w-4 h-4 text-forest-800" />
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">{formatPrice(platformDeliveryMargins)}</div>
          <div className="text-[10px] text-forest-600">Customer fee − Driver payout</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-forest-800/10 shadow-sm space-y-1">
          <div className="text-[11px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>In-Transit Orders</span>
            <ShoppingBag className="w-4 h-4 text-terracotta" />
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">{activeOrders.length}</div>
          <div className="text-[10px] text-forest-600">Active Tum-Tum runs</div>
        </div>
      </div>

      {/* SLA Alert banner */}
      {pendingSellerOrders.length > 0 && (
        <div className="p-4 rounded-2xl bg-terracotta/10 border border-terracotta/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-terracotta text-white font-bold">
              <Clock className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest-950">
                {pendingSellerOrders.length} order(s) awaiting shop acceptance
              </h4>
              <p className="text-xs text-forest-700">
                Auto-cancel daemon monitors 5-minute timeout to ensure instant customer refund if shop does not respond.
              </p>
            </div>
          </div>
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-lg bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs shadow-sm"
          >
            Review Orders →
          </Link>
        </div>
      )}

      {/* Active Orders Quick Table */}
      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 bg-sage-50/50 border-b border-forest-800/10 flex items-center justify-between">
          <span className="font-bold text-xs uppercase text-forest-800">Active Orders Pipeline</span>
          <Link href="/admin/orders" className="text-xs font-semibold text-forest-800 hover:text-muga-600">
            View Universal Monitor →
          </Link>
        </div>

        <div className="divide-y divide-forest-800/10">
          {orders.slice(0, 5).map((ord) => (
            <div key={ord.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-forest-900">{ord.order_number}</span>
                <span className="text-forest-600 ml-2">Shop: {ord.shop_name} • Customer: {ord.customer_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-forest-900">{formatPrice(ord.total_payable)}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-muga-100 text-muga-800">
                  {ord.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
