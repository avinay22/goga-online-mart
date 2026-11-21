"use client";

import React, { useState } from "react";
import { useMarketplace } from "@/lib/store";
import { UserRole } from "@/types";
import { ShieldCheck, Store, Truck, User, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBar() {
  const { currentUser, setCurrentUserRole } = useMarketplace();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; href: string }[] = [
    { role: "customer", label: "Customer", icon: <User className="w-3.5 h-3.5" />, href: "/" },
    { role: "seller_owner", label: "Seller", icon: <Store className="w-3.5 h-3.5" />, href: "/seller/dashboard" },
    { role: "driver", label: "Driver", icon: <Truck className="w-3.5 h-3.5" />, href: "/driver/dashboard" },
    { role: "super_admin", label: "Admin", icon: <ShieldCheck className="w-3.5 h-3.5" />, href: "/admin/dashboard" },
  ];

  return (
    <>
      {/* Desktop/Tablet Top Bar (Clean, full width) */}
      <div className="hidden md:flex bg-[#0D2418] text-[#FAF5EB] text-xs py-1.5 px-4 border-b border-[#C71F2D]/30 items-center justify-between gap-2 z-30 w-full">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white text-xs">Gogamukh Mart Multi-Portal</span>
          <span className="text-forest-400">|</span>
          <span className="text-forest-300 text-[11px]">
            Current: <strong className="text-[#F5D061] capitalize">{currentUser.role.replace("_", " ")}</strong> ({currentUser.full_name})
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
          <span className="text-[10px] uppercase font-bold text-forest-300 px-1">Switch:</span>
          {roles.map((r) => {
            const isActive = currentUser.role === r.role;
            return (
              <Link
                key={r.role}
                href={r.href}
                onClick={() => setCurrentUserRole(r.role)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#C71F2D] text-white shadow-sm"
                    : "text-[#FAF5EB]/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Floating Mini-Pill (Unobtrusive floating button on mobile) */}
      <div className="md:hidden fixed top-2.5 right-14 z-50">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0D2418]/90 backdrop-blur-md text-[#F5D061] text-[9px] font-bold border border-[#D4A338]/40 shadow-md active:scale-95"
          aria-label="Switch portal role"
        >
          <span className="capitalize">{currentUser.role === "customer" ? "App" : currentUser.role.replace("_", " ")}</span>
          <ChevronDown className="w-2.5 h-2.5" />
        </button>

        {isOpenMobile && (
          <div className="absolute right-0 mt-1 w-36 bg-[#0D2418] text-white rounded-xl shadow-2xl border border-[#C71F2D] p-1.5 space-y-1 animate-in fade-in zoom-in-95">
            <div className="text-[8px] font-black uppercase tracking-wider text-forest-400 px-2 py-0.5">
              Switch Portal:
            </div>
            {roles.map((r) => {
              const isActive = currentUser.role === r.role;
              return (
                <Link
                  key={r.role}
                  href={r.href}
                  onClick={() => {
                    setCurrentUserRole(r.role);
                    setIsOpenMobile(false);
                  }}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold w-full ${
                    isActive
                      ? "bg-[#C71F2D] text-white"
                      : "text-forest-200 hover:bg-white/10"
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
