"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store";
import {
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  UtensilsCrossed,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import {
  MasterJaapiGamusaCrest,
  AuthenticGamusaBanner,
} from "@/components/brand/AssameseMotifs";

export default function Header() {
  const { cart, selectedAddress, savedAddresses, setSelectedAddress, gogoPoints, cartTotal } = useMarketplace();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDF8]/98 backdrop-blur-md border-b-2 border-[#C71F2D]/20 shadow-sm">
        {/* Authentic Assamese Phulam Gamusa Embroidered Ribbon */}
        <AuthenticGamusaBanner className="h-4 w-full shadow-inner" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-3 sm:gap-6">
            {/* Brand Logo & English Tagline with Master Jaapi & Gamusa Crest */}
            <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
                <MasterJaapiGamusaCrest className="w-full h-full drop-shadow-md" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-forest-950 tracking-tight leading-none">
                    Gogamukh <span className="text-[#C71F2D] font-extrabold">Mart</span>
                  </span>
                </div>
                {/* Clean English Tagline exactly as requested */}
                <span className="text-xs sm:text-sm font-serif font-bold text-[#C71F2D] tracking-tight mt-0.5">
                  Our Gogamukh • Our Shops • Our Doorsteps
                </span>
                <span className="text-[10px] uppercase tracking-wider text-forest-700 font-bold hidden sm:inline">
                  Assam Traditional Marketplace • Fast Tum-Tum Delivery
                </span>
              </div>
            </Link>

            {/* Delivery Location Selector */}
            <div className="relative">
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF4EA] border-2 border-[#C71F2D]/20 hover:border-[#C71F2D]/40 text-left transition-colors max-w-[150px] sm:max-w-[240px] shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C71F2D] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="truncate text-xs">
                  <div className="font-extrabold text-forest-950 flex items-center gap-1">
                    <span className="truncate">{selectedAddress.area_colony}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                  </div>
                  <div className="text-[10px] text-forest-600 truncate">{selectedAddress.address_line1}</div>
                </div>
              </button>
            </div>

            {/* Universal Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search local shops, Joha rice, Muga silk, tiffin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border-2 border-[#C71F2D]/20 focus:outline-none focus:ring-2 focus:ring-[#C71F2D]/30 focus:border-[#C71F2D] text-charcoal-900 placeholder:text-forest-700/60 shadow-inner"
                />
                <Search className="w-4 h-4 text-[#C71F2D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Right Nav Utilities: Tiffin, Rewards & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Daily Tiffin link */}
              <Link
                href="/tiffin"
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-forest-950 hover:bg-[#FAF4EA] transition-colors border-2 border-forest-900/15 bg-white shadow-sm"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#C71F2D]" />
                <span>Daily Tiffin</span>
              </Link>

              {/* Gogo Rewards Badge */}
              <Link
                href="/rewards"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF4EA] border-2 border-[#D4A338]/50 text-forest-950 hover:bg-white transition-colors text-xs font-bold shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#D4A338] fill-[#D4A338]" />
                <span className="hidden sm:inline">Gogo Points:</span>
                <span className="font-black text-[#C71F2D]">{gogoPoints}</span>
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C71F2D] hover:bg-[#A81925] text-white font-black text-xs sm:text-sm shadow-md transition-all relative border border-white/20 hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span className="hidden xs:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-[#FAF4EA] text-[#C71F2D] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center -ml-1 border-2 border-white shadow-sm">
                    {cartItemCount}
                  </span>
                )}
                {cartTotal > 0 && (
                  <span className="hidden sm:inline font-extrabold text-white border-l border-white/30 pl-2">
                    {formatPrice(cartTotal)}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar Row */}
          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search local shops, Joha rice, fish tenga, medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-9 pr-4 py-2 text-xs rounded-xl border-2 border-[#C71F2D]/20 focus:outline-none focus:ring-2 focus:ring-[#C71F2D]/30 text-charcoal-900 shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-[#C71F2D] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </header>

      {/* Delivery Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] rounded-3xl max-w-md w-full border-2 border-[#C71F2D]/30 shadow-2xl p-6 relative overflow-hidden">
            <AuthenticGamusaBanner className="absolute top-0 left-0 right-0 h-2.5" />

            <div className="flex items-center justify-between pt-1 pb-3 border-b border-[#C71F2D]/15">
              <div className="flex items-center gap-2">
                <MasterJaapiGamusaCrest className="w-8 h-8" />
                <h3 className="font-serif font-black text-lg text-forest-950">Select Delivery Location</h3>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-forest-600 hover:text-forest-900 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-forest-700 mt-2 mb-4 leading-relaxed">
              Our local Tum-Tum drivers deliver across <strong>Gogamukh Bazar, Chauldhowa, Station Road, Chariali, Hospital Link Road, and Bordoibam</strong>.
            </p>

            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {savedAddresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setIsAddressModalOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? "bg-white border-[#C71F2D] ring-2 ring-[#C71F2D]/30 shadow-sm"
                        : "bg-white/80 border-[#C71F2D]/15 hover:border-[#C71F2D]/40"
                    }`}
                  >
                    <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? "text-[#C71F2D]" : "text-forest-600"}`} />
                    <div className="text-xs flex-1">
                      <div className="font-bold text-forest-950 flex items-center gap-2">
                        <span>{addr.recipient_name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#C71F2D]/10 text-[#C71F2D] text-[9px] uppercase font-bold">
                          {addr.address_type}
                        </span>
                      </div>
                      <div className="text-forest-950 font-semibold">{addr.area_colony} (Pincode: {addr.pincode})</div>
                      <div className="text-forest-700 text-[11px]">{addr.address_line1} {addr.landmark ? `• Landmark: ${addr.landmark}` : ""}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-[#C71F2D]/15 flex justify-end">
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#C71F2D] text-white text-xs font-bold hover:bg-[#A81925] shadow-sm"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
