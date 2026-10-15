'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ShoppingBag, Sparkles, Clock, CheckCircle2, Scissors } from 'lucide-react';

export default function ShoppingExperience() {
  const [mode, setMode] = useState<'physical' | 'online'>('online');

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="bg-white border-2 border-[#ebdccd] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Switcher Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#780016]" /> Choose Your Shopping Experience
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#780016] mt-1">
              {mode === 'physical' ? 'Visit Our Madurai Flagship Studio' : 'Shop Online & Doorstep Delivery'}
            </h2>
          </div>

          <div className="inline-flex p-1 bg-stone-100 rounded-2xl border border-stone-200 z-10">
            <button
              type="button"
              onClick={() => setMode('online')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 'online' ? 'bg-[#780016] text-white shadow-xs' : 'text-stone-700 hover:text-black'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Online Shopping
            </button>
            <button
              type="button"
              onClick={() => setMode('physical')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 'physical' ? 'bg-[#780016] text-white shadow-xs' : 'text-stone-700 hover:text-black'
              }`}
            >
              <MapPin className="w-4 h-4" /> Physical Visit
            </button>
          </div>
        </div>

        {/* Option A: Physical Store Experience */}
        {mode === 'physical' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4 text-xs text-stone-700">
              <div className="space-y-2">
                <p className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#780016]" />
                  No. 42, West Masi Street, Madurai 625001
                </p>
                <p className="text-stone-600">
                  Opposite Sri Meenakshi Temple South Chithirai Gate, 2 minutes walk from West Tower.
                </p>
                <p className="flex items-center gap-2 text-stone-700 font-semibold">
                  <Clock className="w-4 h-4 text-amber-700" />
                  Studio Timings: Open all 7 days from 9:30 AM to 9:30 PM
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> Same-day blouse fitting alteration
                </span>
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> Live silk thread and zari swatches
                </span>
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> 18-point bodily measurement recording
                </span>
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> Instant in-store collection pickup
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/book-appointment"
                  className="bg-[#780016] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs hover:bg-[#600012] transition"
                >
                  Book Free In-Store Trial
                </Link>
                <a
                  href="https://maps.google.com/?q=West+Masi+Street+Madurai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-stone-300 text-stone-800 font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-stone-50 transition"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80"
                alt="Madurai Boutique Storefront"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Option B: Online Shopping Experience */}
        {mode === 'online' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4 text-xs text-stone-700">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-[#780016]">
                  Doorstep Delivery Across Tamil Nadu & Global WhatsApp Concierge
                </h3>
                <p className="text-stone-600">
                  Shop certified handloom sarees, readymade blouses, or get custom bridal stitching with live video guidance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> Direct WhatsApp concierge ordering
                </span>
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> WhatsApp video measurement trial
                </span>
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> Cash on delivery across Tamil Nadu
                </span>
                <span className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" /> Courier service for sample blouses
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="bg-[#780016] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs hover:bg-[#600012] transition flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Browse In-House Catalog
                </Link>
                <Link
                  href="/custom-stitching"
                  className="bg-white border-2 border-stone-300 text-stone-800 font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-stone-50 transition flex items-center gap-2"
                >
                  <Scissors className="w-4 h-4 text-[#780016]" /> Online Custom Stitching
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"
                alt="Online saree and blouse shopping"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}