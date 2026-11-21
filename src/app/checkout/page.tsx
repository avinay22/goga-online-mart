"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import {
  MapPin,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  AlertCircle,
  FileText,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    selectedAddress,
    savedAddresses,
    setSelectedAddress,
    createOrder,
  } = useMarketplace();

  const [instructions, setInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "upi_qr">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-forest-900">Your Cart is Empty</h2>
        <Link href="/" className="inline-block px-4 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold">
          Return to Mart
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setErrorMsg(null);

    // Simulate verified Razorpay transaction processing
    await new Promise((r) => setTimeout(r, 1200));

    const result = await createOrder(instructions);
    setIsProcessing(false);

    if (result.success && result.orderId) {
      router.push(`/orders/${result.orderId}`);
    } else {
      setErrorMsg(result.error || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Title */}
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Complete Your Order
        </h1>
        <p className="text-xs text-forest-700 mt-1">
          Review delivery details, instructions, and finalize payment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Delivery & Payment Details */}
        <div className="md:col-span-7 space-y-6">
          {/* Step 1: Delivery Location */}
          <div className="bg-white rounded-2xl border border-forest-800/10 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-forest-800/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest-800" />
                <h3 className="font-serif font-bold text-base text-forest-900">Delivery Address</h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Gogamukh Town Hub
              </span>
            </div>

            <div className="space-y-2">
              {savedAddresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-forest-50 border-forest-800 ring-1 ring-forest-800"
                        : "bg-white border-forest-800/10 hover:border-forest-800/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-forest-900">{addr.recipient_name} ({addr.address_type})</div>
                      <span className="text-[11px] text-forest-600">{addr.phone_number}</span>
                    </div>
                    <div className="text-xs text-forest-800 mt-1">{addr.address_line1}, {addr.area_colony}</div>
                    {addr.landmark && (
                      <div className="text-[11px] text-forest-600 mt-0.5">Landmark: {addr.landmark}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Delivery Instructions */}
          <div className="bg-white rounded-2xl border border-forest-800/10 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-forest-800/10">
              <FileText className="w-4 h-4 text-forest-800" />
              <h3 className="font-serif font-bold text-base text-forest-900">Driver Instructions</h3>
            </div>
            <textarea
              rows={2}
              placeholder="e.g. Near green gate, call once at SBI turn, leave at front porch..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 rounded-lg border border-forest-800/20 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/30"
            />
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-2xl border border-forest-800/10 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-forest-800/10">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-forest-800" />
                <h3 className="font-serif font-bold text-base text-forest-900">Payment Gateway</h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-forest-600 bg-sage-200 px-2 py-0.5 rounded">
                Razorpay Sandbox
              </span>
            </div>

            <div className="space-y-2">
              <label
                onClick={() => setPaymentMethod("razorpay")}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "razorpay"
                    ? "bg-forest-50 border-forest-800 ring-1 ring-forest-800"
                    : "bg-white border-forest-800/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="accent-forest-800"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-forest-900 block">Instant UPI & Cards</span>
                    <span className="text-forest-600 text-[11px]">Google Pay, PhonePe, Paytm, RuPay, Cards & NetBanking</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">Verified</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Button */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-forest-900 pb-3 border-b border-forest-800/10">
              Order Review
            </h3>

            {/* Items summary */}
            <div className="divide-y divide-forest-800/5 max-h-48 overflow-y-auto space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex justify-between text-xs">
                  <div className="truncate pr-2">
                    <span className="font-medium text-charcoal-900">{item.product.name}</span>
                    <span className="text-forest-600 ml-1">× {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-charcoal-900 shrink-0">
                    {formatPrice((item.variant ? item.variant.selling_price : item.product.selling_price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-forest-800/10 space-y-2 text-xs">
              <div className="flex justify-between text-forest-700">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-forest-700">
                <span>Tum-Tum Delivery Fee</span>
                <span className="font-semibold text-charcoal-900">{formatPrice(deliveryFee)}</span>
              </div>
              <div className="pt-2 border-t border-forest-800/10 flex justify-between text-base font-bold text-forest-900">
                <span>Total Amount</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-terracotta/10 border border-terracotta/30 text-xs text-terracotta-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="flex-1">{errorMsg}</span>
              </div>
            )}

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-brand transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Confirming Payment & Reserving Stock...</span>
              ) : (
                <>
                  <span>Pay {formatPrice(cartTotal)} & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="p-2.5 rounded-lg bg-sage-50 text-[11px] text-forest-700 leading-tight text-center">
              🔒 5-Minute Merchant Acceptance SLA • Instant refund if shop does not confirm.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
