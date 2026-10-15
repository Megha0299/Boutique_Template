'use client';

import Link from 'next/link';
import { Scissors, CheckCircle2, Clock, Ruler, Sparkles, Phone, ArrowRight } from 'lucide-react';

const STITCHING_SERVICES = [
  {
    title: 'Bridal Aari & Maggam Work',
    tamilTitle: 'மணப்பெண் மாக்கம் ஆரி வேலைப்பாடு',
    time: '7 – 12 Days',
    price: 'From ₹3,500',
    desc: 'Intricate zardozi, kundan stones, French knots, cut-work, and customized temple motifs crafted on mulberry silk or velvet.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Designer Saree Blouse Fitting',
    tamilTitle: 'டிசைனர் புடவை பிளவுஸ்',
    time: '3 – 5 Days',
    price: 'From ₹850',
    desc: 'Princess cut, boat neck, backless pot neck, padded cups, and elbow-length puff sleeves with guaranteed zero-wrinkle armholes.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Traditional Pavadai Dhavani & Lehengas',
    tamilTitle: 'பாரம்பரிய தாவணி & லெஹெங்கா செட்',
    time: '5 – 8 Days',
    price: 'From ₹2,200',
    desc: 'Can-can flare additions, hand-pleated silk skirts with gold zari borders, and tailored hip-belt (Oddiyanam) matching pieces.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Chettinad Kurti & Salwar Suits',
    tamilTitle: 'சுடிதார் & அனார்கலி தையல்',
    time: '3 – 4 Days',
    price: 'From ₹650',
    desc: 'Comfortable handloom cuts, custom yoke borders, straight-pant tailoring, and feeding-friendly zip adaptations on request.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Choose Style or Blouse Code',
    desc: 'Select from our catalog or share your reference blouse photos directly over WhatsApp.',
  },
  {
    step: '02',
    title: 'Provide Measurements',
    desc: 'Visit our Madurai West Masi store, courier your perfect-fit sample blouse, or book a live video measurement session.',
  },
  {
    step: '03',
    title: 'Crafting & Quality Check',
    desc: 'Our Madurai master tailors craft your silhouette with double-stitch seams and 2-inch margin allowances.',
  },
  {
    step: '04',
    title: 'Trial or Tracked Delivery',
    desc: 'Try it in-store or get express tracked doorstep delivery anywhere in Tamil Nadu.',
  },
];

export default function CustomStitchingPage() {
  return (
    <div className="bg-[#fcfaf7] min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#780016] bg-[#f8ede3] border border-[#ecd2bf] px-3.5 py-1 rounded-full">
            <Scissors className="w-3.5 h-3.5 text-[#780016]" />
            Bespoke Madurai Couture
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#780016]">
            Custom Tailoring & Aari Embroidery
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            From regal Muhurtham bridal blouses to everyday Sungudi kurtis — cut and hand-stitched with millimeter accuracy by Madurai&apos;s senior master craftsmen.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/book-appointment"
              className="bg-[#780016] hover:bg-[#600012] text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Book In-Store Measurement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/919443215678?text=Hello%20Ahalya's%20Boutique,%20I%20want%20a%20price%20quote%20for%20custom%20blouse%20stitching"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow-sm inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Get WhatsApp Quote</span>
            </a>
          </div>
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STITCHING_SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#ede3d8] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center group hover:shadow-md transition"
            >
              <div className="w-full sm:w-44 h-48 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                <img src={srv.image} alt={srv.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="flex-1 space-y-2.5 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#780016] text-sm">{srv.price}</span>
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" /> {srv.time}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                  {srv.title}
                </h3>
                <p className="text-[11px] text-teal-800 font-semibold">{srv.tamilTitle}</p>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">{srv.desc}</p>
                <div className="pt-1">
                  <a
                    href={`https://wa.me/919443215678?text=I%20am%20interested%20in%20${encodeURIComponent(srv.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#780016] hover:underline inline-flex items-center gap-1"
                  >
                    Enquire for this service <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Process Section */}
        <div className="bg-[#fffdfa] border border-[#ebdccd] rounded-3xl p-8 lg:p-12 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">How It Works</span>
            <h2 className="text-2xl font-serif font-bold text-[#780016]">Your 4-Step Tailoring Journey</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((st) => (
              <div key={st.step} className="bg-white border border-[#eedfd1] rounded-2xl p-5 shadow-xs space-y-3">
                <span className="font-serif font-bold text-2xl text-[#780016]/40">{st.step}</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm">{st.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-700">
          <div className="bg-white border border-[#ecdccd] rounded-2xl p-5 flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
            <div>
              <p className="font-bold text-stone-900">100% Fit Guarantee</p>
              <p className="text-stone-500">Free alteration within 7 days if fitting isn&apos;t flawless.</p>
            </div>
          </div>
          <div className="bg-white border border-[#ecdccd] rounded-2xl p-5 flex items-center gap-3 shadow-xs">
            <Ruler className="w-6 h-6 text-teal-600 shrink-0" />
            <div>
              <p className="font-bold text-stone-900">2-Inch Safe Seam Margin</p>
              <p className="text-stone-500">Ample inner fabric margin included for future body adjustments.</p>
            </div>
          </div>
          <div className="bg-white border border-[#ecdccd] rounded-2xl p-5 flex items-center gap-3 shadow-xs">
            <Sparkles className="w-6 h-6 text-teal-600 shrink-0" />
            <div>
              <p className="font-bold text-stone-900">Authentic Materials</p>
              <p className="text-stone-500">Only rust-free hooks, braided dori cords, and genuine zari threads.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}