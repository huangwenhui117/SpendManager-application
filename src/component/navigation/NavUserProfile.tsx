'use client';

import { getUserProfile, logout } from "@/lib/loginApi";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface NavUserProfileProps {
  
}

const NavUserProfile: React.FC<NavUserProfileProps> = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const updateProfile = async () => {
      const profile = await getUserProfile();
      setDisplayName(profile?.displayName ?? null);
      setEmail(profile?.email ?? null);
      setUid(profile?.uid ?? null);
    };
    window.addEventListener('user-logged-in', updateProfile);
    return () => window.removeEventListener('user-logged-in', updateProfile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.dispatchEvent(new Event('user-logged-in'));
    setDropdownOpen(false);
    router.push('/login');
  };

  if (!displayName) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="flex items-center space-x-3 hover:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer transition"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm font-medium">{displayName}</div>
      </div>


      {dropdownOpen && (
        <div className="absolute right-0 mt-2 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="mb-2">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</div>
            <div className="text-sm text-gray-700 font-medium break-words">{email}</div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">User ID</div>
            <div className="text-sm text-gray-700 font-medium break-words">{uid}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-left text-red-600 font-semibold hover:bg-red-100 hover:text-red-700 transition-all duration-200"
          >
            Logout
          </button>
      </div>
      )}
    </div>
  );
};

export default NavUserProfile;