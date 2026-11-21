"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Truck, CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";

export default function DriverOnboardingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Truck className="w-3.5 h-3.5" />
          <span>Tum-Tum Driver Partner Network</span>
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900 mt-2">
          Join the Gogamukh Delivery Fleet
        </h1>
        <p className="text-xs text-forest-700 mt-1">
          Work on your own schedule with your e-rickshaw / Tum-Tum. Registration fee: ₹99 one-time.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl border border-emerald-300 p-8 text-center space-y-3 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-forest-900">Application Submitted!</h3>
          <p className="text-xs text-forest-700">
            Our Gogamukh team will review your vehicle details and documents. You will be activated within 24 hours.
          </p>
          <Link
            href="/driver/dashboard"
            className="inline-block px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold mt-2"
          >
            Go to Driver Dashboard
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-forest-900">Full Name</label>
            <input
              type="text"
              required
              defaultValue="Ramen Deka"
              className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-forest-900">Tum-Tum Vehicle Registration Number</label>
            <input
              type="text"
              required
              defaultValue="AS-22-E-1049"
              className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-forest-900">UPI ID for Next-Morning Settlements</label>
            <input
              type="text"
              required
              defaultValue="9101033445@okaxis"
              className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs text-forest-900"
            />
          </div>

          <div className="p-3 rounded-xl bg-sage-50 text-xs text-forest-800 space-y-1">
            <span className="font-bold">Registration Fee:</span>
            <div className="text-sm font-bold text-forest-900">₹99.00 (One-Time Driver Verification)</div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-brand transition-all"
          >
            Pay ₹99 & Submit Verification
          </button>
        </form>
      )}
    </div>
  );
}
