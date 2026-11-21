"use client";

import React from "react";
import { useMarketplace } from "@/lib/store";
import { UserRole } from "@/types";
import { ShieldCheck, Store, Truck, User } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBar() {
  const { currentUser, setCurrentUserRole } = useMarketplace();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; href: string }[] = [
    { role: "customer", label: "Customer", icon: <User className="w-3.5 h-3.5" />, href: "/" },
    { role: "seller_owner", label: "Seller", icon: <Store className="w-3.5 h-3.5" />, href: "/seller/dashboard" },
    { role: "driver", label: "Driver", icon: <Truck className="w-3.5 h-3.5" />, href: "/driver/dashboard" },
    { role: "super_admin", label: "Admin", icon: <ShieldCheck className="w-3.5 h-3.5" />, href: "/admin/dashboard" },
  ];

  return (
    <div className="bg-[#0D2418] text-[#FAF5EB] text-xs py-1.5 px-3 border-b border-[#C71F2D]/30 flex items-center justify-between gap-2 z-30 relative">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold text-white text-[11px] sm:text-xs">Gogamukh Mart</span>
        <span className="hidden sm:inline text-forest-300">|</span>
        <span className="hidden sm:inline text-forest-300 text-[11px]">
          Role: <strong className="text-[#F5D061] capitalize">{currentUser.role.replace("_", " ")}</strong>
        </span>
      </div>

      {/* Responsive role buttons with smooth horizontal touch scroll */}
      <div className="flex items-center gap-1 bg-black/40 p-0.5 sm:p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[9px] uppercase font-bold text-forest-300 px-1 hidden md:inline">Mode:</span>
        {roles.map((r) => {
          const isActive = currentUser.role === r.role;
          return (
            <Link
              key={r.role}
              href={r.href}
              onClick={() => setCurrentUserRole(r.role)}
              className={`flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${
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
  );
}
