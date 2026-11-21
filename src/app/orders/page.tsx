"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Package, ArrowRight, Clock, Store, ChevronRight } from "lucide-react";

export default function OrdersHistoryPage() {
  const { orders } = useMarketplace();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Your Order History
        </h1>
        <p className="text-xs text-forest-700 mt-1">
          Track active deliveries and review previous purchases in Gogamukh
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-forest-800/10 space-y-3">
          <Package className="w-12 h-12 text-forest-400 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-forest-900">No Orders Yet</h3>
          <p className="text-xs text-forest-700">You haven't placed any orders in Gogamukh Mart yet.</p>
          <Link href="/" className="inline-block px-4 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isDelivered = order.status === "delivered";
            const isCancelled = order.status === "cancelled";

            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-white rounded-2xl border border-forest-800/10 hover:border-forest-800/30 p-5 shadow-sm hover:shadow-brand transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-800/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-forest-900">{order.order_number}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isDelivered
                            ? "bg-emerald-100 text-emerald-800"
                            : isCancelled
                            ? "bg-red-100 text-red-800"
                            : "bg-muga-100 text-muga-800"
                        }`}
                      >
                        {order.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="text-xs text-forest-700 mt-0.5">
                      {order.shop_name} • {order.items.length} items
                    </div>
                  </div>

                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                    <span className="font-bold text-base text-forest-900">{formatPrice(order.total_payable)}</span>
                    <span className="text-[11px] text-forest-600">
                      {new Date(order.placed_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs text-forest-800 font-semibold">
                  <span>Track Live Order & View OTP</span>
                  <ChevronRight className="w-4 h-4 text-forest-600" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
