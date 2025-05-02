import type { NextConfig } from "next";

const firebaseConfig = {
  apiKey: "AIzaSyBEF4gmJCHfu0c7T4sZODKfbvsmqA-oGrI",
  authDomain: "spend-manager-b44f1.firebaseapp.com",
  projectId: "spend-manager-b44f1",
  storageBucket: "spend-manager-b44f1.firebasestorage.app",
  messagingSenderId: "170562158824",
  appId: "1:170562158824:web:1ef334c80cff5c509ec95d",
  measurementId: "G-XSDKMW80V7"
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  /* config options here */
  publicRuntimeConfig: {
    cookieExpireDuration: 30
  },
  serverRuntimeConfig: {
  },
};

export {firebaseConfig};
export default nextConfig;
