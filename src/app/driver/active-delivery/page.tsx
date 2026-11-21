"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import {
  Navigation,
  MapPin,
  Store,
  Phone,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function DriverActiveDeliveryPage() {
  const { orders, driverConfirmPickup, driverCompleteDelivery } = useMarketplace();
  const [otpInput, setOtpInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const activeOrder = orders.find((o) => ["driver_assigned", "picked_up"].includes(o.status));

  if (!activeOrder) {
    return (
      <div className="bg-white rounded-2xl border border-forest-800/10 p-12 text-center space-y-4 shadow-sm">
        <Navigation className="w-10 h-10 text-forest-400 mx-auto" />
        <h3 className="font-serif font-bold text-xl text-forest-900">No Active Run</h3>
        <p className="text-xs text-forest-700">You do not currently have any assigned deliveries.</p>
        <Link
          href="/driver/requests"
          className="inline-block px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold"
        >
          Check Broadcast Radar
        </Link>
      </div>
    );
  }

  const isPickedUp = activeOrder.status === "picked_up";

  const handleVerifyOtp = () => {
    setErrorMsg(null);
    const res = driverCompleteDelivery(activeOrder.id, otpInput);
    if (!res.success) {
      setErrorMsg(res.error || "Invalid OTP code");
    } else {
      setSuccessMsg("Delivery confirmed successfully! Your earnings have been credited to tomorrow morning's settlement.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-forest-800/10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
            Active Delivery Run
          </h1>
          <p className="text-xs text-forest-700 mt-0.5">
            Order {activeOrder.order_number} • Guaranteed Payout: <strong className="text-forest-900">{formatPrice(activeOrder.driver_payout_amount)}</strong>
          </p>
        </div>
      </div>

      {successMsg ? (
        <div className="bg-white rounded-2xl border border-emerald-300 p-8 text-center space-y-3 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-forest-900">Run Successfully Completed!</h3>
          <p className="text-xs text-forest-700">{successMsg}</p>
          <Link
            href="/driver/dashboard"
            className="inline-block px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold mt-2"
          >
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Step 1: Pickup at Shop */}
          <div
            className={`bg-white rounded-2xl border p-5 shadow-sm space-y-3 transition-all ${
              !isPickedUp ? "border-forest-800 ring-2 ring-forest-800/30" : "border-forest-800/10 opacity-70"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-forest-800/10">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-forest-800" />
                <h3 className="font-serif font-bold text-base text-forest-900">Step 1: Pick Up from Shop</h3>
              </div>
              {isPickedUp ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  ✓ Collected
                </span>
              ) : (
                <span className="text-[10px] font-bold text-muga-800 bg-muga-100 px-2 py-0.5 rounded">
                  Action Required
                </span>
              )}
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-charcoal-900">{activeOrder.shop_name}</div>
              <div className="text-forest-700">{activeOrder.shop_address}</div>
            </div>

            {!isPickedUp && (
              <div className="pt-2">
                <button
                  onClick={() => driverConfirmPickup(activeOrder.id)}
                  className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-sm transition-all"
                >
                  I Have Reached Shop & Collected Packed Bag
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Navigate to Customer & Verify OTP */}
          <div
            className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all ${
              isPickedUp ? "border-emerald-600 ring-2 ring-emerald-600/30" : "border-forest-800/10 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-forest-800/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <h3 className="font-serif font-bold text-base text-forest-900">Step 2: Deliver to Customer</h3>
              </div>
              <span className="text-[10px] font-bold text-forest-700 bg-sage-200 px-2 py-0.5 rounded">
                Final Step
              </span>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-charcoal-900">{activeOrder.delivery_address.recipient_name}</div>
              <div className="text-forest-700">
                {activeOrder.delivery_address.address_line1}, {activeOrder.delivery_address.area_colony}
              </div>
              {activeOrder.delivery_address.landmark && (
                <div className="text-[11px] text-forest-600">Landmark: {activeOrder.delivery_address.landmark}</div>
              )}
              {activeOrder.special_instructions && (
                <div className="p-2.5 rounded-lg bg-sage-50 text-[11px] text-forest-800 mt-2">
                  <strong>Instructions:</strong> {activeOrder.special_instructions}
                </div>
              )}
            </div>

            {/* OTP Verification Gate */}
            {isPickedUp && (
              <div className="pt-3 border-t border-forest-800/10 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
                  <KeyRound className="w-4 h-4 text-muga-600" />
                  <span>Enter 4-Digit Customer OTP:</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. 5821"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="p-3 text-lg font-mono font-bold tracking-widest text-center rounded-xl border border-forest-800/30 w-36 focus:outline-none focus:ring-2 focus:ring-forest-800/30"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-brand transition-all"
                  >
                    Verify & Confirm Handover
                  </button>
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
