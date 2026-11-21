"use client";

import React from "react";
import { MOCK_CHAMPIONS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Trophy, Medal, Award, ShieldCheck } from "lucide-react";

export default function ChampionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="border-b border-forest-800/10 pb-4">
        <div className="flex items-center gap-2 text-muga-600 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4" />
          <span>Local Community Leaderboard</span>
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900 mt-1">
          Gogamukh Shopping Champions
        </h1>
        <p className="text-xs text-forest-700 mt-1">
          Celebrating local residents who actively support Gogamukh shops and Tum-Tum delivery partners
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-6 bg-sage-50/50 border-b border-forest-800/10 flex items-center justify-between">
          <span className="font-bold text-xs uppercase text-forest-800">Weekly Top Shoppers</span>
          <span className="text-[11px] text-forest-600">Updated today</span>
        </div>

        <div className="divide-y divide-forest-800/5">
          {MOCK_CHAMPIONS.map((champ) => {
            return (
              <div key={champ.rank_position} className="p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      champ.rank_position === 1
                        ? "bg-muga-400 text-forest-950 ring-2 ring-muga-200 shadow-sm"
                        : champ.rank_position === 2
                        ? "bg-slate-200 text-charcoal-800"
                        : champ.rank_position === 3
                        ? "bg-amber-600 text-white"
                        : "bg-sage-100 text-forest-800"
                    }`}
                  >
                    {champ.rank_position}
                  </span>

                  <div>
                    <h4 className="font-semibold text-sm text-charcoal-900">{champ.user_name}</h4>
                    <span className="text-xs text-forest-600">{champ.area}, Gogamukh</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-xs sm:text-sm text-forest-900">
                    {champ.qualifying_orders_count} orders completed
                  </div>
                  <div className="text-[11px] text-forest-600">
                    {formatPrice(champ.total_spend)} total spend
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
