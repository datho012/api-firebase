// Firebase configuration for Vercel
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase with environment variables
try {
  // Check if Firebase is already initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export const db = admin.firestore();
export default admin;
