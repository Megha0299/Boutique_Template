'use client';

import { useState, useEffect } from 'react';
import { Gift, X, Copy, Check, Sparkles } from 'lucide-react';
import { getCurrentUserReferral, registerCustomerReferral, ReferralUser } from '../lib/referral';

export default function ReferralBanner() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dismissTopBar, setDismissTopBar] = useState(false);

  const [user, setUser] = useState<ReferralUser | null>(null);
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');

  useEffect(() => {
    setUser(getCurrentUserReferral());
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputPhone.trim()) return;
    const created = registerCustomerReferral(inputName, inputPhone);
    setUser(created);
  };

  const inviteLink = user
    ? `https://ahalyasboutique.in/?ref=${user.referralCode}`
    : 'https://ahalyasboutique.in';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* 1. Promotional Announcement Ribbon */}
      {!dismissTopBar && (
        <div className="bg-[#5c0011] text-[#faede1] px-4 py-2 text-xs flex items-center justify-between border-b border-amber-900/40 relative z-30">
          <div className="max-w-7xl mx-auto flex items-center gap-2 font-medium">
            <Gift className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              <strong>Give 10%, Get ₹250:</strong> Invite friends to Ahalya&apos;s Boutique. They get 10% off their first weave; you earn ₹250 stitching credits!
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="ml-2 underline font-bold text-amber-300 hover:text-white transition cursor-pointer"
            >
              {user ? 'View My Invite Code' : 'Get My Referral Code'}
            </button>
          </div>
          <button
            onClick={() => setDismissTopBar(true)}
            className="text-stone-400 hover:text-white p-1 cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Referral Modal (High z-index to stay above headers + backdrop click to close) */}
      {showModal && (
        <div 
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#fffdfa] border border-[#ebdccd] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 my-auto"
          >
            {/* Top-Right Close (X) Icon Button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 p-2 rounded-full transition cursor-pointer"
              title="Close popup"
            >
              <X className="w-5 h-5 text-stone-700" />
            </button>

            <div className="text-center space-y-2 pt-2">
              <div className="w-12 h-12 rounded-full bg-[#f8ede3] text-[#780016] flex items-center justify-center mx-auto border border-[#ecd2bf]">
                <Gift className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Patron Circle</span>
              <h3 className="text-2xl font-serif font-bold text-[#780016]">
                Refer a Friend & Earn ₹250
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                Give your friends 10% off authentic Madurai handlooms. Receive ₹250 tailoring credit for every order completed with your code!
              </p>
            </div>

            {/* Case A: Not registered */}
            {!user ? (
              <form onSubmit={handleGenerate} className="bg-white border border-[#ebdccd] rounded-2xl p-5 space-y-3 text-xs">
                <span className="font-bold text-stone-900 block text-center">
                  Generate Your Personal Referral Code
                </span>
                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="e.g. Sowmya or Meenakshi"
                    className="w-full border-2 border-stone-200 bg-white text-stone-900 rounded-xl p-2.5 outline-none focus:border-[#780016] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    placeholder="+91 98420 XXXXX"
                    className="w-full border-2 border-stone-200 bg-white text-stone-900 rounded-xl p-2.5 outline-none focus:border-[#780016] font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#780016] hover:bg-[#600012] text-white font-bold py-3 rounded-xl transition shadow-xs mt-2 cursor-pointer"
                >
                  Create My Unique Referral Code
                </button>
              </form>
            ) : (
              /* Case B: Registered member */
              <div className="space-y-4">
                <div className="bg-white border-2 border-dashed border-[#decaba] rounded-2xl p-4 text-center space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-stone-500 font-bold uppercase">
                    <span>Active Member: {user.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('ahalya_current_referral_user');
                        setUser(null);
                      }}
                      className="text-stone-400 hover:text-stone-600 underline lowercase cursor-pointer"
                    >
                      (change)
                    </button>
                  </div>
                  <div className="text-3xl font-mono font-bold tracking-widest text-[#780016]">
                    {user.referralCode}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="w-full bg-[#780016] hover:bg-[#600012] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Invite Link Copied!' : 'Copy Personal Invite Link'}
                  </button>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[#ebdccd] rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-stone-500 font-bold uppercase">Your Credit Balance</span>
                    <p className="text-xl font-serif font-bold text-emerald-800">₹{user.creditsEarned}</p>
                    <span className="text-[10px] text-stone-400">Available to spend</span>
                  </div>
                  <div className="bg-white border border-[#ebdccd] rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-stone-500 font-bold uppercase">Friends Referred</span>
                    <p className="text-xl font-serif font-bold text-stone-900">{user.successfulReferrals} Orders</p>
                    <span className="text-[10px] text-stone-400">₹{user.pendingCredits} pending</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Close Button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full text-center text-xs text-stone-600 hover:text-stone-900 font-bold pt-2 block underline cursor-pointer"
            >
              Close Window
            </button>

          </div>
        </div>
      )}
    </>
  );
}