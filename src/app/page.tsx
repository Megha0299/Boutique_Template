'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShoppingBag,
  Scissors,
  Calendar,
  MapPin,
  Phone,
  Camera,
  ExternalLink,
  Heart,
  ShieldCheck,
  Award,
  Truck,
  ArrowRight,
  Star,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

import {
  getCMSLookbook,
  getCMSAffiliates,
  getCMSBanners,
  LookbookItem,
  AffiliateItem,
  BannerItem
} from '@/lib/cmsStore';

export default function HomePage() {
  const [lookbook, setLookbook] = useState<LookbookItem[]>([]);
  const [affiliates, setAffiliates] = useState<AffiliateItem[]>([]);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLookbook(getCMSLookbook());
    setAffiliates(getCMSAffiliates());
    setBanners(getCMSBanners());
  }, []);

  const activeBanner = banners.length > 0 ? banners[0] : null;

  return (
    <div className="min-h-screen bg-[#faf6f0] text-stone-800 font-sans selection:bg-[#780016] selection:text-amber-200">
      {/* Top Heritage Announcement Bar */}
      <div className="bg-[#780016] text-amber-200 text-xs py-2 px-4 text-center font-medium tracking-wide">
        {activeBanner?.title
          ? `${activeBanner.title} — ${activeBanner.subtitle || 'West Masi Street, Madurai'}`
          : 'Authentic Madurai Sungudi Cottons & Silk Mark Kanchipuram Silks • West Masi Street, Madurai'}
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#780016] text-amber-300 flex items-center justify-center font-serif font-black text-xl shadow-sm">
              A
            </div>
            <div>
              <span className="font-serif font-black text-xl sm:text-2xl text-[#780016] tracking-tight block leading-none">
                Ahalya&apos;s Boutique
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                Madurai Heritage Weaves
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-stone-700">
            <Link href="/shop" className="hover:text-[#780016] transition-colors">
              Collections
            </Link>
            <Link href="/custom-stitching" className="hover:text-[#780016] transition-colors">
              Aari &amp; Stitching
            </Link>
            <Link href="/trending" className="hover:text-[#780016] transition-colors">
              Curated Picks
            </Link>
            <Link href="/about" className="hover:text-[#780016] transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-[#780016] transition-colors">
              Visit Studio
            </Link>
          </nav>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/book-appointment"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#780016] text-amber-200 hover:bg-[#5e0011] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Trial
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-3 text-sm font-bold text-stone-700">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#780016]">
              Collections
            </Link>
            <Link href="/custom-stitching" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#780016]">
              Aari &amp; Custom Stitching
            </Link>
            <Link href="/trending" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#780016]">
              Curated Marketplace Picks
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#780016]">
              Our Heritage
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#780016]">
              Contact &amp; Location
            </Link>
            <Link
              href="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-[#780016] text-amber-200 py-2.5 rounded-xl mt-2"
            >
              Book Studio Appointment
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5c0010] via-[#780016] to-[#42000b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-bold px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Temple City Bridal &amp; Handloom Studio</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-amber-50">
              Timeless Weaves from the Heart of <span className="text-amber-300">Madurai</span>
            </h1>

            <p className="text-sm sm:text-base text-amber-100/90 max-w-2xl leading-relaxed">
              Discover hand-knotted Madurai Sungudi cottons, Silk Mark certified Kanchipuram bridal pattu, and bespoke Aari embroidered blouses crafted by master artisans on West Masi Street.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-amber-400 text-[#4a000d] hover:bg-amber-300 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Explore Collections
              </Link>

              <Link
                href="/custom-stitching"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-amber-200/30 text-amber-100 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                <Scissors className="w-4 h-4" />
                Custom Blouse &amp; Aari
              </Link>
            </div>

            {/* Quick Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200/15 max-w-lg">
              <div>
                <p className="font-serif font-black text-xl sm:text-2xl text-amber-300">100%</p>
                <p className="text-[11px] text-amber-100/80">Silk Mark &amp; Pure Cotton</p>
              </div>
              <div>
                <p className="font-serif font-black text-xl sm:text-2xl text-amber-300">72 Hr</p>
                <p className="text-[11px] text-amber-100/80">Express Bridal Tailoring</p>
              </div>
              <div>
                <p className="font-serif font-black text-xl sm:text-2xl text-amber-300">4.9 ★</p>
                <p className="text-[11px] text-amber-100/80">Madurai &amp; Global Brides</p>
              </div>
            </div>
          </div>

          {/* Hero Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-amber-200/25 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-900 relative">
                <img
                  src={
                    lookbook[0]?.image ||
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
                  }
                  alt="Madurai Bridal Silk & Sungudi Showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/85 backdrop-blur-sm p-3.5 rounded-xl border border-amber-400/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                    Featured Festive Drape
                  </span>
                  <p className="font-serif font-bold text-sm text-white mt-0.5">
                    {lookbook[0]?.productName || 'Kanchipuram Temple Border & Madurai Sungudi'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value & Boutique Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#780016]/10 text-[#780016] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Heritage Handlooms</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Authentic Madurai Sungudi knot-dyed cottons and Silk Mark certified Kanchipuram bridal silks.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#780016]/10 text-[#780016] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Master Aari Craft</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Intricate peacock motifs, zardosi, and temple-border bridal blouse work by seasoned artisans.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#780016]/10 text-[#780016] flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Precision Fit Guarantee</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              In-studio trials at West Masi Street or guided video measurement consultations for outstation orders.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#780016]/10 text-[#780016] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">TN COD &amp; Express Ship</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Same-day Madurai pickup, Cash on Delivery across Tamil Nadu, and tracked worldwide shipping.
            </p>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#780016]">Curated Wardrobe</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Shop by Occasion &amp; Weave
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#780016] hover:underline inline-flex items-center gap-1"
          >
            View All Collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Madurai Sungudi Cotton',
              subtitle: 'Breathable traditional tie-dye sarees',
              tag: 'Daily & Temple Wear',
              href: '/shop?category=sungudi'
            },
            {
              title: 'Kanchipuram Bridal Silk',
              subtitle: 'Pure zari korvai & muhurtham drapes',
              tag: 'Wedding Collection',
              href: '/shop?category=kanchipuram'
            },
            {
              title: 'Bridal Aari Blouses',
              subtitle: 'Custom-stitched maggam & stone work',
              tag: 'Bespoke Tailoring',
              href: '/custom-stitching'
            },
            {
              title: 'Pavadai Dhavani Sets',
              subtitle: 'Festive half-sarees for teens & brides',
              tag: 'Festive Favorites',
              href: '/shop?category=dhavani'
            }
          ].map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#780016]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  {cat.tag}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#780016] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-stone-600">{cat.subtitle}</p>
              </div>
              <span className="text-xs font-bold text-[#780016] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Instagram Lookbook & Affiliate Styling Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#780016] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" /> @ahalya_madurai Lookbook
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Shop Our Styled Reels &amp; Client Drapes
            </h2>
          </div>
          <Link
            href="/trending"
            className="text-xs font-bold text-[#780016] hover:underline inline-flex items-center gap-1"
          >
            See All Trending Deals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {lookbook.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-stone-200 text-center space-y-2">
            <p className="font-serif font-bold text-stone-800">New Festive Lookbook Loading Soon</p>
            <p className="text-xs text-stone-500">
              Visit our West Masi Street studio or browse our curated boutique collections.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lookbook.map((item) => {
              const itemId = item.id || item.code;
              return (
                <div
                  key={itemId}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Edge-to-edge 3:4 Portrait Container */}
                    <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.tag}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                          Image Preview
                        </div>
                      )}

                      <span className="absolute top-3 left-3 bg-white/95 text-[#780016] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {item.tag}
                      </span>

                      <span className="absolute top-3 right-3 bg-stone-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        {item.platform || 'Amazon'}
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-800">{item.username}</span>
                        <span className="inline-flex items-center gap-1 text-rose-600 font-semibold">
                          <Heart className="w-3.5 h-3.5 fill-rose-600" /> {item.likes || '1.2k'}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{item.caption}</p>

                      {item.price > 0 && (
                        <p className="text-sm font-black text-[#780016]">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    {item.buyUrl ? (
                      <a
                        href={item.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#780016] hover:bg-[#5e0011] text-amber-200 font-bold text-xs py-3 rounded-xl transition-colors shadow-sm"
                      >
                        Shop Look on {item.platform || 'Amazon'}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href="/book-appointment"
                        className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-3 rounded-xl transition-colors"
                      >
                        Enquire Custom Drape
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Curated Marketplace Deals (If Available in CMS) */}
      {affiliates.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#780016]">Stylist Approved</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Handpicked Jewellery &amp; Draping Essentials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {affiliates.slice(0, 4).map((aff) => (
              <div
                key={aff.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-stone-100 overflow-hidden relative">
                    <img src={aff.image} alt={aff.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 right-2.5 bg-stone-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                      {aff.platform}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-stone-400">{aff.category}</span>
                    <h3 className="font-bold text-sm text-stone-900 line-clamp-2">{aff.title}</h3>
                    <p className="text-sm font-black text-[#780016]">₹{aff.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <a
                    href={aff.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs py-2.5 rounded-xl transition-colors"
                  >
                    View Deal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Stitching & Studio Appointment Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-[#780016] rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300">
              Bespoke Bridal &amp; Everyday Tailoring
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-amber-50 leading-tight">
              Need a Custom Aari Blouse or Saree Fall &amp; Pico Before Your Function?
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
              Visit our flagship boutique on West Masi Street, Madurai for personal fabric pairing and measurement trials, or book a doorstep blouse sample pickup.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/custom-stitching"
                className="bg-amber-400 hover:bg-amber-300 text-[#4a000d] font-bold text-xs px-5 py-3 rounded-xl transition-colors"
              >
                Submit Stitching Request
              </Link>
              <Link
                href="/book-appointment"
                className="bg-white/10 hover:bg-white/20 border border-amber-200/30 text-amber-100 font-bold text-xs px-5 py-3 rounded-xl transition-colors"
              >
                Book Studio Visit
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/10 border border-amber-200/20 rounded-2xl p-5 space-y-3 text-xs">
            <p className="font-serif font-bold text-base text-amber-300">Madurai Flagship Studio</p>
            <div className="flex items-start gap-2.5 text-amber-100">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>West Masi Street, Near Meenakshi Amman Temple, Madurai, Tamil Nadu 625001</span>
            </div>
            <div className="flex items-center gap-2.5 text-amber-100">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Mon – Sun: 10:00 AM – 9:00 PM IST</span>
            </div>
            <div className="flex items-center gap-2.5 text-amber-100">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Silk Mark Certified Authentic Handlooms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <span className="font-serif font-black text-xl text-amber-300 block">Ahalya&apos;s Boutique</span>
            <p className="text-stone-400 leading-relaxed">
              Celebrating Madurai&apos;s weaving legacy with authentic Sungudi cottons, Kanchipuram silks, and handcrafted Aari bridal couture.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li><Link href="/shop" className="hover:text-amber-300">Madurai Sungudi Sarees</Link></li>
              <li><Link href="/shop" className="hover:text-amber-300">Kanchipuram Pattu Silks</Link></li>
              <li><Link href="/shop" className="hover:text-amber-300">Pavadai Dhavani Sets</Link></li>
              <li><Link href="/trending" className="hover:text-amber-300">Curated Festive Deals</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li><Link href="/custom-stitching" className="hover:text-amber-300">Bridal Aari Embroidery</Link></li>
              <li><Link href="/book-appointment" className="hover:text-amber-300">In-Store Trial Booking</Link></li>
              <li><Link href="/about" className="hover:text-amber-300">Our Weaver Story</Link></li>
              <li><Link href="/contact" className="hover:text-amber-300">Contact &amp; Directions</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider">Store &amp; Admin</h4>
            <p className="text-stone-400">West Masi Street, Madurai, TN</p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-block text-[11px] font-semibold text-stone-400 hover:text-amber-300 border border-stone-700 px-3 py-1.5 rounded-lg"
              >
                Staff CMS Login
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 py-5 px-4 text-center text-[11px] text-stone-500">
          &copy; {new Date().getFullYear()} Ahalya&apos;s Boutique, Madurai. All rights reserved.
        </div>
      </footer>
    </div>
  );
}