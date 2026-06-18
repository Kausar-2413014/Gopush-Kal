"use client";

import { useState } from "react";
import LoginForm from "./_component/LoginForm";
import SignUpForm from "./_component/SignUpForm";
import TargetSelection from "./_component/TargetSelection"; 

export default function LoginPage() {
  // State untuk mengatur tampilan saat ini: 'login', 'signup', atau 'target'
  const [mode, setMode] = useState<"login" | "signup" | "target">("login");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Header / Logo */}
      <div className="mb-8 text-center flex gap-2">
        <img src="Logo Gopushkal.jpeg" className="w-20 h-20" />
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wider flex items-center justify-center gap-2 italic">
          GOPUSHKAL
        </h1>
      </div>

      {/* Container Form & Tombol */}
      <div className="bg-[#111111] p-8 rounded-xl border border-yellow-400/30 shadow-[0_0_15px_rgba(255,215,0,0.2)] w-full max-w-md">
        {mode === "login" && (
          <LoginForm onSwitchMode={() => setMode("signup")} />
        )}

        {mode === "signup" && (
          <SignUpForm 
            onSuccess={() => setMode("target")} 
            onSwitchMode={() => setMode("login")} 
          />
        )}

        {mode === "target" && (
          <TargetSelection />
        )}
      </div>
    </div>
  );
}