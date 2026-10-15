'use client';

import { Sparkles, Scissors, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#fcfaf7] min-h-screen py-10 font-sans">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* 1. Header Title & Subtitle */}
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200/60 px-3.5 py-1 rounded-full">
            Our Madurai Heritage Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#780016]">
            Weaving Tradition with Passion
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Rooted on West Masi Street, Madurai, weaving the rich cultural tapestry of Tamil Nadu into modern festive silhouettes.
          </p>
        </div>

        {/* 2. Full-Width Saree Model Banner */}
        <div className="rounded-3xl overflow-hidden shadow-md border-4 border-white bg-white">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
            alt="Ahalya's Boutique Madurai Heritage Drape"
            className="w-full h-[420px] sm:h-[500px] object-cover object-top"
          />
        </div>

        {/* 3. Artisan Heritage Story Card */}
        <div className="bg-[#fffdfa] border border-[#ecdccd] rounded-3xl p-8 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#780016]">
            Preserving the Artisan Heritage of the Vaigai
          </h2>
          <div className="text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed">
            <p>
              Founded in 2012 by master couturier Smt. Ahalya, our boutique was established to celebrate the authentic textile arts of Tamil Nadu. From traditional Madurai Sungudi cotton tied by generational artisan families in Simmakkal to Kanchipuram mulberry silks with pure gold korvai zari, our mission is to deliver authentic luxury.
            </p>
            <p>
              Unlike fast-fashion chains, every single bridal aari blouse crafted at Ahalya&apos;s Boutique undergoes up to 80 hours of meticulous hand needlework by local Madurai craftsmen. We take immense pride in guaranteeing flawless fittings, fair wages for our weaver community, and doorstep delivery to every district in Tamil Nadu.
            </p>
          </div>
        </div>

        {/* 4. 3 Feature Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Card 1: Pure Weaves */}
          <div className="bg-[#fffdfa] border border-[#ecdccd] rounded-2xl p-6 text-center shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200/60 shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-500 fill-current" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Pure Weaves
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              100% natural fibers, pure handlooms, and certified silk marks.
            </p>
          </div>

          {/* Card 2: Flawless Tailoring */}
          <div className="bg-[#fffdfa] border border-[#ecdccd] rounded-2xl p-6 text-center shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200/60 shadow-inner">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Flawless Tailoring
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Master-cut blouse patterns crafted with millimeter precision.
            </p>
          </div>

          {/* Card 3: Direct TN Delivery */}
          <div className="bg-[#fffdfa] border border-[#ecdccd] rounded-2xl p-6 text-center shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200/60 shadow-inner">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Direct TN Delivery
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Fast 2-4 day tracked shipping across all Tamil Nadu taluks.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}