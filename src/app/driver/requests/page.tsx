"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { BellRing, Clock, MapPin, Store, Check, ArrowRight } from "lucide-react";

export default function DriverRequestsPage() {
  const router = useRouter();
  const { orders, driverAcceptBroadcast } = useMarketplace();

  // 90-second countdown timer simulation
  const [countdown, setCountdown] = useState(78);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const broadcastingOrders = orders.filter((o) => o.status === "ready_for_pickup");

  const handleAccept = (orderId: string) => {
    driverAcceptBroadcast(orderId);
    router.push("/driver/active-delivery");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Delivery Broadcast Radar
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          First Tum-Tum driver to accept within 90 seconds receives the assignment
        </p>
      </div>

      {broadcastingOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-forest-800/10 p-12 text-center space-y-3">
          <BellRing className="w-10 h-10 text-forest-400 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-forest-900">Radar Clear</h3>
          <p className="text-xs text-forest-700 max-w-sm mx-auto">
            No active orders waiting for pickup. Keep your Tum-Tum app open; orders appear automatically when ready.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {broadcastingOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl border-2 border-muga-400 p-5 shadow-lg space-y-4 relative overflow-hidden"
            >
              {/* Countdown Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-forest-800/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold text-xs uppercase text-forest-800">Broadcasting to Nearby Drivers</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta-700 font-mono font-bold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{countdown}s remaining</span>
                </div>
              </div>

              {/* Route Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Store className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-forest-900 block">Pickup from: {ord.shop_name}</span>
                    <span className="text-forest-600">{ord.shop_address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-forest-900 block">Deliver to: {ord.delivery_address.recipient_name}</span>
                    <span className="text-forest-600">{ord.delivery_address.area_colony} ({ord.delivery_address.address_line1})</span>
                  </div>
                </div>
              </div>

              {/* Driver Payout & Accept CTA */}
              <div className="pt-3 border-t border-forest-800/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-forest-600 uppercase font-semibold">Your Guaranteed Payout</span>
                  <div className="font-serif font-bold text-2xl text-emerald-800">
                    {formatPrice(ord.driver_payout_amount)}
                  </div>
                </div>

                <button
                  onClick={() => handleAccept(ord.id)}
                  className="px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center gap-2 shadow-brand transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept This Run</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
