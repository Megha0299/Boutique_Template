'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { products } from '../lib/products';
import { trendingAffiliatePicks, getAmazonSearchUrl, getFlipkartSearchUrl, getMyntraSearchUrl } from '../lib/ads';
import { Search, Phone, Sparkles, X, ArrowRight, ExternalLink } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Custom Stitching', href: '/custom-stitching' },
  { name: 'Trending', href: '/trending' },
  { name: 'Book Appointment', href: '/book-appointment' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const query = searchTerm.trim().toLowerCase();

  const searchResults = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    : [];

  const matchingTrendingDeals = query
    ? trendingAffiliatePicks.filter(
        (deal) =>
          deal.name.toLowerCase().includes(query) ||
          deal.categoryTag.toLowerCase().includes(query) ||
          deal.platform.toLowerCase().includes(query)
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    router.push(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50 bg-white">
      {/* Top Banner */}
      <div className="bg-[#780016] text-[#ffeedd] text-xs py-1.5 px-4 flex justify-between items-center font-medium">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Madurai Handlooms</span>
        </div>
        <div className="text-center tracking-wide hidden sm:block">
          Delivery all over Tamil Nadu | COD Available | Madurai In-Store Pickup
        </div>
        <div>
          <span>COD • 100% Authentic</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#fbf7f2] border-b border-[#ebdccd] py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#780016] text-amber-300 flex items-center justify-center font-bold text-xl border border-amber-400">
              அ
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif text-[#780016] tracking-tight">
                Ahalya&apos;s Boutique
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-[#93725b] font-semibold">
                Madurai, Tamil Nadu
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchTerm}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder="Search saree, bridal blouse, kurti, or code..."
                className="w-full bg-white border border-[#decaba] rounded-full py-2 pl-10 pr-9 text-xs focus:outline-none focus:ring-1 focus:ring-[#780016] text-stone-900 placeholder:text-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-2.5" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Dropdown Container */}
            {isSearchOpen && query.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl border border-[#ebdccd] shadow-xl overflow-hidden z-50 max-h-[30rem] overflow-y-auto">
                
                {/* 1. In-Store Matches */}
                {searchResults.length > 0 ? (
                  <div>
                    <div className="px-4 py-2 bg-[#fcfaf7] border-b border-[#f0e3d6] flex justify-between items-center text-[11px] text-stone-500">
                      <span className="font-semibold text-[#780016]">Our Boutique In-Store Collection</span>
                      <span>{searchResults.length} Match</span>
                    </div>
                    <div className="divide-y divide-stone-100">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectProduct(item.id)}
                          className="p-3 hover:bg-[#fff9f4] cursor-pointer flex items-center gap-3 transition"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] bg-[#780016] text-white px-1.5 py-0.2 rounded font-bold">
                              {item.code}
                            </span>
                            <h4 className="text-xs font-serif font-semibold text-stone-900 truncate mt-0.5">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-stone-600 font-bold">
                              ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 text-[11px] text-stone-500 text-center bg-stone-50">
                    No matching in-store items found for &ldquo;{searchTerm}&rdquo;
                  </div>
                )}

                {/* 2. Trending Dresses with Exact Photos */}
                <div className="p-4 bg-gradient-to-b from-[#fdfbf9] to-white border-t border-[#f0e3d6] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#780016]" />
                      Trending E-Commerce Partner Dresses
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                      Exact Product Picks
                    </span>
                  </div>

                  {matchingTrendingDeals.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2.5">
                      {matchingTrendingDeals.map((deal) => (
                        <a
                          key={deal.id}
                          href={deal.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-stone-200 bg-white hover:border-[#780016] transition group"
                        >
                          <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-12 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] bg-stone-900 text-amber-300 font-bold px-1.5 py-0.2 rounded">
                                {deal.platform}
                              </span>
                              <span className="text-[9px] bg-rose-50 text-rose-700 font-bold px-1 rounded">
                                {deal.discount}
                              </span>
                            </div>
                            <h5 className="text-xs font-semibold text-stone-900 truncate mt-1 group-hover:text-[#780016]">
                              {deal.name}
                            </h5>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-stone-900">{deal.price}</span>
                              <span className="text-[10px] text-stone-400 line-through">{deal.originalPrice}</span>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#780016] shrink-0" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-stone-500">
                      Explore trending varieties across partner stores:
                    </p>
                  )}

                  {/* Fallback Direct Store Search Links */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                    <a
                      href={getAmazonSearchUrl(searchTerm)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-amber-200 rounded-xl text-center bg-[#fffcf5] text-stone-800 font-bold hover:bg-amber-50"
                    >
                      Amazon
                    </a>
                    <a
                      href={getFlipkartSearchUrl(searchTerm)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-blue-200 rounded-xl text-center bg-[#f7faff] text-stone-800 font-bold hover:bg-blue-50"
                    >
                      Flipkart
                    </a>
                    <a
                      href={getMyntraSearchUrl(searchTerm)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-pink-200 rounded-xl text-center bg-[#fff7fa] text-stone-800 font-bold hover:bg-pink-50"
                    >
                      Myntra
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border-t border-stone-200 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                    }}
                    className="text-xs font-bold text-[#780016] hover:underline flex items-center justify-center gap-1 w-full"
                  >
                    See all results on full page <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Right WhatsApp Button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919443215678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-4 py-2 rounded-full transition"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-center items-center gap-7 pt-3 mt-2 text-xs font-medium border-t border-[#f0e3d6]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition pb-1 ${
                  isActive
                    ? 'text-[#780016] font-bold border-b-2 border-[#780016]'
                    : 'text-stone-700 hover:text-[#780016]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Announcement Ribbon */}
      <div className="bg-[#b45309] text-white text-xs py-1.5 px-4 text-center flex justify-center items-center gap-2">
        <span>🎁 Pongal & Aadi Thiruvizha Special: Flat 15% OFF on Bridal Aari Blouse combos!</span>
        <Link href="/book-appointment" className="font-bold underline hover:text-amber-200">
          Book Slots
        </Link>
      </div>
    </header>
  );
}