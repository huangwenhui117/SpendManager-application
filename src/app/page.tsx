"use client"

import { useEffect, useState } from "react";
// import { verify } from "../../api/loginApi";
import { useRouter } from 'next/navigation'
import Button from "@/component/widget/Button";

export default function Home() {
  const router = useRouter();
  return (
    <div>
        <h1>Hello, This is Spend Manager!</h1>
        <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
}
