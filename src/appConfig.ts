import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "next.config";

const admin = require("firebase-admin");
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export{app, firebaseAuth, admin};