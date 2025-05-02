"use client";

import Button from "@/component/widget/Button";
import { getUserProfile, logout } from "@/lib/loginApi";
import { log } from "console";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      const profile: any = await getUserProfile();
      setUid(profile.uid);
      setDisplayName(profile.displayName);
      setEmail(profile.email);
    };
    fetchProfile();
  }, []);
  
  const handleLogout = async () => {
    const res = await logout();
    setMessage(res);
  };
  return (
    <div>
        <h1>Hello {displayName}</h1>
        <br></br>
        <p>Your uid is: {uid}</p>
        <br></br>
        <p>Your email is: {email}</p>
        <br></br>
        <p className="text-red-500" hidden={message === ""}>{message}</p>
        <Button
            type="button"
            onClick={handleLogout}
            variant="normal"
          >
            Logout
          </Button>
    </div>
  );
}