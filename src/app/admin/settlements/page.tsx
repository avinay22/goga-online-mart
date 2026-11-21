"use client";

import React, { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { IndianRupee, CheckCircle2, Play } from "lucide-react";

export default function AdminSettlementsPage() {
  const [batchExecuted, setBatchExecuted] = useState(false);

  const handleRunBatch = () => {
    setBatchExecuted(true);
    setTimeout(() => setBatchExecuted(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
            Daily Batch Settlements
          </h1>
          <p className="text-xs text-forest-700 mt-0.5">
            Automated double-entry reconciliation and payout generation for merchants and Tum-Tum drivers
          </p>
        </div>

        <button
          onClick={handleRunBatch}
          className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
        >
          <Play className="w-4 h-4" />
          <span>Execute Daily Payout Batch</span>
        </button>
      </div>

      {batchExecuted && (
        <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Settlement batch triggered successfully! 3 merchant and 3 driver UPI payouts queued for bank processing.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Merchant Payouts */}
        <div className="bg-white rounded-2xl border border-forest-800/10 p-5 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-base text-forest-900 pb-2 border-b border-forest-800/10">
            Merchant Payables Ready
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-forest-800/5">
              <span>Brahmaputra Organic Bhandar</span>
              <strong className="text-forest-900">{formatPrice(1421.00)}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-forest-800/5">
              <span>Gogamukh Desi Dhaba & Tiffin</span>
              <strong className="text-forest-900">{formatPrice(2234.40)}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Sanjivani Medicos</span>
              <strong className="text-forest-900">{formatPrice(960.40)}</strong>
            </div>
          </div>
        </div>

        {/* Tum-Tum Driver Payouts */}
        <div className="bg-white rounded-2xl border border-forest-800/10 p-5 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-base text-forest-900 pb-2 border-b border-forest-800/10">
            Driver Payables (Morning Run)
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-forest-800/5">
              <span>Ramen Deka (8 runs)</span>
              <strong className="text-emerald-800">{formatPrice(245.00)}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-forest-800/5">
              <span>Bipul Konwar (11 runs)</span>
              <strong className="text-emerald-800">{formatPrice(340.00)}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Mukesh Hazarika (7 runs)</span>
              <strong className="text-emerald-800">{formatPrice(215.00)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
