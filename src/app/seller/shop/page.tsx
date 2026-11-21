"use client";

import React, { useState } from "react";
import { Store, Clock, MapPin, Phone } from "lucide-react";

export default function SellerShopPage() {
  const [status, setStatus] = useState<"open" | "busy" | "closed">("open");

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Shop Profile & Operating Hours
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Public profile visible to Gogamukh shoppers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-forest-900">Shop Name</label>
          <input
            type="text"
            defaultValue="Brahmaputra Organic Bhandar"
            className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-forest-900">Description</label>
          <textarea
            rows={3}
            defaultValue="Fresh local produce, authentic Joha rice, cold-pressed mustard oil, and daily kitchen staples from Dhemaji farmers."
            className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-forest-900">Opening Time</label>
            <input
              type="time"
              defaultValue="07:30"
              className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-forest-900">Closing Time</label>
            <input
              type="time"
              defaultValue="20:30"
              className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-forest-900">Address & Landmark</label>
          <input
            type="text"
            defaultValue="Shop #14, Main Daily Market, Gogamukh Bazar (Opposite SBI)"
            className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
          />
        </div>

        <button className="px-6 py-2.5 rounded-xl bg-forest-800 text-white font-bold text-xs hover:bg-forest-900 transition-colors">
          Update Shop Details
        </button>
      </div>
    </div>
  );
}
