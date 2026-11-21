import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_SHOPS } from "@/lib/mock-data";
import { Store, Star, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ShopsDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <div className="border-b border-forest-800/10 pb-5">
        <div className="flex items-center gap-2 text-forest-800 text-xs font-semibold uppercase tracking-wider">
          <Store className="w-4 h-4" />
          <span>Local Merchant Directory</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-forest-900 mt-1">
          Participating Gogamukh Shops
        </h1>
        <p className="text-xs sm:text-sm text-forest-700 mt-1">
          Every shop operates its digital profile with live stock and rapid Tum-Tum pickup
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SHOPS.map((shop) => (
          <Link
            key={shop.id}
            href={`/shops/${shop.slug}`}
            className="group bg-white rounded-xl border border-forest-800/10 hover:border-forest-800/30 overflow-hidden shadow-sm hover:shadow-brand transition-all flex flex-col"
          >
            <div className="relative h-44 w-full bg-sage-50 overflow-hidden">
              <Image
                src={shop.cover_url}
                alt={shop.shop_name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-forest-900 flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 text-muga-500 fill-muga-400" />
                <span>{shop.rating}</span>
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider">
                Open Now
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-muga-700 uppercase tracking-wide">
                  {shop.category_names.join(" • ")}
                </span>
                <h3 className="font-serif font-bold text-lg text-charcoal-900 group-hover:text-forest-800 transition-colors mt-0.5">
                  {shop.shop_name}
                </h3>
                <p className="text-xs text-forest-700 mt-1.5 line-clamp-2 leading-relaxed">
                  {shop.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-forest-800/10 space-y-1.5 text-xs text-forest-700">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                  <span className="truncate">{shop.address_line}, {shop.area}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-forest-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{shop.opening_time} - {shop.closing_time}</span>
                  </div>
                  <span className="font-semibold text-forest-800 group-hover:text-muga-600 flex items-center gap-1">
                    Enter Shop <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
