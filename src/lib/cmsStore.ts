'use client';

import { db, storage } from './firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product, products as initialProducts, LookbookItem, lookbookItems as initialLookbook } from './products';
import { AffiliateProduct, trendingAffiliatePicks as initialAffiliates } from './ads';

export interface CustomerAppointment {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  appointmentMode: string;
  preferredDate: string;
  preferredTime: string;
  referralCode?: string;
  notes: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Completed';
}

export interface CustomerEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Replied';
}

export interface SiteBanners {
  topRibbon: string;
  promoBarText: string;
  promoBarLinkText: string;
  sponsoredPartnerTag: string;
  sponsoredPartnerTitle: string;
  sponsoredPartnerDesc: string;
}

const DEFAULT_BANNERS: SiteBanners = {
  topRibbon: 'Delivery all over Tamil Nadu | COD Available | Madurai In-Store Pickup',
  promoBarText: 'Pongal & Aadi Thiruvizha Special: Flat 15% OFF on Bridal Aari Blouse combos!',
  promoBarLinkText: 'Book Slots',
  sponsoredPartnerTag: 'Wedding Partner • Sri Meenakshi Swarna Mahal Jewellers - West Masi St, Madurai',
  sponsoredPartnerTitle: 'Antique Temple Jewellery 0% Making Charge on Bridal Bookings',
  sponsoredPartnerDesc: 'Special Madurai verified partner privileges for Ahalya patrons',
};

// --- Storage Upload ---
export async function uploadImageToStorage(file: File, folder: string = 'catalog'): Promise<string> {
  const fileName = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// --- Appointments ---
export async function addCustomerAppointment(apt: Omit<CustomerAppointment, 'id' | 'createdAt' | 'status'>) {
  const id = `apt-${Date.now()}`;
  const record: CustomerAppointment = {
    ...apt,
    id,
    createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'New',
  };
  if (typeof window !== 'undefined' && db) {
    await setDoc(doc(db, 'appointments', id), record);
  }
  return record;
}

export function subscribeToAppointments(callback: (list: CustomerAppointment[]) => void) {
  if (typeof window === 'undefined' || !db) return () => {};
  return onSnapshot(collection(db, 'appointments'), (snap) => {
    const list: CustomerAppointment[] = [];
    snap.forEach((d) => list.push(d.data() as CustomerAppointment));
    list.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
    callback(list);
  });
}

export async function updateAppointmentStatus(id: string, status: CustomerAppointment['status']) {
  if (typeof window !== 'undefined' && db) {
    await setDoc(doc(db, 'appointments', id), { status }, { merge: true });
  }
}

export async function deleteAppointment(id: string) {
  if (typeof window !== 'undefined' && db) {
    await deleteDoc(doc(db, 'appointments', id));
  }
}

// --- Enquiries ---
export async function addCustomerEnquiry(enq: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>) {
  const id = `enq-${Date.now()}`;
  const record: CustomerEnquiry = {
    ...enq,
    id,
    createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'New',
  };
  if (typeof window !== 'undefined' && db) {
    await setDoc(doc(db, 'enquiries', id), record);
  }
  return record;
}

export function subscribeToEnquiries(callback: (list: CustomerEnquiry[]) => void) {
  if (typeof window === 'undefined' || !db) return () => {};
  return onSnapshot(collection(db, 'enquiries'), (snap) => {
    const list: CustomerEnquiry[] = [];
    snap.forEach((d) => list.push(d.data() as CustomerEnquiry));
    list.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
    callback(list);
  });
}

export async function updateEnquiryStatus(id: string, status: CustomerEnquiry['status']) {
  if (typeof window !== 'undefined' && db) {
    await setDoc(doc(db, 'enquiries', id), { status }, { merge: true });
  }
}

export async function deleteEnquiry(id: string) {
  if (typeof window !== 'undefined' && db) {
    await deleteDoc(doc(db, 'enquiries', id));
  }
}

// --- Products ---
export function subscribeToProducts(callback: (list: Product[]) => void) {
  if (typeof window === 'undefined' || !db) {
    callback(initialProducts);
    return () => {};
  }
  return onSnapshot(collection(db, 'products'), (snap) => {
    if (snap.empty) {
      initialProducts.forEach((p) => {
        setDoc(doc(db, 'products', p.id), p);
      });
      callback(initialProducts);
      return;
    }
    const list: Product[] = [];
    snap.forEach((d) => list.push(d.data() as Product));
    callback(list);
  });
}

export async function saveProductToFirestore(p: Product) {
  if (typeof window !== 'undefined' && db) {
    await setDoc(doc(db, 'products', p.id), p);
  }
}

export async function deleteProductFromFirestore(id: string) {
  if (typeof window !== 'undefined' && db) {
    await deleteDoc(doc(db, 'products', id));
  }
}

export const getCMSProducts = (): Product[] => initialProducts;
export const saveCMSProducts = (items: Product[]) => { items.forEach(p => saveProductToFirestore(p)); };

// --- Affiliates ---
export const getCMSAffiliates = (): AffiliateProduct[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ahalyas_affiliates_cms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return initialAffiliates;
};

export const saveCMSAffiliates = (items: AffiliateProduct[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ahalyas_affiliates_cms', JSON.stringify(items));
  }
};

// --- Lookbook (Single Definition with Sync Event) ---
export const getCMSLookbook = (): LookbookItem[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ahalyas_lookbook_cms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return initialLookbook;
};

export const saveCMSLookbook = (items: LookbookItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ahalyas_lookbook_cms', JSON.stringify(items));
    window.dispatchEvent(new Event('lookbook_updated'));
  }
};

// --- Banners ---
export const getCMSBanners = (): SiteBanners => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ahalyas_banners_cms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return DEFAULT_BANNERS;
};

export const saveCMSBanners = (banners: SiteBanners) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ahalyas_banners_cms', JSON.stringify(banners));
  }
};

export const getCMSAppointments = (): CustomerAppointment[] => [];
export const getCMSEnquiries = (): CustomerEnquiry[] => [];