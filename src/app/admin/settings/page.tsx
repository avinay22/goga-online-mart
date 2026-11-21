"use client";

import React, { useState } from "react";
import { Settings, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          System Rules & SLAs
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Configure operational parameters, timeouts, and reward thresholds without code changes
        </p>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>System configuration saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-forest-900">
            Shop Acceptance Timeout (Minutes)
          </label>
          <input
            type="number"
            defaultValue={5}
            className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
          />
          <p className="text-[11px] text-forest-600">Unaccepted orders auto-cancel and refund after this period.</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-forest-900">
            Driver Broadcast Timeout (Seconds)
          </label>
          <input
            type="number"
            defaultValue={90}
            className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
          />
          <p className="text-[11px] text-forest-600">Time nearby Tum-Tum drivers have to accept a delivery request.</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-forest-900">
            5-Delivery Free Delivery Loop (Target Orders)
          </label>
          <input
            type="number"
            defaultValue={5}
            className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-forest-900">
            Return-a-Bag Credit Amount (₹ per bag)
          </label>
          <input
            type="number"
            step="0.5"
            defaultValue={3.0}
            className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-sm transition-all"
        >
          Save System Configuration
        </button>
      </form>
    </div>
  );
}
