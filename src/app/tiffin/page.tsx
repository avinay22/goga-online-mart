"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_TIFFIN_PLANS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import {
  UtensilsCrossed,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Pause,
  AlertCircle,
} from "lucide-react";

export default function TiffinPage() {
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubscribe = (planId: string, planName: string) => {
    setSubscribedPlan(planId);
    setSuccessNotice(`Successfully subscribed to ${planName}! Deliveries will commence tomorrow at 12:00 PM.`);
    setTimeout(() => setSuccessNotice(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Hero Header */}
      <div className="bg-forest-900 text-ivory-100 rounded-3xl p-6 sm:p-10 shadow-brand relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muga-400 text-forest-950 text-xs font-bold uppercase tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Gogamukh Daily Tiffin Service</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white leading-tight">
            Fresh, Homestyle Assamese Meals at Your Doorstep
          </h1>
          <p className="text-xs sm:text-sm text-forest-200 leading-relaxed font-light">
            Designed for local bank officers, teachers, students, and busy families in Gogamukh. Delicious rotating menus, authentic recipes, and flexible pause/skip options.
          </p>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Tiffin Plans */}
      <div className="space-y-6">
        <div className="border-b border-forest-800/10 pb-3">
          <h2 className="font-serif font-bold text-2xl text-forest-900">
            Available Subscription Plans
          </h2>
          <p className="text-xs text-forest-700 mt-0.5">
            Prepared fresh by verified Gogamukh restaurants and delivered promptly by Tum-Tum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TIFFIN_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl border border-forest-800/10 hover:border-forest-800/30 overflow-hidden shadow-sm hover:shadow-brand transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-sage-50">
                  <Image
                    src={plan.image_url}
                    alt={plan.plan_name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-forest-900/90 text-muga-400 text-xs font-bold">
                    {plan.duration_days} Days Plan
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[11px] font-bold text-forest-600 uppercase">
                    By {plan.shop_name}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-forest-900">
                    {plan.plan_name}
                  </h3>
                  <p className="text-xs text-forest-700 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="pt-3 border-t border-forest-800/10 grid grid-cols-2 gap-2 text-xs text-forest-800">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-forest-600" />
                      <span>{plan.delivery_window}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-forest-600" />
                      <span>Pause or Skip Anytime</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-sage-50/50 border-t border-forest-800/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-forest-600 uppercase font-semibold">Total Subscription Price</div>
                  <div className="font-serif font-bold text-2xl text-forest-900">
                    {formatPrice(plan.price)}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold">
                    ~{formatPrice(Math.round(plan.price / plan.duration_days))} per meal
                  </div>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id, plan.plan_name)}
                  className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-sm transition-all"
                >
                  {subscribedPlan === plan.id ? "Subscribed!" : "Subscribe Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
