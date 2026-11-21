"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, BellRing, Navigation, IndianRupee, User, ArrowLeft } from "lucide-react";
import { useMarketplace } from "@/lib/store";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDriverOnline, setIsDriverOnline, orders } = useMarketplace();

  // Broadcasting requests
  const broadcastingOrders = orders.filter((o) => o.status === "ready_for_pickup");
  // Active run
  const activeOrder = orders.find((o) => ["driver_assigned", "picked_up"].includes(o.status));

  const navItems = [
    { href: "/driver/dashboard", label: "Dashboard", icon: <Truck className="w-5 h-5" /> },
    {
      href: "/driver/requests",
      label: "Requests",
      icon: <BellRing className="w-5 h-5" />,
      badge: broadcastingOrders.length > 0 ? broadcastingOrders.length : null,
    },
    {
      href: "/driver/active-delivery",
      label: "Active Run",
      icon: <Navigation className="w-5 h-5" />,
      badge: activeOrder ? "1" : null,
    },
    { href: "/driver/earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" /> },
    { href: "/driver/onboarding", label: "KYC / Reg", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-sage-50/60 pb-20 md:pb-6">
      {/* Top Driver Bar */}
      <div className="bg-forest-950 text-white p-4 shadow-md flex items-center justify-between border-b border-forest-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-forest-800 flex items-center justify-center text-muga-400 font-bold border border-muga-400/30">
            🛺
          </div>
          <div>
            <div className="text-[10px] text-muga-400 font-bold uppercase tracking-wider">Tum-Tum Fleet Partner</div>
            <h2 className="font-serif font-bold text-sm text-white">Ramen Deka (#AS-22-E-1049)</h2>
          </div>
        </div>

        {/* Online / Offline Switch */}
        <button
          onClick={() => setIsDriverOnline(!isDriverOnline)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
            isDriverOnline
              ? "bg-emerald-600 text-white ring-2 ring-emerald-400"
              : "bg-red-900/80 text-red-200 border border-red-700"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isDriverOnline ? "bg-white animate-pulse" : "bg-red-400"}`} />
          <span>{isDriverOnline ? "Online (Accepting)" : "Offline"}</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6">{children}</div>

      {/* Driver Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-forest-800/15 py-2 px-3 shadow-2xl flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-[10px] font-semibold transition-colors relative py-1 px-2 ${
                isActive ? "text-forest-900 font-bold" : "text-forest-600"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-gamusa-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
