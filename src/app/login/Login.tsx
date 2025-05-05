'use client';

import React, { useState } from "react";
import TextInput from "@/component/widget/TextInput";
import Button from "../../component/widget/Button";
import { login } from "@/lib/loginApi";
import { useRouter } from 'next/navigation';


interface LoginProps {
  actionChange: (action: string) => void; 
}

const Login: React.FC<LoginProps> = ({actionChange}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await login(email, password);
      if (response.message !== undefined) {
        setLoginMessage("");
        window.dispatchEvent(new Event('user-logged-in'));
        router.push('/dashboard');
      } else {
        setLoginMessage(response);
      }
    } catch (error) {
      setLoginMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button variant = "login" type="submit">
          Login
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Button
            type="button"
            onClick={() => actionChange('signup')}
          >
            Sign Up
          </Button>
        </p>
        <div className="flex items-center justify-center text-sm text-red-600" hidden={loginMessage === ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <span>{loginMessage}</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
