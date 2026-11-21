"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { OrderStatus } from "@/types";
import { formatPrice } from "@/lib/utils";
import {
  Clock,
  CheckCircle2,
  Store,
  Truck,
  MapPin,
  KeyRound,
  Phone,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const {
    orders,
    sellerAcceptOrder,
    sellerMarkReady,
    driverAcceptBroadcast,
    driverConfirmPickup,
    driverCompleteDelivery,
  } = useMarketplace();

  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-forest-900">Order Not Found</h2>
        <p className="text-xs text-forest-700">The order reference could not be located.</p>
        <Link href="/orders" className="inline-block px-4 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold">
          View My Orders
        </Link>
      </div>
    );
  }

  // Visual status lifecycle steps
  const steps: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
    { key: "placed", label: "Placed", icon: <Clock className="w-4 h-4" /> },
    { key: "accepted", label: "Accepted by Shop", icon: <Store className="w-4 h-4" /> },
    { key: "ready_for_pickup", label: "Packed & Ready", icon: <CheckCircle2 className="w-4 h-4" /> },
    { key: "driver_assigned", label: "Tum-Tum Assigned", icon: <Truck className="w-4 h-4" /> },
    { key: "picked_up", label: "On the Way", icon: <Truck className="w-4 h-4" /> },
    { key: "delivered", label: "Delivered", icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const getStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case "placed":
      case "payment_confirmed":
      case "waiting_shop_approval":
        return 0;
      case "accepted":
      case "preparing":
        return 1;
      case "ready_for_pickup":
        return 2;
      case "driver_assigned":
        return 3;
      case "picked_up":
      case "on_the_way":
        return 4;
      case "delivered":
        return 5;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.status);
  const isDelivered = order.status === "delivered";
  const isCancelled = order.status === "cancelled";

  const handleVerifyOtp = () => {
    const res = driverCompleteDelivery(order.id, otpInput);
    if (!res.success) {
      setOtpError(res.error || "Invalid OTP");
    } else {
      setOtpError(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-800/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
              Order {order.order_number}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isDelivered
                  ? "bg-emerald-100 text-emerald-800"
                  : isCancelled
                  ? "bg-red-100 text-red-800"
                  : "bg-muga-100 text-muga-800"
              }`}
            >
              {order.status.replace(/_/g, " ")}
            </span>
          </div>
          <p className="text-xs text-forest-700 mt-1">
            Placed on {new Date(order.placed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Gogamukh Express Dispatch
          </p>
        </div>

        <Link
          href="/orders"
          className="text-xs font-semibold text-forest-800 hover:text-forest-900"
        >
          ← All Orders
        </Link>
      </div>

      {/* 4-Digit Delivery OTP Card */}
      {!isDelivered && !isCancelled && (
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-ivory-100 rounded-2xl p-6 shadow-brand flex flex-col sm:flex-row items-center justify-between gap-6 border border-muga-400/30">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-muga-400/20 text-muga-300 text-xs font-bold">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Customer Verification Code</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-white">Your Delivery OTP</h3>
            <p className="text-xs text-forest-200">
              Share this 4-digit code with your Tum-Tum driver only after receiving your items.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 text-center">
            <span className="font-mono font-extrabold text-3xl tracking-widest text-muga-400">
              {order.delivery_otp}
            </span>
          </div>
        </div>
      )}

      {/* Stepper Progress Visualizer */}
      <div className="bg-white rounded-2xl border border-forest-800/10 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-serif font-bold text-lg text-forest-900">Live Delivery Progress</h3>

        {/* Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {steps.map((s, idx) => {
            const isCompleted = currentStepIdx >= idx && !isCancelled;
            const isCurrent = currentStepIdx === idx && !isCancelled;

            return (
              <div key={s.key} className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-muga-400 text-forest-950 ring-4 ring-muga-200 font-bold shadow-md"
                      : isCompleted
                      ? "bg-forest-800 text-white"
                      : "bg-sage-100 text-forest-400"
                  }`}
                >
                  {s.icon}
                </div>
                <span
                  className={`text-xs font-semibold leading-tight ${
                    isCurrent ? "text-forest-900 font-bold" : isCompleted ? "text-forest-800" : "text-forest-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Simulated State Progression Simulator for Reviewers */}
        {!isDelivered && !isCancelled && (
          <div className="p-4 rounded-xl bg-sage-50 border border-forest-800/15 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-forest-900">
              <span className="flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-muga-600" />
                <span>Simulation Controls (Test Real-Time Flow):</span>
              </span>
              <span className="text-[10px] text-forest-600 font-normal">Click to trigger next role's action</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {order.status === "placed" && (
                <button
                  onClick={() => sellerAcceptOrder(order.id)}
                  className="px-3 py-1.5 rounded-lg bg-forest-800 text-white font-semibold hover:bg-forest-900"
                >
                  Seller: Accept Order (Within 5 mins)
                </button>
              )}

              {order.status === "accepted" && (
                <button
                  onClick={() => sellerMarkReady(order.id)}
                  className="px-3 py-1.5 rounded-lg bg-forest-800 text-white font-semibold hover:bg-forest-900"
                >
                  Seller: Pack & Mark Ready for Pickup
                </button>
              )}

              {order.status === "ready_for_pickup" && (
                <button
                  onClick={() => driverAcceptBroadcast(order.id)}
                  className="px-3 py-1.5 rounded-lg bg-muga-500 text-forest-950 font-bold hover:bg-muga-600"
                >
                  Tum-Tum Driver: Accept 90s Broadcast
                </button>
              )}

              {order.status === "driver_assigned" && (
                <button
                  onClick={() => driverConfirmPickup(order.id)}
                  className="px-3 py-1.5 rounded-lg bg-forest-800 text-white font-semibold hover:bg-forest-900"
                >
                  Tum-Tum Driver: Confirm Pickup from Shop
                </button>
              )}

              {order.status === "picked_up" && (
                <div className="flex items-center gap-2 w-full pt-1">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Enter 4-digit customer OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="p-1.5 text-xs rounded border border-forest-800/30 w-44 font-mono font-bold"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 text-xs"
                  >
                    Driver: Verify OTP & Complete
                  </button>
                </div>
              )}
            </div>

            {otpError && (
              <div className="text-xs text-red-600 font-semibold">{otpError}</div>
            )}
          </div>
        )}
      </div>

      {/* Driver Information Card (When assigned) */}
      {order.driver_name && (
        <div className="bg-white rounded-2xl border border-forest-800/10 p-5 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-800">
              <Truck className="w-6 h-6 text-forest-800" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-forest-600 uppercase">Assigned Tum-Tum Partner</div>
              <div className="font-serif font-bold text-base text-charcoal-900">{order.driver_name}</div>
              <div className="text-xs text-forest-700">{order.driver_vehicle}</div>
            </div>
          </div>

          <a
            href={`tel:${order.driver_phone}`}
            className="px-3 py-2 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Driver</span>
          </a>
        </div>
      )}

      {/* Order Details & Summary */}
      <div className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-900 pb-3 border-b border-forest-800/10">
          Items Ordered from {order.shop_name}
        </h3>

        <div className="divide-y divide-forest-800/5">
          {order.items.map((item) => (
            <div key={item.id} className="py-2.5 flex justify-between text-xs">
              <div>
                <span className="font-medium text-charcoal-900">{item.product_name}</span>
                <span className="text-forest-600 ml-1">× {item.quantity}</span>
              </div>
              <span className="font-semibold text-charcoal-900">{formatPrice(item.total_price)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-forest-800/10 space-y-2 text-xs">
          <div className="flex justify-between text-forest-700">
            <span>Item Subtotal</span>
            <span className="font-semibold text-charcoal-900">{formatPrice(order.subtotal_amount)}</span>
          </div>
          <div className="flex justify-between text-forest-700">
            <span>Delivery Fee</span>
            <span className="font-semibold text-charcoal-900">{formatPrice(order.delivery_fee)}</span>
          </div>
          <div className="pt-2 border-t border-forest-800/10 flex justify-between text-base font-bold text-forest-900">
            <span>Total Paid</span>
            <span>{formatPrice(order.total_payable)}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-forest-800/10 text-xs text-forest-700">
          <strong>Delivering to:</strong> {order.delivery_address.recipient_name}, {order.delivery_address.address_line1}, {order.delivery_address.area_colony}
        </div>
      </div>
    </div>
  );
}
