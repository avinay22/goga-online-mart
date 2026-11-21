"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Truck, IndianRupee, BellRing, Navigation, CheckCircle2 } from "lucide-react";

export default function DriverDashboardPage() {
  const { isDriverOnline, orders } = useMarketplace();

  const broadcastingOrders = orders.filter((o) => o.status === "ready_for_pickup");
  const activeOrder = orders.find((o) => ["driver_assigned", "picked_up"].includes(o.status));
  const completedRuns = orders.filter((o) => o.status === "delivered");

  const todayEarnings = completedRuns.reduce((sum, o) => sum + o.driver_payout_amount, 0) + 185;

  return (
    <div className="space-y-6">
      {/* Active Run Banner if any */}
      {activeOrder && (
        <div className="bg-forest-900 text-white rounded-2xl p-5 border border-muga-400/40 shadow-brand flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-muga-500 text-forest-950 font-bold">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-muga-300 uppercase font-bold tracking-wider">Active Run in Progress</span>
              <h3 className="font-serif font-bold text-base text-white">{activeOrder.order_number}</h3>
              <p className="text-xs text-forest-200">
                Pickup: {activeOrder.shop_name} • Payout: <strong className="text-muga-400 font-bold">{formatPrice(activeOrder.driver_payout_amount)}</strong>
              </p>
            </div>
          </div>
          <Link
            href="/driver/active-delivery"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-muga-400 hover:bg-muga-500 text-forest-950 font-bold text-xs text-center shadow-md transition-all"
          >
            Open Navigation & OTP →
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-forest-800/10 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Today's Earnings</span>
            <IndianRupee className="w-4 h-4 text-muga-600" />
          </div>
          <div className="font-serif font-bold text-2xl text-forest-900">{formatPrice(todayEarnings)}</div>
          <div className="text-[10px] text-emerald-700 font-semibold">Settled tomorrow morning via UPI</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-forest-800/10 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>Completed Runs</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif font-bold text-2xl text-forest-900">{completedRuns.length + 5}</div>
          <div className="text-[10px] text-forest-600">Avg ₹25–₹35 per run</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-forest-800/10 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold uppercase text-forest-600 flex items-center justify-between">
            <span>New Requests</span>
            <BellRing className="w-4 h-4 text-terracotta" />
          </div>
          <div className="font-serif font-bold text-2xl text-forest-900">{broadcastingOrders.length}</div>
          <div className="text-[10px] text-forest-600">90-second broadcast window</div>
        </div>
      </div>

      {/* New Requests Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-forest-900">Nearby Delivery Requests</h3>
          <Link href="/driver/requests" className="text-xs font-semibold text-forest-800 hover:text-muga-600">
            View All ({broadcastingOrders.length})
          </Link>
        </div>

        {broadcastingOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-forest-800/10 p-8 text-center space-y-2">
            <Truck className="w-8 h-8 text-forest-400 mx-auto" />
            <h4 className="font-bold text-sm text-forest-900">No Pending Requests Right Now</h4>
            <p className="text-xs text-forest-600">
              {isDriverOnline
                ? "You are Online. When a Gogamukh merchant marks an order packed, you will receive an instant 90-second broadcast here."
                : "You are currently Offline. Turn on your status above to receive delivery calls."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {broadcastingOrders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl border border-muga-400/60 p-4 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-muga-800 bg-muga-100 px-2 py-0.5 rounded">
                    Guaranteed Payout: {formatPrice(ord.driver_payout_amount)}
                  </span>
                  <h4 className="font-bold text-sm text-forest-900 mt-1">{ord.shop_name}</h4>
                  <div className="text-xs text-forest-600">
                    To: {ord.delivery_address.area_colony} ({ord.delivery_address.address_line1})
                  </div>
                </div>
                <Link
                  href="/driver/requests"
                  className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs"
                >
                  Review & Accept
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
