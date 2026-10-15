'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products, lookbookItems as initialLookbook, LookbookItem } from '../lib/products';
import { ShoppingBag, Scissors, CheckCircle2, Star, MapPin, ArrowRight, ExternalLink, Phone } from 'lucide-react';
import ShoppingExperience from '../components/ShoppingExperience';
import { addCustomerAppointment, getCMSLookbook } from '../lib/cmsStore';

export default function HomePage() {
  const [liveLookbook, setLiveLookbook] = useState<LookbookItem[]>(initialLookbook);

  useEffect(() => {
    // Load current saved items from admin
    const stored = getCMSLookbook();
    if (stored && stored.length > 0) {
      setLiveLookbook(stored);
    }

    // Listen for live updates from admin in same session
    const handleUpdate = () => {
      setLiveLookbook(getCMSLookbook());
    };
    window.addEventListener('lookbook_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('lookbook_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    serviceType: 'Bridal Aari Work Blouse',
    appointmentMode: 'In-Store Trial Madurai Studio',
    preferredDate: '',
    preferredTime: '11:00 AM – 01:00 PM',
    referralCode: '',
    notes: '',
  });

  const handleQuickAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addCustomerAppointment({
      name: quickForm.name,
      phone: quickForm.phone,
      serviceType: quickForm.serviceType,
      appointmentMode: quickForm.appointmentMode,
      preferredDate: quickForm.preferredDate,
      preferredTime: quickForm.preferredTime,
      referralCode: quickForm.referralCode,
      notes: quickForm.notes,
    });

    const referralText = quickForm.referralCode
      ? `%0A*Referral Code Applied:* ${encodeURIComponent(quickForm.referralCode)} 10% Off Stitching Quote`
      : '';

    const msg = `*Quick Fitting Appointment Booking - Ahalya's Boutique*%0A%0A*Name:* ${encodeURIComponent(quickForm.name)}%0A*Phone:* ${encodeURIComponent(quickForm.phone)}%0A*Service:* ${encodeURIComponent(quickForm.serviceType)}%0A*Preferred Date:* ${encodeURIComponent(quickForm.preferredDate)}${referralText}`;

    window.open(`https://wa.me/919443215678?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-12 font-sans bg-[#fcfaf7]">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[#f8ede3] text-[#780016] border border-[#ecd2bf] text-xs font-semibold px-3 py-1 rounded-full">
              ✨ Madurai benchmark in traditional couture
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#780016] leading-tight">
              Elegance Woven for <br />
              <span className="text-[#a46e30]">the Tamil Soul</span>
            </h1>
            <p className="text-stone-600 text-sm max-w-lg leading-relaxed">
              Authentic Madurai Sungudi cottons, bespoke Kanchipuram bridal drapes, and high-fashion hand-embroidered aari blouses tailored to perfection.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/shop"
                className="bg-[#780016] hover:bg-[#600012] text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-sm transition"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Now
              </Link>
              <Link
                href="/custom-stitching"
                className="bg-[#fcfaf7] hover:bg-stone-100 text-[#780016] border border-[#a46e30]/40 text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <Scissors className="w-4 h-4 text-[#a46e30]" />
                Custom Stitching
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 text-[11px] text-stone-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Pure Silk Mark</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Guaranteed Fit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> All TN Shipping</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                alt="Madurai Heritage Edition Saree"
                className="w-full h-[450px] object-cover"
              />
              <span className="absolute top-4 right-4 bg-teal-800 text-teal-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ★ Madurai Handlooms
              </span>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                  Madurai Heritage Edition
                </span>
                <h3 className="font-serif font-bold text-lg">Kanchipuram Silk with Temple Borders</h3>
                <p className="text-xs text-stone-300 mt-0.5">Code: AB-101 • ₹14,500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Physical Visit vs Online Shopping Selector */}
      <ShoppingExperience />

      {/* 3. Curated Picks Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Handpicked Handlooms</span>
            <h2 className="text-2xl font-serif font-bold text-[#780016]">Curated Festive & Bridal Picks</h2>
            <p className="text-xs text-stone-500 mt-0.5">Hand-picked Kanchipuram silks, Madurai Sungudi cottons, and artisan aari embroidery.</p>
          </div>
          <Link href="/shop" className="text-[#780016] text-xs font-semibold hover:underline flex items-center gap-1">
            View Full Catalogue <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-[#ede3d8] overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[3/4] bg-stone-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#780016] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.code}
                  </span>
                  <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium text-stone-800 text-xs leading-snug line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="text-[11px] text-stone-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <a
                  href={`https://wa.me/919443215678?text=I%20want%20to%20order%20${encodeURIComponent(item.name)}%20${item.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3 h-3 fill-current" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sponsored Partner Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[#2a131b] via-[#3d1822] to-[#1a1215] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-900/40">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Wedding Partner • Sri Meenakshi Swarna Mahal Jewellers - West Masi St, Madurai
            </span>
            <h3 className="text-lg font-serif font-bold text-amber-100">
              Antique Temple Jewellery 0% Making Charge on Bridal Bookings
            </h3>
            <p className="text-xs text-stone-300">Special Madurai verified partner privileges for Ahalya patrons</p>
          </div>
          <button className="bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shrink-0 transition">
            Enquire Sponsor <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. Browse By Category */}
      <section className="max-w-7xl mx-auto px-6 space-y-6 text-center">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Heritage Collections</span>
          <h2 className="text-2xl font-serif font-bold text-[#780016]">Browse By Category</h2>
          <p className="text-xs text-stone-500 mt-1">Select any collection to view full details and designs</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { 
              name: "Sarees", 
              count: "140+ Designs", 
              desc: "Sungudi & Kanchi Silks",
              img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80",
              href: "/shop?category=Sarees"
            },
            { 
              name: "Blouses", 
              count: "85+ Patterns", 
              desc: "Artisan Aari & Zardosi",
              img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
              href: "/shop?category=Blouses"
            },
            { 
              name: "Kurtis", 
              count: "60+ Styles", 
              desc: "Cotton & Anarkali Sets",
              img: "https://images.unsplash.com/photo-1596783074418-c44ab83dbff5?auto=format&fit=crop&w=500&q=80",
              href: "/shop?category=Kurtis"
            },
            { 
              name: "Bridal Wear", 
              count: "Bespoke Sets", 
              desc: "Muhurtham & Half Sarees",
              img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
              href: "/shop?category=Bridal Wear"
            },
            { 
              name: "Kids Wear", 
              count: "25+ Styles", 
              desc: "Pattu Pavadai & Dhotis",
              img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80",
              href: "/shop?category=Kids Wear"
            }
          ].map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer border-2 border-[#ebdccd] block shadow-sm hover:border-[#780016] transition"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5 text-left">
                <span className="font-serif font-bold text-white text-base group-hover:text-amber-200 transition">
                  {cat.name}
                </span>
                <span className="text-[10px] text-amber-300 font-semibold">{cat.desc}</span>
                <span className="text-[10px] text-stone-300 mt-0.5">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Trending on Instagram Feed - Reads Live Changes from Admin */}
      <section className="max-w-7xl mx-auto px-6 space-y-6 font-sans">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
              📷 @ahalyas_boutique_madurai
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#780016]">Trending on Instagram</h2>
            <p className="text-xs text-stone-500 mt-0.5">Real brides and festive style inspirations tagged with #AhalyasMadurai</p>
          </div>
          <Link href="/trending" className="border border-[#780016] text-[#780016] text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-rose-50 transition">
            View Lookbook
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liveLookbook.map((look, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#ede3d8] overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="p-3 flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-800">{look.username}</span>
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{look.tag}</span>
                </div>
                
                <a
                  href={look.buyUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-square group overflow-hidden"
                >
                  <img
                    src={look.image}
                    alt={look.tag}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                    ❤️ {look.likes || '1.2k'}
                  </span>
                  <span className="absolute top-3 right-3 bg-stone-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {look.platform || 'Amazon'}
                  </span>
                </a>

                <p className="p-3 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {look.caption}
                </p>
              </div>

              <div className="p-3 border-t border-stone-100 flex justify-between items-center text-xs">
                <span className="text-stone-500 font-mono text-[10px]">Product: <strong>{look.code}</strong></span>
                <a
                  href={look.buyUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#780016] font-bold flex items-center gap-1 hover:underline"
                >
                  Buy this Look on {look.platform || 'Amazon'} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Custom Stitching Quick Appointment Form */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#fffdfa] border border-[#ebdccd] rounded-3xl p-8 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="inline-block bg-[#f8ede3] text-[#780016] border border-[#ecd2bf] text-xs font-semibold px-3 py-1 rounded-full">
              ✂ Madurai Bespoke Tailoring
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#780016]">
              Bespoke Bridal & Custom Tailoring
            </h2>
            <p className="text-stone-600 text-xs leading-relaxed">
              Madurai master craftsmen craft your dream silhouette with precision measurements.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-stone-600">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" /> Direct fitting at Madurai store or send your sample blouse</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" /> Express 7-10 day stitching with video fitting consultation</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" /> Safe 40% advance booking with full tracking</div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#ebdccd] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-[#780016] text-base">Quick Stitching & Fitting Appointment</h3>
            
            <form onSubmit={handleQuickAppointmentSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-stone-900 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                    placeholder="e.g. Meenakshi Sundaram"
                    className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold placeholder:text-stone-400 focus:outline-none focus:border-[#780016]"
                  />
                </div>

                <div>
                  <label className="block text-stone-900 font-bold mb-1">Phone Number WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={quickForm.phone}
                    onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                    placeholder="+91 98420 XXXXX"
                    className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold placeholder:text-stone-400 focus:outline-none focus:border-[#780016]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-stone-900 font-bold mb-1">Dress Type *</label>
                  <select
                    value={quickForm.serviceType}
                    onChange={(e) => setQuickForm({ ...quickForm, serviceType: e.target.value })}
                    className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#780016] cursor-pointer"
                  >
                    <option value="Bridal Aari Work Blouse">Bridal Aari Work Blouse</option>
                    <option value="Designer Saree Blouse">Designer Saree Blouse</option>
                    <option value="Pavadai Dhavani Half Saree">Pavadai Dhavani Half Saree</option>
                    <option value="Kids Pattu Pavadai / Dhoti">Kids Pattu Pavadai / Dhoti</option>
                    <option value="Anarkali / Salwar Suit">Anarkali / Salwar Suit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-900 font-bold mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={quickForm.preferredDate}
                    onChange={(e) => setQuickForm({ ...quickForm, preferredDate: e.target.value })}
                    className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#780016] cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-900 font-bold mb-1">Referral Code Optional</label>
                <input
                  type="text"
                  value={quickForm.referralCode}
                  onChange={(e) => setQuickForm({ ...quickForm, referralCode: e.target.value.toUpperCase() })}
                  placeholder="E.G. ABI56 10% OFF"
                  className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-bold uppercase placeholder:text-stone-400 focus:outline-none focus:border-[#780016]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#780016] hover:bg-[#600012] text-white text-xs font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Scissors className="w-3.5 h-3.5" />
                Submit & Connect on WhatsApp
              </button>

              <p className="text-[10px] text-stone-500 text-center">
                Note: 40% advance required upon design confirmation. Free delivery within Tamil Nadu for orders above ₹3,000.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 8. Patron Testimonials */}
      <section className="max-w-7xl mx-auto px-6 space-y-6 text-center">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Authentic Reviews</span>
          <h2 className="text-2xl font-serif font-bold text-[#780016]">Voices of Our Cherished Patrons</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              quote: "The aari work on my Muhurtham blouse was breathtaking. The temple jewelry motifs and finishing were completely unmatchable even compared to top Chennai designers.",
              name: "Sowmya Radhakrishnan",
              loc: "Madurai KK Nagar",
              tag: "Custom Bridal Aari Blouse"
            },
            {
              quote: "Ordered 3 Madurai Sungudi cotton sarees via WhatsApp. The colours were true to photos, softest cotton weave, and delivered in 2 days across Tamil Nadu!",
              name: "Kavitha Thirunavukkarasu",
              loc: "Coimbatore RS Puram",
              tag: "Madurai Sungudi Sarees"
            },
            {
              quote: "Ahalya's Boutique provided video measurement guidance. The fitting for my sister's wedding half saree was 100% accurate. So proud of our Madurai artisans!",
              name: "Ananya S.",
              loc: "Chennai Mylapore",
              tag: "Pavadai Dhavani Set"
            }
          ].map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#ede3d8] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 italic leading-relaxed">&ldquo;{rev.quote}&rdquo;</p>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between items-end">
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">{rev.name}</h4>
                  <p className="text-[10px] text-teal-700 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {rev.loc}
                  </p>
                </div>
                <span className="text-[9px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Visit Flagship Store */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#fffdfa] border border-[#ebdccd] rounded-3xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Flagship Store</span>
            <h2 className="text-2xl font-serif font-bold text-[#780016]">Visit Our Boutique in Madurai</h2>
            <div className="space-y-2 text-xs text-stone-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#780016] shrink-0 mt-0.5" />
                <span>No. 42, West Masi Street Near South Chithirai Gate, Opposite Sri Meenakshi Temple, Madurai - 625001, Tamil Nadu.</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-stone-800">Hours:</span> Mon – Sun: 9:30 AM – 9:30 PM All 7 Days Open
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-stone-800">Phone:</span> +91 94432 15678 / 0452-2345678
              </p>
            </div>
            <a
              href="https://wa.me/919443215678?text=Please%20send%20store%20Google%20Map%20location"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#780016] hover:bg-[#600012] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm transition"
            >
              <MapPin className="w-3.5 h-3.5" />
              Request Store Location on WhatsApp
            </a>
          </div>

          <div className="bg-[#f0ece6] rounded-2xl border border-[#dfd6cb] p-6 h-64 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center text-[11px] text-stone-500">
              <span className="font-semibold text-[#780016]">Madurai Heritage Precinct</span>
              <span>Lat: 9.9195° N, Long: 78.1193° E</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#780016] text-white flex items-center justify-center shadow-lg ring-4 ring-rose-100">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
              <div className="inline-block bg-[#780016] text-white font-bold text-xs px-3 py-1 rounded-md shadow">
                Ahalya&apos;s Boutique Madurai
              </div>
              <p className="text-[11px] text-stone-600 font-medium">2 mins walk from Madurai West Tower</p>
            </div>
            <div className="text-right text-[10px] text-stone-400">
              Interactive Map Simulation • Click to navigate
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}