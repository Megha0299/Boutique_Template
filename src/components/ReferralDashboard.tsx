'use client';

import { useState, useEffect } from 'react';
import { Gift, Copy, Check, Users, Sparkles, Share2 } from 'lucide-react';
import { getCurrentUserReferral, registerCustomerReferral, ReferralUser } from '../lib/referral';

export default function ReferralDashboard() {
  const [user, setUser] = useState<ReferralUser | null>(null);
  const [copied, setCopied] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  useEffect(() => {
    setUser(getCurrentUserReferral());
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !phoneInput.trim()) return;
    const created = registerCustomerReferral(nameInput, phoneInput);
    setUser(created);
  };

  const copyCode = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    if (!user) return;
    const inviteLink = `https://ahalyasboutique.in/?ref=${user.referralCode}`;
    const text = `Vanakkam! Use my personal referral code *${user.referralCode}* to get 10% off pure Madurai Sungudi sarees and bespoke aari blouses at Ahalya's Boutique: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="bg-gradient-to-br from-[#fffdfa] via-white to-[#fbf5ee] border-2 border-[#ecdccd] rounded-3xl p-8 lg:p-12 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/70 pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Patron Referral Rewards
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#780016]">
              Refer a Friend & Earn Boutique Credits
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Give your friends 10% off their first order. You receive ₹250 wallet credits for each completed purchase!
            </p>
          </div>
          {user && (
            <div className="text-right">
              <span className="text-[11px] text-stone-500 font-bold uppercase block">Active Patron</span>
              <p className="text-sm font-bold text-stone-900">{user.name}</p>
            </div>
          )}
        </div>

        {!user ? (
          /* Form to generate their personal code */
          <div className="bg-white border border-[#ebdccd] rounded-2xl p-6 max-w-lg mx-auto shadow-xs space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-[#780016] text-center">
              Claim Your Unique Code to Start Earning ₹250
            </h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-stone-700 mb-1 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Megha or Priya"
                  className="w-full border-2 border-stone-200 bg-white text-stone-900 rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-400 font-medium"
                />
              </div>
              <div>
                <label className="block text-stone-700 mb-1 font-semibold">WhatsApp Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+91 98420 XXXXX"
                  className="w-full border-2 border-stone-200 bg-white text-stone-900 rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-400 font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#780016] hover:bg-[#600012] text-white font-bold py-3 rounded-xl transition shadow-xs text-xs"
              >
                Generate My Code
              </button>
            </form>
          </div>
        ) : (
          /* Active User Dashboard */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="bg-white border border-[#ebdccd] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Your Exclusive Code</span>
                <div className="mt-2 p-3 bg-[#faf5f0] border border-dashed border-[#d9c0af] rounded-xl flex items-center justify-between">
                  <span className="font-mono text-xl font-bold tracking-wider text-[#780016]">
                    {user.referralCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="text-xs font-bold text-[#780016] hover:underline flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <button
                onClick={shareOnWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" /> Share on WhatsApp
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#ebdccd] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Wallet Credits</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-bold text-emerald-800">
                    ₹{user.creditsEarned}
                  </span>
                  <span className="text-xs text-stone-400">Available</span>
                </div>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  Redeemable instantly on sarees, dhavanis, or bridal aari blouse tailoring.
                </p>
              </div>
              <div className="text-[11px] text-stone-500 border-t border-stone-100 pt-2 flex justify-between">
                <span>Pending Balance:</span>
                <span className="font-bold text-stone-700">₹{user.pendingCredits}</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#ebdccd] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Friends Introduced</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-bold text-stone-900">
                    {user.successfulReferrals}
                  </span>
                  <span className="text-xs text-stone-400">Orders placed</span>
                </div>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  Every friend who orders using your code gets 10% off their first purchase.
                </p>
              </div>
              <div className="text-[11px] font-bold text-teal-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Patron Ambassador Status
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}