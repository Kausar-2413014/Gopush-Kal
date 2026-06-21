"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./_component/LoginForm";
import SignUpForm from "./_component/SignUpForm";
import TargetSelection from "./_component/TargetSelection"; 

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup" | "target">("login");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* Header / Logo: Animasi turun dari atas dan fade-in */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 text-center flex gap-2"
      >
        <img src="Logo Gopushkal.jpeg" className="w-20 h-20 rounded-xl" alt="Logo GOPUSHKAL" />
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wider flex items-center justify-center gap-2 italic">
          GOPUSHKAL
        </h1>
      </motion.div>

      {/* Container Form: Animasi membesar (scale up) perlahan */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#111111] p-8 rounded-xl border border-yellow-400/30 shadow-[0_0_15px_rgba(255,215,0,0.2)] w-full max-w-md relative overflow-hidden"
      >
        {/* AnimatePresence menangani animasi keluar-masuk (perpindahan form) */}
        <AnimatePresence mode="wait">
          {mode === "login" && (
            <LoginForm key="login" onSwitchMode={() => setMode("signup")} />
          )}

          {mode === "signup" && (
            <SignUpForm 
              key="signup" 
              onSuccess={() => setMode("target")} 
              onSwitchMode={() => setMode("login")} 
            />
          )}

          {mode === "target" && (
            <TargetSelection key="target" />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}