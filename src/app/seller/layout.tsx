"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  IndianRupee,
  Store,
  HelpCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { useMarketplace } from "@/lib/store";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { orders } = useMarketplace();

  // Pending seller orders
  const pendingOrders = orders.filter((o) => ["placed", "waiting_shop_approval"].includes(o.status));

  const navLinks = [
    { href: "/seller/dashboard", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      href: "/seller/orders",
      label: "Live Orders",
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrders.length > 0 ? pendingOrders.length : null,
    },
    { href: "/seller/products", label: "Products", icon: <Package className="w-4 h-4" /> },
    { href: "/seller/inventory", label: "Inventory & Stock", icon: <Layers className="w-4 h-4" /> },
    { href: "/seller/finance", label: "Finance & Settlements", icon: <IndianRupee className="w-4 h-4" /> },
    { href: "/seller/shop", label: "Shop Profile", icon: <Store className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-sage-50/50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-forest-950 text-ivory-100 p-5 flex flex-col justify-between shrink-0 border-r border-forest-800">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muga-400 uppercase font-bold tracking-wider">Merchant Portal</span>
              <h2 className="font-serif font-bold text-lg text-white">Brahmaputra Organic</h2>
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
                    <span className="px-1.5 py-0.5 rounded-full bg-gamusa-red text-white text-[10px] font-bold animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-forest-800/60 text-xs space-y-3">
          <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 text-[11px] text-forest-300">
            <span className="font-bold text-white block">SLA Requirement:</span>
            Accept orders within 5 minutes to prevent auto-cancellation and customer refund.
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-forest-300 hover:text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Customer Mart</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
