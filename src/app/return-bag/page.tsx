"use client";

import React, { useState } from "react";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReturnBagPage() {
  const [bagCount, setBagCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <RotateCcw className="w-4 h-4" />
          <span>Eco Sustainability Initiative</span>
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900 mt-1">
          Return-a-Bag Program
        </h1>
        <p className="text-xs text-forest-700 mt-1">
          Help keep Gogamukh clean and earn ₹3.00 instant credit per reusable paper bag
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl border border-emerald-300 p-8 text-center space-y-3 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-forest-900">Bag Return Request Logged</h3>
          <p className="text-xs text-forest-700 max-w-md mx-auto">
            Please hand over {bagCount} Gogamukh Online Mart branded paper bag(s) to our Tum-Tum driver when they arrive with your next order. Upon driver verification, ₹{bagCount * 3}.00 will be credited to your account!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-forest-900">
              Number of clean, reusable Gogamukh bags to return:
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={bagCount}
              onChange={(e) => setBagCount(parseInt(e.target.value) || 1)}
              className="w-full p-2.5 rounded-lg border border-forest-800/20 text-xs font-bold text-forest-900"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-sage-50 text-xs text-forest-800 space-y-1">
            <span className="font-bold">Estimated Credit:</span>
            <div className="text-lg font-bold text-emerald-700">₹{bagCount * 3}.00</div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-sm transition-all"
          >
            Submit Return Request
          </button>
        </form>
      )}
    </div>
  );
}
