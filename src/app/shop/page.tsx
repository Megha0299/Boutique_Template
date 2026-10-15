'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, Product } from '../../lib/products';
import { Phone, ArrowLeft, Sparkles, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Sarees', 'Blouses', 'Kurtis', 'Bridal Wear', 'Kids Wear'];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    if (categoryParam) {
      const match = CATEGORIES.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setActiveCategory(match);
      }
    }
  }, [categoryParam]);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#fcfaf7] py-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Navigation & Header */}
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#780016] transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Storefront
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#ebdccd] pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-[#780016]" /> Handloom & Couture Catalogue
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#780016] mt-1">
                {activeCategory === 'All' ? 'Complete Boutique Collection' : `${activeCategory} Collection`}
              </h1>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                Directly from our Madurai master weavers and aari embroidery artisans.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#780016] text-white shadow-xs'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filtered Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item: Product) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#ede3d8] overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#780016] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {item.code}
                    </span>
                    <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-stone-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-base font-bold text-[#780016]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <a
                    href={`https://wa.me/919443215678?text=I%20want%20to%20order%20${encodeURIComponent(item.name)}%20(${item.code})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <p className="text-stone-500 text-sm font-medium">
              No products currently found in the &ldquo;{activeCategory}&rdquo; category.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-xs font-bold text-[#780016] hover:underline"
            >
              View all products instead
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}