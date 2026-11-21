"use client";

import React from "react";
import { useMarketplace } from "@/lib/store";
import { User, MapPin, Phone, ShieldCheck, UserCheck } from "lucide-react";

export default function ProfilePage() {
  const { currentUser, selectedAddress, savedAddresses, gogoPoints, completedDeliveriesCount } = useMarketplace();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <div className="border-b border-forest-800/10 pb-4">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          My Account
        </h1>
        <p className="text-xs text-forest-700 mt-1">
          Profile, delivery addresses, and local reward settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center text-forest-800 font-bold text-xl">
            {currentUser.full_name.charAt(0)}
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-forest-900">{currentUser.full_name}</h3>
            <span className="text-xs text-forest-600 block">{currentUser.phone_number}</span>
            <span className="inline-block mt-2 px-2 py-0.5 rounded bg-sage-200 text-forest-800 text-[10px] uppercase font-bold">
              {currentUser.role.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Addresses & Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-forest-800/10 p-6 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-base text-forest-900 pb-2 border-b border-forest-800/10">
              Saved Delivery Addresses
            </h3>
            <div className="space-y-2">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="p-3 rounded-xl border border-forest-800/10 text-xs">
                  <div className="font-bold text-forest-900">{addr.recipient_name} ({addr.address_type})</div>
                  <div className="text-forest-700">{addr.address_line1}, {addr.area_colony}</div>
                  <div className="text-[11px] text-forest-600">Pincode: {addr.pincode} • Phone: {addr.phone_number}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
