'use client';

import { useState } from 'react';
import { Tag, CheckCircle2, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { validateReferralCode, CouponValidation } from '../lib/referral';

interface CartItem {
  id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
}

export default function CheckoutSummary() {
  const [cartItems] = useState<CartItem[]>([
    {
      id: 'p1',
      name: 'Kanchipuram Pure Silk Saree with Temple Border',
      code: 'AB-101',
      price: 14500,
      quantity: 1,
    },
    {
      id: 'p3',
      name: 'Heavy Bridal Maggam Aari Work Blouse Piece',
      code: 'AB-103',
      price: 6499,
      quantity: 1,
    },
  ]);

  const [inputCode, setInputCode] = useState('');
  const [couponState, setCouponState] = useState<CouponValidation | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = couponState?.valid
    ? Math.round((subtotal * couponState.discountPercent) / 100)
    : 0;
  const finalTotal = subtotal - discountAmount;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateReferralCode(inputCode);
    setCouponState(result);
  };

  const handleRemoveCode = () => {
    setCouponState(null);
    setInputCode('');
  };

  return (
    <div className="bg-white border-2 border-[#ebdccd] rounded-3xl p-6 sm:p-8 max-w-lg mx-auto shadow-sm space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <h3 className="font-serif font-bold text-lg text-[#780016] flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-700" />
          Order Summary & Checkout
        </h3>
        <span className="text-xs text-stone-500 font-bold">{cartItems.length} items</span>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3 text-xs">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-1 text-stone-700">
            <div>
              <p className="font-bold text-stone-900">{item.name}</p>
              <p className="text-[10px] text-stone-400">Code: {item.code} × {item.quantity}</p>
            </div>
            <span className="font-bold text-stone-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>

      {/* Referral / Promo Input Component */}
      <div className="border-t border-stone-100 pt-4 space-y-3">
        <form onSubmit={handleApplyCode} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter referral code (e.g. PRIYA10)"
              className="w-full border-2 border-zinc-300 bg-white text-zinc-900 font-semibold rounded-xl py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#780016] uppercase placeholder:text-zinc-400"
            />
            <Tag className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="bg-[#780016] hover:bg-[#600012] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
          >
            Apply
          </button>
        </form>

        {/* Validation Feedback */}
        {couponState && (
          <div>
            {couponState.valid ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {couponState.message}
                </span>
                <button
                  onClick={handleRemoveCode}
                  className="text-rose-600 font-bold hover:underline text-[11px] ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                {couponState.message}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pricing Calculation Breakdown */}
      <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600">
        <div className="flex justify-between">
          <span>Cart Subtotal</span>
          <span className="font-bold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        
        {couponState?.valid && (
          <div className="flex justify-between text-emerald-700 font-bold">
            <span>10% First-Order Referral Discount ({couponState.code})</span>
            <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping (Tamil Nadu Express)</span>
          <span className="text-emerald-700 font-bold">FREE</span>
        </div>

        <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline text-sm">
          <span className="font-serif font-bold text-stone-900 text-base">Total Payable</span>
          <span className="font-serif font-bold text-2xl text-[#780016]">
            ₹{finalTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <a
        href={`https://wa.me/919443215678?text=Hello%20Ahalya's%20Boutique,%20I%20am%20placing%20my%20order.%20${couponState?.valid ? `Referral%20Code:%20${couponState.code}%20applied.%20` : ''}Final%20Total:%20₹${finalTotal}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
      >
        <span>Complete Order via WhatsApp Concierge</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}