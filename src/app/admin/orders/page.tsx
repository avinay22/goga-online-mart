"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, KeyRound, Truck, ArrowRight } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders } = useMarketplace();

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Universal Orders Monitor
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Single source of truth tracking customer, merchant, and Tum-Tum driver dispatch
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-white rounded-2xl border border-forest-800/10 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-800/10 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-forest-900">{ord.order_number}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-muga-100 text-muga-800">
                    {ord.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="text-forest-600 mt-0.5">
                  Placed at {new Date(ord.placed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-lg bg-forest-900 text-muga-300 font-mono font-bold text-xs flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>OTP: {ord.delivery_otp}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-forest-900">{formatPrice(ord.total_payable)}</div>
                  <div className="text-[10px] text-forest-600">Subtotal: {formatPrice(ord.subtotal_amount)}</div>
                </div>
              </div>
            </div>

            {/* Split breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs p-3 rounded-xl bg-sage-50/60 border border-forest-800/10">
              <div>
                <span className="text-[10px] text-forest-600 uppercase font-semibold">Seller Payable</span>
                <div className="font-bold text-forest-900">{formatPrice(ord.seller_payable_amount)}</div>
              </div>
              <div>
                <span className="text-[10px] text-forest-600 uppercase font-semibold">Platform Commission (2%)</span>
                <div className="font-bold text-emerald-800">{formatPrice(ord.platform_commission_amount)}</div>
              </div>
              <div>
                <span className="text-[10px] text-forest-600 uppercase font-semibold">Driver Payout</span>
                <div className="font-bold text-forest-900">{formatPrice(ord.driver_payout_amount)}</div>
              </div>
              <div>
                <span className="text-[10px] text-forest-600 uppercase font-semibold">Platform Margin</span>
                <div className="font-bold text-emerald-800">{formatPrice(ord.platform_delivery_margin)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-forest-700">
              <div>
                <strong>Shop:</strong> {ord.shop_name} • <strong>Customer:</strong> {ord.customer_name} ({ord.delivery_address.area_colony})
              </div>
              <Link
                href={`/orders/${ord.id}`}
                className="font-bold text-forest-800 hover:text-muga-600 flex items-center gap-1"
              >
                <span>Live View & Stepper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
