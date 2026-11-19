import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

const hasValidConfig = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'undefined' &&
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('dummy')
);

let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

try {
  if (hasValidConfig) {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
  }
} catch (error) {
  console.warn('Skipping Firebase init during build:', error);
}

export const db = dbInstance as Firestore;
export const storage = storageInstance as FirebaseStorage;