'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lookbookItems, LookbookItem } from '../../lib/products';
import { Sparkles, Heart, ExternalLink, ArrowLeft, Tag } from 'lucide-react';

export default function TrendingPage() {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [likesCount, setLikesCount] = useState<Record<number, number>>({});

  const tags = ['All', 'SUNGUDI SPLENDOR', 'ARTISAN BLOUSE', 'DHAVANI LOVE'];

  const filteredItems = selectedTag === 'All'
    ? lookbookItems
    : lookbookItems.filter((item) => item.tag.toLowerCase() === selectedTag.toLowerCase());

  const handleLike = (index: number) => {
    setLikesCount((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen py-10 font-sans">
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
                <Sparkles className="w-3.5 h-3.5 text-[#780016]" /> Social Inspiration Lookbook
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#780016] mt-1">
                Trending on Instagram
              </h1>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                Real brides, festive style moments, and handcrafted traditional couture curated by master designer Smt. Ahalya.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                    selectedTag.toLowerCase() === tag.toLowerCase()
                      ? 'bg-[#780016] text-white shadow-xs'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredItems.map((look: LookbookItem, i: number) => {
            const hasValidPrice = typeof (look as any).price === 'number' && !isNaN((look as any).price);
            const displayPrice = hasValidPrice ? `₹${Number((look as any).price).toLocaleString('en-IN')}` : null;

            return (
              <div
                key={i}
                className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  {/* Top Bar */}
                  <div className="p-4 flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-900">{look.username}</span>
                    <span className="text-[10px] bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {look.tag}
                    </span>
                  </div>

                  {/* Image Container with Direct Link */}
                  <a
                    href={look.buyUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-square overflow-hidden group cursor-pointer bg-stone-100"
                  >
                    <img
                      src={look.image}
                      alt={look.tag}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Platform Tag */}
                    {look.platform && (
                      <span className="absolute top-3 right-3 bg-stone-900 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                        {look.platform}
                      </span>
                    )}

                    {/* Likes Badge */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLike(i);
                      }}
                      className="absolute bottom-3 left-3 bg-black/60 hover:bg-black/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 transition"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{likesCount[i] ? `${likesCount[i]} new` : look.likes}</span>
                    </button>
                  </a>

                  {/* Caption & Product Code */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#780016] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <Tag className="w-3 h-3" /> {look.code}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {look.caption}
                    </p>
                  </div>
                </div>

                {/* Bottom Direct Buy Button */}
                <div className="p-4 pt-0 border-t border-stone-100 mt-2">
                  <a
                    href={look.buyUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#780016] hover:bg-[#600012] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition mt-3"
                  >
                    <span>
                      {displayPrice ? `Buy this Look (${displayPrice})` : `Buy this Look on ${look.platform || 'Partner Store'}`}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}