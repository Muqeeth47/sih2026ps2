/**
 * Isolated Firebase Architecture for TribalScholar-AI
 * Strictly isolated named app instance ("mota-scholar-db")
 * Prevents any collision, merge, or cross-talk with other Firebase projects.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const ISOLATED_APP_NAME = 'mota-scholar-db';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_MOTA_FIREBASE_API_KEY || 'demo-mota-api-key',
  authDomain: process.env.NEXT_PUBLIC_MOTA_FIREBASE_AUTH_DOMAIN || 'mota-tribalscholar.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_MOTA_FIREBASE_PROJECT_ID || 'mota-tribalscholar-2026',
  storageBucket: process.env.NEXT_PUBLIC_MOTA_FIREBASE_STORAGE_BUCKET || 'mota-tribalscholar.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_MOTA_FIREBASE_MESSAGING_SENDER_ID || '752444745695',
  appId: process.env.NEXT_PUBLIC_MOTA_FIREBASE_APP_ID || '1:752444745695:web:mota239scholar',
};

let app: FirebaseApp;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

export function getIsolatedFirebaseApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    // Server-side fallback
    const existing = getApps().find((a) => a.name === ISOLATED_APP_NAME);
    return existing || initializeApp(firebaseConfig, ISOLATED_APP_NAME);
  }

  const existing = getApps().find((a) => a.name === ISOLATED_APP_NAME);
  if (!existing) {
    app = initializeApp(firebaseConfig, ISOLATED_APP_NAME);
  } else {
    app = existing;
  }
  return app;
}

export function getIsolatedFirestore(): Firestore | null {
  try {
    if (!db) {
      const firebaseApp = getIsolatedFirebaseApp();
      db = getFirestore(firebaseApp);
    }
    return db;
  } catch (err) {
    console.warn('[Isolated Firebase] Firestore initialization skipped (offline/sandbox mode):', err);
    return null;
  }
}

export function getIsolatedStorage(): FirebaseStorage | null {
  try {
    if (!storage) {
      const firebaseApp = getIsolatedFirebaseApp();
      storage = getStorage(firebaseApp);
    }
    return storage;
  } catch (err) {
    console.warn('[Isolated Firebase] Storage initialization skipped (offline/sandbox mode):', err);
    return null;
  }
}

export const IS_FIREBASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_MOTA_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_MOTA_FIREBASE_PROJECT_ID
);
