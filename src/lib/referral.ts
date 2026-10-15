export interface ReferralUser {
  name: string;
  phone: string;
  referralCode: string;
  creditsEarned: number;
  successfulReferrals: number;
  pendingCredits: number;
}

export interface CouponValidation {
  valid: boolean;
  code: string;
  discountPercent: number;
  message: string;
}

const STORAGE_KEY_USER = 'ahalya_current_referral_user';
const STORAGE_KEY_CODES = 'ahalya_registered_referral_codes';

// Seed initial default codes
const DEFAULT_CODES: Record<string, { discountPercent: number; referrer: string }> = {
  AHALYA10: { discountPercent: 10, referrer: 'Ahalya Boutique Welcome' },
  MADURAI10: { discountPercent: 10, referrer: 'Madurai Handloom Offer' },
};

// Retrieve registered codes list
export function getRegisteredCodes(): Record<string, { discountPercent: number; referrer: string }> {
  if (typeof window === 'undefined') return DEFAULT_CODES;
  const saved = localStorage.getItem(STORAGE_KEY_CODES);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY_CODES, JSON.stringify(DEFAULT_CODES));
    return DEFAULT_CODES;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return DEFAULT_CODES;
  }
}

// Retrieve currently logged-in or generated user
export function getCurrentUserReferral(): ReferralUser | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY_USER);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// Generate unique code based on user's name
export function registerCustomerReferral(name: string, phone: string): ReferralUser {
  const cleanName = name.trim().replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 5) || 'GUEST';
  const randomSuffix = Math.floor(10 + Math.random() * 90);
  const generatedCode = `${cleanName}${randomSuffix}`;

  const newUser: ReferralUser = {
    name: name.trim(),
    phone: phone.trim(),
    referralCode: generatedCode,
    creditsEarned: 0,
    successfulReferrals: 0,
    pendingCredits: 0,
  };

  if (typeof window !== 'undefined') {
    // Save customer
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));

    // Register their new code so friends can use it at checkout
    const codes = getRegisteredCodes();
    codes[generatedCode] = { discountPercent: 10, referrer: newUser.name };
    localStorage.setItem(STORAGE_KEY_CODES, JSON.stringify(codes));
  }

  return newUser;
}

// Validate any applied code at checkout
export function validateReferralCode(code: string): CouponValidation {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return { valid: false, code: '', discountPercent: 0, message: '' };
  }

  const allCodes = getRegisteredCodes();

  if (allCodes[normalized]) {
    return {
      valid: true,
      code: normalized,
      discountPercent: allCodes[normalized].discountPercent,
      message: `🎉 10% First-Order Referral Discount Applied (via ${allCodes[normalized].referrer})`,
    };
  }

  return {
    valid: false,
    code: normalized,
    discountPercent: 0,
    message: 'Invalid referral code. Check the spelling or enter a valid friend code.',
  };
}