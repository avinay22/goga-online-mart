"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";
import { IndianRupee, CheckCircle2, ShieldCheck } from "lucide-react";

export default function DriverEarningsPage() {
  const settlements = [
    { id: "drv-set-1", date: "2026-11-20", runs: 8, total: 245, status: "Paid to UPI (9101033445@okaxis)" },
    { id: "drv-set-2", date: "2026-11-19", runs: 11, total: 340, status: "Paid to UPI (9101033445@okaxis)" },
    { id: "drv-set-3", date: "2026-11-18", runs: 7, total: 215, status: "Paid to UPI (9101033445@okaxis)" },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Tum-Tum Driver Earnings
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Guaranteed per-distance delivery rates paid every morning via direct UPI transfer
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 bg-sage-50/50 border-b border-forest-800/10 font-bold text-xs uppercase text-forest-800">
          Next-Morning Payout History
        </div>

        <div className="divide-y divide-forest-800/10">
          {settlements.map((s) => (
            <div key={s.id} className="p-4 sm:p-5 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-forest-900">{s.date} Batch</div>
                <div className="text-forest-600 text-[11px] mt-0.5">
                  {s.runs} deliveries completed in Gogamukh
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-base text-forest-900">{formatPrice(s.total)}</div>
                <div className="text-[10px] text-emerald-700 font-semibold">{s.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
