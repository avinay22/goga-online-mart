"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";
import { IndianRupee, Download, CheckCircle2, ShieldCheck } from "lucide-react";

export default function SellerFinancePage() {
  const settlementRecords = [
    { id: "set-1", date: "2026-11-20", gross: 1450, commission: 29, net: 1421, status: "Transferred via UPI" },
    { id: "set-2", date: "2026-11-19", gross: 2280, commission: 45.6, net: 2234.4, status: "Transferred via UPI" },
    { id: "set-3", date: "2026-11-18", gross: 980, commission: 19.6, net: 960.4, status: "Transferred via UPI" },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
            Finance & Daily Settlements
          </h1>
          <p className="text-xs text-forest-700 mt-0.5">
            Transparent double-entry payouts, category commission breakdown, and UPI settlement records
          </p>
        </div>
      </div>

      {/* 30-Day Commission Exemption Banner */}
      <div className="p-4 rounded-2xl bg-muga-50 border border-muga-300/60 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muga-800 bg-muga-200 px-2 py-0.5 rounded">
            Introductory Benefit
          </span>
          <h4 className="font-serif font-bold text-base text-forest-900 mt-1">
            0% Commission Grace Period Active
          </h4>
          <p className="text-xs text-forest-700">
            Your first 30 days are 100% free of platform commissions. Standard category commission (1%–3%) applies afterwards.
          </p>
        </div>
      </div>

      {/* Daily Settlement Records Table */}
      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 bg-sage-50/50 border-b border-forest-800/10 font-bold text-xs uppercase text-forest-800">
          Daily Bank & UPI Settlement Records
        </div>

        <div className="divide-y divide-forest-800/10">
          {settlementRecords.map((rec) => (
            <div key={rec.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-forest-900">{rec.date} Daily Run</div>
                <div className="text-forest-600 text-[11px] mt-0.5">
                  Gross Sales: {formatPrice(rec.gross)} • Platform Commission: {formatPrice(rec.commission)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-sm text-forest-900">{formatPrice(rec.net)}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">{rec.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
