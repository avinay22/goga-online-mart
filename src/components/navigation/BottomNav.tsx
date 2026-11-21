"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, UtensilsCrossed, Package, UserCheck } from "lucide-react";
import { useMarketplace } from "@/lib/store";
import { AuthenticGamusaBanner } from "@/components/brand/AssameseMotifs";

export default function BottomNav() {
  const pathname = usePathname();
  const { orders } = useMarketplace();

  // Active orders badge
  const activeOrders = orders.filter((o) => !["delivered", "cancelled"].includes(o.status));

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/categories", label: "Categories", icon: <Grid className="w-5 h-5" /> },
    { href: "/tiffin", label: "Tiffin", icon: <UtensilsCrossed className="w-5 h-5" /> },
    {
      href: "/orders",
      label: "Orders",
      icon: <Package className="w-5 h-5" />,
      badge: activeOrders.length > 0 ? activeOrders.length : null,
    },
    { href: "/profile", label: "Account", icon: <UserCheck className="w-5 h-5" /> },
  ];

  // Do not show customer bottom nav on seller, driver or admin panels
  if (
    pathname.startsWith("/seller") ||
    pathname.startsWith("/driver") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF8]/98 backdrop-blur-lg border-t-2 border-[#C71F2D]/20 shadow-2xl md:hidden pb-[env(safe-area-inset-bottom,4px)]"
    >
      {/* Authentic Micro Phulam Gamusa Ribbon running across top of mobile nav */}
      <AuthenticGamusaBanner className="h-2 w-full opacity-90" />

      <div className="flex items-center justify-around py-1.5 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all relative min-h-[46px] min-w-[54px] ${
                isActive
                  ? "text-[#C71F2D] scale-105"
                  : "text-forest-700/80 hover:text-forest-950 active:scale-95"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C71F2D] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 tracking-tight leading-none">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C71F2D] mt-1 shadow-sm" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
