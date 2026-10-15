'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `Hello Ahalya's Boutique,%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A*Enquiry:* ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/919443215678?text=${whatsappMsg}`, '_blank');
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* 1. Header Section */}
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#a46e30]">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#780016]">
            Connect with Our Madurai Studio
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Have an enquiry about a saree code, wedding order, or aari work slot? Speak directly with our team.
          </p>
        </div>

        {/* 2. Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Store Location + WhatsApp Concierge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Store Location Card */}
            <div className="bg-white border border-[#ecdccd] rounded-3xl p-7 shadow-sm space-y-5">
              <h2 className="text-lg font-serif font-bold text-[#780016]">
                Flagship Store Location
              </h2>

              <div className="space-y-1 text-xs text-stone-700 leading-relaxed">
                <p className="font-bold text-stone-900 text-sm">Ahalya&apos;s Boutique</p>
                <p>42, West Masi Street (Near South Chithirai St corner),</p>
                <p>Opposite Sri Meenakshi Sundareswarar Temple,</p>
                <p>Madurai - 625001, Tamil Nadu, India.</p>
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-1.5 text-xs text-stone-700">
                <p>
                  <span className="font-semibold text-stone-900">Phone:</span>{' '}
                  <a href="tel:+919443215678" className="hover:text-[#780016]">+91 94432 15678</a>
                </p>
                <p>
                  <span className="font-semibold text-stone-900">WhatsApp Orders:</span>{' '}
                  <a href="https://wa.me/919443215678" target="_blank" rel="noopener noreferrer" className="hover:text-[#780016]">+91 94432 15678</a>
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Email:</span>{' '}
                  <a href="mailto:boutique@ahalyasmadurai.in" className="hover:text-[#780016]">boutique@ahalyasmadurai.in</a>
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Hours:</span> 9:30 AM – 9:30 PM (All 7 Days Open)
                </p>
              </div>
            </div>

            {/* Instant WhatsApp Concierge Box */}
            <div className="bg-[#eefbf4] border border-[#c6eed5] rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
                <Phone className="w-4 h-4 fill-current text-emerald-700" />
                <span>Instant WhatsApp Concierge</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Need immediate answers regarding saree stock or blouse delivery timelines?
              </p>
              <a
                href="https://wa.me/919443215678?text=Hello%20Ahalya's%20Boutique,%20I%20have%20an%20urgent%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                Chat on WhatsApp Now
              </a>
            </div>

          </div>

          {/* Right Column (7 Cols): Send an Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#ecdccd] rounded-3xl p-7 sm:p-9 shadow-sm">
              <h2 className="text-lg font-serif font-bold text-[#780016] mb-5">
                Send an Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyadarshini"
                    className="w-full bg-[#fdfcfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#780016] transition"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">
                    WhatsApp Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98420 XXXXX"
                    className="w-full bg-[#fdfcfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#780016] transition"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full bg-[#fdfcfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#780016] transition"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1.5">
                    Your Message or Enquiry *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the sarees or custom blouse style you are looking for..."
                    className="w-full bg-[#fdfcfb] border border-stone-200 rounded-xl p-3.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#780016] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#780016] hover:bg-[#600012] text-white text-xs font-semibold py-3.5 rounded-xl shadow transition"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}