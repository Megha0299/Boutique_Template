'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, Scissors, Phone, Tag } from 'lucide-react';
import { addCustomerAppointment } from '../../lib/cmsStore';

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'Bridal Aari Work Blouse (மணப்பெண் ஆரி)',
    appointmentMode: 'In-Store Trial (Madurai Studio)',
    preferredDate: '',
    preferredTime: '11:00 AM – 01:00 PM',
    referralCode: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Await saving directly into Firestore / Admin Portal Database
      await addCustomerAppointment({
        name: formData.name,
        phone: formData.phone,
        serviceType: formData.serviceType,
        appointmentMode: formData.appointmentMode,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        referralCode: formData.referralCode,
        notes: formData.notes,
      });

      // 2. Format WhatsApp concierge text with referral discounts
      const referralText = formData.referralCode
        ? `%0A*Referral Code Applied:* ${encodeURIComponent(formData.referralCode)} (10% Off Stitching Quote)`
        : '';

      const msg = `*New Fitting Appointment Booking - Ahalya's Boutique*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Service:* ${encodeURIComponent(formData.serviceType)}%0A*Mode:* ${encodeURIComponent(formData.appointmentMode)}%0A*Preferred Date:* ${encodeURIComponent(formData.preferredDate)}%0A*Time Slot:* ${encodeURIComponent(formData.preferredTime)}${referralText}%0A*Notes:* ${encodeURIComponent(formData.notes || 'None')}`;

      // 3. Open WhatsApp for instant customer concierge
      window.open(`https://wa.me/919443215678?text=${msg}`, '_blank');

      // 4. Reset form state after successful write
      setFormData({
        name: '',
        phone: '',
        serviceType: 'Bridal Aari Work Blouse (மணப்பெண் ஆரி)',
        appointmentMode: 'In-Store Trial (Madurai Studio)',
        preferredDate: '',
        preferredTime: '11:00 AM – 01:00 PM',
        referralCode: '',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to save appointment to Firebase:', error);
      alert('Could not save booking to database. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* Title */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#a46e30]">
            <Calendar className="w-3.5 h-3.5" />
            Reserve Your Designer Slot
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#780016]">
            Book a Fitting & Consultation
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Meet our master designer at West Masi Street, Madurai, or schedule a personalized video call fitting from anywhere in the world.
          </p>
        </div>

        {/* 2-Column Booking Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Address (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#ecdccd] rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
              <h2 className="text-lg font-serif font-bold text-[#780016]">
                Studio Consultation Highlights
              </h2>
              
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>One-on-one session with master aari designer Smt. Ahalya.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Browse physical thread cards, genuine silk swatches, and stone catalogs.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Exact 18-point bodily measurement recording for blouse contouring.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Free blouse trial with same-day on-the-spot alterations.</span>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-700">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#780016] shrink-0 mt-0.5" />
                  <span>42, West Masi Street, Near South Chithirai Gate, Madurai - 625001</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Open 7 Days: 9:30 AM – 9:30 PM</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Helpline: +91 94432 15678</span>
                </p>
              </div>
            </div>

            {/* Video Call Note */}
            <div className="bg-[#f8f2eb] border border-[#ebdccf] rounded-2xl p-5 text-xs text-stone-700 space-y-1.5">
              <span className="font-bold text-[#780016] block">Outside Madurai or Abroad?</span>
              <p className="text-stone-600 leading-relaxed">
                Choose <strong>&ldquo;WhatsApp Video Consultation&rdquo;</strong> in the form. Our measurement team will guide you live step-by-step with a tape!
              </p>
            </div>
          </div>

          {/* Right Column: Appointment Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#ecdccd] rounded-3xl p-7 sm:p-9 shadow-sm">
              <h2 className="text-lg font-serif font-bold text-[#780016] mb-5">
                Reserve Fitting Slot
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-900 font-bold mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sowmya Radhakrishnan"
                      className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold placeholder:text-stone-400 focus:outline-none focus:border-[#780016] shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-900 font-bold mb-1.5">WhatsApp Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98420 XXXXX"
                      className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold placeholder:text-stone-400 focus:outline-none focus:border-[#780016] shadow-2xs"
                    />
                  </div>
                </div>

                {/* Consultation Mode & Garment Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-900 font-bold mb-1.5">Consultation Mode *</label>
                    <select
                      value={formData.appointmentMode}
                      onChange={(e) => setFormData({ ...formData, appointmentMode: e.target.value })}
                      className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#780016] shadow-2xs cursor-pointer"
                    >
                      <option value="In-Store Trial (Madurai Studio)">In-Store Trial (Madurai Studio)</option>
                      <option value="WhatsApp Video Consultation">WhatsApp Video Consultation</option>
                      <option value="Send Sample Blouse via Courier">Send Sample Blouse via Courier</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-900 font-bold mb-1.5">Garment / Service *</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#780016] shadow-2xs cursor-pointer"
                    >
                      <option value="Bridal Aari Work Blouse (மணப்பெண் ஆரி)">Bridal Aari Work Blouse (மணப்பெண் ஆரி)</option>
                      <option value="Designer Saree Blouse">Designer Saree Blouse</option>
                      <option value="Pavadai Dhavani Half Saree">Pavadai Dhavani Half Saree</option>
                      <option value="Anarkali / Salwar Kurti">Anarkali / Salwar Kurti</option>
                      <option value="Mother & Daughter Matching Combo">Mother & Daughter Matching Combo</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Preferred Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-900 font-bold mb-1.5">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#780016] shadow-2xs cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-900 font-bold mb-1.5">Preferred Time Slot *</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#780016] shadow-2xs cursor-pointer"
                    >
                      <option value="10:00 AM – 12:00 PM (Morning)">10:00 AM – 12:00 PM (Morning)</option>
                      <option value="12:00 PM – 03:00 PM (Afternoon)">12:00 PM – 03:00 PM (Afternoon)</option>
                      <option value="03:00 PM – 06:00 PM (Evening)">03:00 PM – 06:00 PM (Evening)</option>
                      <option value="06:00 PM – 08:30 PM (Night)">06:00 PM – 08:30 PM (Night)</option>
                    </select>
                  </div>
                </div>

                {/* Referral Code (Optional) */}
                <div>
                  <label className="block text-stone-900 font-bold mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-700" />
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                    placeholder="e.g. ABI56 or PRIYA10 (Get 10% off custom stitching)"
                    className="w-full bg-white border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-bold uppercase placeholder:text-stone-400 focus:outline-none focus:border-[#780016] shadow-2xs tracking-wider"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">
                    Have a code from a friend? Enter it here to claim your 10% discount on stitching and trial charges.
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-stone-900 font-bold mb-1.5">Design Preferences or Saree Details</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Need neck embroidery matching my muhurtham temple saree border. Function date is next month."
                    className="w-full bg-white border-2 border-stone-300 rounded-xl p-3 text-stone-900 font-medium placeholder:text-stone-400 focus:outline-none focus:border-[#780016] resize-none shadow-2xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#780016] hover:bg-[#600012] disabled:bg-stone-400 text-white text-xs font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Saving to Database...' : 'Confirm & Send Appointment on WhatsApp'}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}