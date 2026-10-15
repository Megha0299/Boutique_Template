'use client';

import { singleFeaturedProduct } from '../lib/ads';
import { ExternalLink, Sparkles, Star } from 'lucide-react';

export default function AdBanner() {
  const item = singleFeaturedProduct;

  return (
    <section className="max-w-7xl mx-auto px-6 py-4 font-sans">
      <div className="bg-[#fffdfa] border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Curated Partner Pick
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Stylist-recommended festive collection
          </span>
        </div>

        {/* Single Featured Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Exact Product Photo */}
          <div className="md:col-span-5">
            <a
              href={item.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 group"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-stone-900 text-amber-300 text-xs font-bold px-2.5 py-1 rounded shadow">
                {item.platform}
              </span>
              <span className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                {item.discount}
              </span>
            </a>
          </div>

          {/* Product Details & Direct Store Checkout Link */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>{item.rating} Rating</span>
              <span className="text-stone-400 font-normal ml-1">• Verified Customer Reviews</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              {item.name}
            </h3>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#780016]">{item.price}</span>
              <span className="text-sm text-stone-400 line-through">{item.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Save {item.discount}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed max-w-lg">
              Click below to view this exact product directly on {item.platform}. Complete your order on {item.platform} with fast shipping and authentic handloom guarantee.
            </p>

            <div className="pt-2">
              <a
                href={item.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#780016] hover:bg-[#600012] text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow transition cursor-pointer"
              >
                <span>Buy this dress directly on {item.platform}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}