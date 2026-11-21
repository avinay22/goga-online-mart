"use client";

import React, { useState } from "react";
import { MOCK_DELIVERY_PRICING } from "@/lib/mock-data";
import { DeliveryPricingRule } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Sliders, CheckCircle2, ShieldCheck } from "lucide-react";

export default function DeliveryPricingAdminPage() {
  const [pricingRules, setPricingRules] = useState<DeliveryPricingRule[]>(MOCK_DELIVERY_PRICING);
  const [savedNotice, setSavedNotice] = useState(false);

  const updateFee = (id: string, customerFee: number, driverPayout: number) => {
    setPricingRules((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              customer_fee: customerFee,
              driver_payout: driverPayout,
              platform_margin: customerFee - driverPayout,
            }
          : r
      )
    );
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Delivery Pricing Engine
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Define distance slabs, customer delivery fees, and guaranteed Tum-Tum driver payouts across Gogamukh
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Pricing rules updated successfully in system parameters.</span>
        </div>
      )}

      {/* Formula Card */}
      <div className="p-4 rounded-2xl bg-forest-900 text-ivory-100 flex items-center justify-between text-xs border border-muga-400/30">
        <div>
          <span className="font-bold text-muga-400 block uppercase tracking-wider text-[10px]">Margin Formula</span>
          <span className="font-mono text-white text-sm">Platform Delivery Margin = Customer Delivery Fee − Tum-Tum Driver Payout</span>
        </div>
      </div>

      {/* Slabs Configuration Table */}
      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="divide-y divide-forest-800/10">
          {pricingRules.map((slab) => (
            <div key={slab.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-forest-600 uppercase">
                  {slab.min_distance_km} km to {slab.max_distance_km} km
                </span>
                <h4 className="font-bold text-sm text-forest-900">
                  {slab.max_distance_km <= 1.5
                    ? "Short Town Run (Gogamukh Bazar Wards 1-3)"
                    : slab.max_distance_km <= 3.5
                    ? "Medium Distance (Station Road to Chauldhowa)"
                    : slab.max_distance_km <= 6.0
                    ? "Peripheral Cluster (Bordoibam & outward wards)"
                    : "Extended Rural Delivery"}
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-forest-600 block">Customer Fee</span>
                  <span className="font-bold text-forest-900 text-sm">{formatPrice(slab.customer_fee)}</span>
                </div>

                <div>
                  <span className="text-[10px] text-forest-600 block">Driver Payout</span>
                  <span className="font-bold text-forest-900 text-sm">{formatPrice(slab.driver_payout)}</span>
                </div>

                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold">
                  <span className="text-[10px] text-emerald-600 block">Platform Margin</span>
                  <span>{formatPrice(slab.platform_margin)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
