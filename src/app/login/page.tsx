"use client";

import Login from '@/app/login/Login';
import SignUp from '@/app/login/SignUp';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

  /**
   * Handles the login/signup page.
   * Depending on the action passed in,
   * it renders either the Login or SignUp component.
   * @returns either the Login or SignUp component
   */
export default function Page() {
  const router = useRouter();
  const [action, setAction] = useState('login');
  const handleAction = (action: string) => setAction(action);
  if (action === 'login') {
    return (
      <div>
          <Login actionChange={handleAction}></Login>
      </div>
    );
  } else {
    return (
      <div>
          <SignUp actionChange={handleAction}></SignUp>
      </div>
    );
  }
  
}