import React from "react";
import Link from "next/link";
import { Store, Truck, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import { MasterJaapiGamusaCrest, AuthenticGamusaBanner, MisingTribalBorder } from "@/components/brand/AssameseMotifs";

export default function Footer() {
  return (
    <footer className="bg-[#0D2418] text-[#FAF5EB] mt-20 border-t-4 border-[#C71F2D] relative">
      {/* Top Authentic Phulam Gamusa Ribbon */}
      <AuthenticGamusaBanner className="h-5 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-forest-800/60">
          {/* Brand & Town Heritage */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center p-1 border border-[#D4A338]/40 shadow-md">
                <MasterJaapiGamusaCrest className="w-full h-full drop-shadow-md" />
              </div>
              <div>
                <span className="font-serif font-black text-2xl text-white block leading-tight">
                  Gogamukh <span className="text-[#DE2C3B] font-extrabold">Mart</span>
                </span>
                <span className="text-[10px] text-[#F5D061] font-serif font-bold uppercase tracking-wider">
                  Our Town Pride
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF5EB]/80 leading-relaxed font-medium">
              <strong className="text-white">Our Gogamukh. Our Shops. Our Doorsteps.</strong> Connecting trusted local merchants, authentic tribal handloom weavers, and Tum-Tum delivery partners across Dhemaji, Assam.
            </p>

            <div className="text-[11px] text-[#F5D061] font-serif italic border-l-2 border-[#C71F2D] pl-2.5 py-0.5">
              "Connecting the Brahmaputra and Subansiri riverbanks straight to your doorstep."
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5D061] uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF5EB]/80 font-medium">
              <li><Link href="/categories" className="hover:text-white transition-colors">All 10 Categories</Link></li>
              <li><Link href="/tiffin" className="hover:text-white transition-colors">Daily Tiffin Subscription</Link></li>
              <li><Link href="/rewards" className="hover:text-white transition-colors">Gogo Rewards (5-Delivery Loop)</Link></li>
              <li><Link href="/champions" className="hover:text-white transition-colors">Shopping Champions Leaderboard</Link></li>
              <li><Link href="/return-bag" className="hover:text-white transition-colors">Return-a-Bag Eco Reward</Link></li>
            </ul>
          </div>

          {/* Partner with us */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5D061] uppercase tracking-wider">
              Join The Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF5EB]/80 font-medium">
              <li>
                <Link href="/seller/onboarding" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <Store className="w-3.5 h-3.5 text-[#F5D061]" />
                  <span>Register Your Shop (From ₹3,000)</span>
                </Link>
              </li>
              <li>
                <Link href="/driver/onboarding" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tum-Tum Driver Partner (₹99 Fee)</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5D061]" />
                  <span>Master Command Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Area & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F5D061] uppercase tracking-wider">
              Gogamukh Hub
            </h4>
            <div className="space-y-2 text-xs text-[#FAF5EB]/80 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5D061] mt-0.5 shrink-0" />
                <span>Gogamukh Town, Dhemaji, Assam — 787056</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F5D061] shrink-0" />
                <span>+91 94350 00000 / +91 98540 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F5D061] shrink-0" />
                <span>care@gogamukhmart.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF5EB]/60 gap-4 font-medium">
          <p>© {new Date().getFullYear()} Gogamukh Online Mart. All rights reserved. Made with indigenous Assamese pride.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/support" className="hover:text-white transition-colors">Local Support</Link>
          </div>
        </div>
      </div>

      {/* Bottom Mising Tribal Weave Accent Ribbon */}
      <MisingTribalBorder className="h-3 w-full opacity-80" />
    </footer>
  );
}
