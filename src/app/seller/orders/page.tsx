"use client";

import React, { useState, useEffect } from "react";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import {
  Clock,
  Check,
  X,
  PackageCheck,
  Truck,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function SellerOrdersPage() {
  const { orders, sellerAcceptOrder, sellerMarkReady, sellerCancelOrder } = useMarketplace();

  // 5-minute countdown clock simulation for fresh orders
  const [timeLeft, setTimeLeft] = useState(285); // 4m 45s

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Live Orders Queue
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Accept orders within 5 minutes, pack with Gogamukh Online Mart stickers, and mark ready for Tum-Tum pickup
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isPlaced = order.status === "placed" || order.status === "waiting_shop_approval";
          const isAccepted = order.status === "accepted";
          const isReady = order.status === "ready_for_pickup";
          const isDelivered = order.status === "delivered";
          const isCancelled = order.status === "cancelled";

          return (
            <div
              key={order.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all ${
                isPlaced ? "border-terracotta ring-1 ring-terracotta/40" : "border-forest-800/10"
              }`}
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-800/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-forest-900">{order.order_number}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isPlaced
                          ? "bg-terracotta/20 text-terracotta-700 animate-pulse"
                          : isDelivered
                          ? "bg-emerald-100 text-emerald-800"
                          : isCancelled
                          ? "bg-red-100 text-red-800"
                          : "bg-muga-100 text-muga-800"
                      }`}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="text-xs text-forest-700 mt-1">
                    Customer: <strong className="text-charcoal-900">{order.customer_name}</strong> ({order.customer_phone})
                  </div>
                </div>

                {/* 5-Min SLA Timer for Unaccepted Orders */}
                {isPlaced && (
                  <div className="flex items-center gap-2 bg-terracotta/10 px-3 py-1.5 rounded-lg border border-terracotta/30 text-terracotta-700">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-bold font-mono">
                      Accept in {formatCountdown(timeLeft)}
                    </span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="divide-y divide-forest-800/5 text-xs">
                {order.items.map((item) => (
                  <div key={item.id} className="py-2 flex justify-between">
                    <div>
                      <span className="font-semibold text-charcoal-900">{item.product_name}</span>
                      <span className="text-forest-600 ml-1.5">× {item.quantity}</span>
                    </div>
                    <span className="font-bold text-forest-900">{formatPrice(item.total_price)}</span>
                  </div>
                ))}
              </div>

              {order.special_instructions && (
                <div className="p-2.5 rounded-lg bg-sage-50 text-[11px] text-forest-800 flex items-start gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-forest-600 mt-0.5 shrink-0" />
                  <span><strong>Customer Note:</strong> {order.special_instructions}</span>
                </div>
              )}

              {/* Packaging Checklist reminder */}
              <div className="text-[11px] text-forest-600 font-medium">
                🏷️ Reminder: Attach the official Gogamukh Online Mart sticker to the paper bag.
              </div>

              {/* Action Buttons based on state */}
              <div className="pt-3 border-t border-forest-800/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-forest-800">
                  Seller Payout: <strong className="font-bold text-forest-900">{formatPrice(order.seller_payable_amount)}</strong>
                  <span className="text-[10px] text-forest-600 ml-1">(after 2% commission)</span>
                </div>

                <div className="flex items-center gap-2">
                  {isPlaced && (
                    <>
                      <button
                        onClick={() => sellerCancelOrder(order.id, "Item currently out of stock")}
                        className="px-3 py-2 rounded-lg border border-red-300 text-red-700 font-semibold text-xs hover:bg-red-50 transition-colors"
                      >
                        Reject / Out of Stock
                      </button>
                      <button
                        onClick={() => sellerAcceptOrder(order.id)}
                        className="px-4 py-2 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept Order</span>
                      </button>
                    </>
                  )}

                  {isAccepted && (
                    <button
                      onClick={() => sellerMarkReady(order.id)}
                      className="px-4 py-2 rounded-lg bg-muga-500 hover:bg-muga-600 text-forest-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Mark Ready for Pickup (Dispatch Tum-Tum)</span>
                    </button>
                  )}

                  {isReady && (
                    <span className="text-xs font-semibold text-forest-700 flex items-center gap-1.5 bg-sage-100 px-3 py-1.5 rounded-lg">
                      <Truck className="w-4 h-4 text-forest-800 animate-bounce" />
                      <span>Broadcasting to local Tum-Tum drivers (90s window)...</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
