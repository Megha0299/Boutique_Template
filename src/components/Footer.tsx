import Link from 'next/link';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#241712] text-[#d6c5b8] pt-14 pb-8 border-t-2 border-[#780016] font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3c2a21]">
        
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#780016] text-amber-300 flex items-center justify-center font-bold text-sm">
              அ
            </div>
            <span className="text-base font-serif font-bold text-white tracking-wide">
              Ahalya&apos;s Boutique
            </span>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Handcrafted with devotion in the Temple City of Madurai. Celebrating the feminine grace of Tamil Nadu.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://wa.me/919443215678" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-rose-600 text-white flex items-center justify-center hover:opacity-90 transition"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-amber-300 text-sm">Explore & Shop</h3>
          <ul className="space-y-2 text-stone-400">
            <li><Link href="/shop" className="hover:text-amber-200 transition">Madurai Sungudi Sarees</Link></li>
            <li><Link href="/shop" className="hover:text-amber-200 transition">Kanchipuram Silk drapes</Link></li>
            <li><Link href="/shop" className="hover:text-amber-200 transition">Artisan Aari Work Blouses</Link></li>
            <li><Link href="/shop" className="hover:text-amber-200 transition">Chettinad Pavadai Dhavani</Link></li>
            <li><Link href="/trending" className="hover:text-amber-200 transition">Instagram Lookbook</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-amber-300 text-sm">Patron Care & Orders</h3>
          <ul className="space-y-2 text-stone-400">
            <li><Link href="/custom-stitching" className="hover:text-amber-200 transition">Custom Stitching Guide</Link></li>
            <li><Link href="/book-appointment" className="hover:text-amber-200 transition">Madurai In-Store Fitting</Link></li>
            <li><Link href="/contact" className="hover:text-amber-200 transition">Track Tamil Nadu Parcel</Link></li>
            <li><Link href="/admin" className="hover:text-amber-200 transition">Store Owner Login</Link></li>
            <li className="text-amber-400 font-semibold">COD Available Across TN</li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-amber-300 text-sm">Madurai Studio</h3>
          <div className="space-y-2 text-stone-400">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>42, West Masi Street, Opposite Meenakshi Temple, Madurai - 625001.</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Mon-Sun: 9:30 AM to 9:30 PM</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <span>+91 94432 15678</span>
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col md:flex-row justify-between items-center text-stone-400 text-[11px] gap-4">
        <p>© 2026 Ahalya&apos;s Boutique (அகல்யாஸ் புட்டிக்), Madurai. All Rights Reserved.</p>
        <div className="flex gap-4">
          <span>Handloom Mark Certified</span>
          <span>•</span>
          <span>Silk Mark India</span>
          <span>•</span>
          <span>Made with devotion in Madurai</span>
        </div>
      </div>
    </footer>
  );
}