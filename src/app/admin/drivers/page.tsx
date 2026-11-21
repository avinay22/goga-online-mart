"use client";

import React from "react";
import { Truck, CheckCircle2, Star } from "lucide-react";

export default function AdminDriversPage() {
  const drivers = [
    { id: "drv-1", name: "Ramen Deka", vehicle: "Tum-Tum #AS-22-E-1049", upi: "9101033445@okaxis", status: "Online", rating: 4.9, runs: 28 },
    { id: "drv-2", name: "Bipul Konwar", vehicle: "Tum-Tum #AS-22-E-1092", upi: "bipul.konwar@ybl", status: "Offline", rating: 4.8, runs: 42 },
    { id: "drv-3", name: "Mukesh Hazarika", vehicle: "Tum-Tum #AS-22-E-1108", upi: "mukesh787056@paytm", status: "Online", rating: 5.0, runs: 19 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Tum-Tum Delivery Fleet
        </h1>
        <p className="text-xs text-forest-700 mt-0.5">
          Driver verification status, vehicle registration numbers, and live availability
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="divide-y divide-forest-800/10">
          {drivers.map((drv) => (
            <div key={drv.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-forest-900">{drv.name}</h4>
                  <span className="text-[11px] font-bold text-forest-700 bg-sage-100 px-2 py-0.5 rounded">
                    {drv.vehicle}
                  </span>
                </div>
                <div className="text-forest-600 mt-1">
                  Settlement UPI: <strong className="text-charcoal-900">{drv.upi}</strong>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Verified Driver Partner • {drv.runs} runs completed
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    drv.status === "Online"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  ● {drv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
