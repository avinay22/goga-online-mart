"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  Truck,
  IndianRupee,
  Sliders,
  Settings,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useMarketplace } from "@/lib/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { orders } = useMarketplace();

  const activeOrdersCount = orders.filter((o) => !["delivered", "cancelled"].includes(o.status)).length;

  const navLinks = [
    { href: "/admin/dashboard", label: "Operations Pulse", icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      href: "/admin/orders",
      label: "Orders Command",
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: activeOrdersCount > 0 ? activeOrdersCount : null,
    },
    { href: "/admin/sellers", label: "Shops & Merchants", icon: <Store className="w-4 h-4" /> },
    { href: "/admin/drivers", label: "Tum-Tum Fleet", icon: <Truck className="w-4 h-4" /> },
    { href: "/admin/delivery-pricing", label: "Delivery Pricing Engine", icon: <Sliders className="w-4 h-4" /> },
    { href: "/admin/settlements", label: "Daily Settlements Batch", icon: <IndianRupee className="w-4 h-4" /> },
    { href: "/admin/settings", label: "System Rules & SLAs", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-sage-50/50 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-forest-950 text-ivory-100 p-5 flex flex-col justify-between shrink-0 border-r border-forest-800">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-forest-800 flex items-center justify-center text-muga-400 font-bold border border-muga-400/30">
              <ShieldCheck className="w-5 h-5 text-muga-400" />
            </div>
            <div>
              <span className="text-[10px] text-muga-400 uppercase font-bold tracking-wider">Command Center</span>
              <h2 className="font-serif font-bold text-base text-white">Gogamukh Mart HQ</h2>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-muga-400 text-forest-950 font-bold shadow-sm"
                      : "text-forest-200 hover:text-white hover:bg-forest-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-gamusa-red text-white text-[10px] font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-forest-800/60 text-xs">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-forest-300 hover:text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer View</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
