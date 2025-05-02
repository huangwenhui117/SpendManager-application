'use server';

import { cookies } from "next/headers";
import getConfig from 'next/config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, admin } from '@/appConfig';

const { publicRuntimeConfig } = getConfig();
const expiresIn = publicRuntimeConfig.cookieExpireDuration * 60 * 1000 || 60 * 30 * 1000;
type FirebaseAuthErrorCode = 'auth/invalid-credential' | 'auth/email-already-exists';
const errorMessage: Record<FirebaseAuthErrorCode, string> = {
  'auth/invalid-credential': 'Invalid email or password',
  'auth/email-already-exists': 'Email already registered'
};
const getErrorMessage = (code: string): string => {
  return errorMessage[code as FirebaseAuthErrorCode] || "Unknown error";
};
type SignupForm = {
  email: string;
  password: string;
  name: string;
};
export async function login(email: string, password: string) {
  const cookiesStore = await cookies();
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const sessionCookie = await admin.auth().createSessionCookie(await userCredential.user.getIdToken(), {
      expiresIn
    });
    cookiesStore.set('session', sessionCookie, {secure: false, path: '/', sameSite: 'lax', maxAge: expiresIn});
    return {message: 'Login Successful'};
  } catch (error: any) {
    console.log(error.message);
    return getErrorMessage(error.code);
  }
}

export async function signup(signupForm: SignupForm) {
  try {
    await admin.auth().createUser({
      email: signupForm.email,
      password: signupForm.password,
      displayName: signupForm.name,
      emailVerified: false,
    });
    return 'Successful Sign Up';
  } catch (error: any) {
    return getErrorMessage(error.code);
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    maxAge: 0,
    path: '/'
  });
  return 'Logout Successful';
}

export async function getUserProfile() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie);
    return {uid: decodedToken.sub, displayName: decodedToken.name, email: decodedToken.email};    
  } catch (error: any) {
    return getErrorMessage(error.code);
  }
  
}

