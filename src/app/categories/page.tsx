import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_CATEGORIES } from "@/lib/mock-data";
import { ArrowRight, Grid } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <div className="border-b border-forest-800/10 pb-5">
        <div className="flex items-center gap-2 text-forest-800 text-xs font-semibold uppercase tracking-wider">
          <Grid className="w-4 h-4" />
          <span>Marketplace Directory</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-forest-900 mt-1">
          All 10 Shopping Categories
        </h1>
        <p className="text-xs sm:text-sm text-forest-700 mt-1">
          Explore certified local merchants across Gogamukh Bazar, Station Road, and Chauldhowa
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group bg-white rounded-xl border border-forest-800/10 hover:border-forest-800/30 overflow-hidden shadow-sm hover:shadow-brand transition-all flex flex-col"
          >
            <div className="relative h-44 w-full bg-sage-50 overflow-hidden">
              <Image
                src={category.image_url || "/placeholder.jpg"}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-ivory font-serif font-bold text-lg leading-snug">
                  {category.name}
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-forest-700 leading-relaxed">
                {category.description}
              </p>
              <div className="mt-4 pt-3 border-t border-forest-800/10 flex items-center justify-between text-xs font-semibold text-forest-800 group-hover:text-muga-600 transition-colors">
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
