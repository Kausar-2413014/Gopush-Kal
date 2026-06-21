"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./_component/LoginForm";
import SignUpForm from "./_component/SignUpForm";
import TargetSelection from "./_component/TargetSelection"; 
// Import kombinasi icon Makanan & Olahraga untuk Landing/Login Page
import { 
  IconBarbell, 
  IconApple, 
  IconRun, 
  IconSalad, 
  IconHeartbeat, 
  IconBottle 
} from "@tabler/icons-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup" | "target">("login");
  const [isMounted, setIsMounted] = useState(false);

  // Mencegah Hydration Error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* ========================================== */}
      {/* BACKGROUND FLOATING ICONS (MIX THEME) */}
      {/* ========================================== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Sisi Kiri */}
        <motion.div 
          className="absolute top-[20%] left-[8%] text-yellow-400/10 hidden md:block"
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconBarbell size={80} />
        </motion.div>

        <motion.div 
          className="absolute top-[60%] left-[5%] text-green-400/10 hidden md:block"
          animate={{ y: [0, 30, 0], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <IconApple size={70} />
        </motion.div>

        <motion.div 
          className="absolute bottom-[15%] left-[12%] text-white/10 hidden md:block"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <IconRun size={90} />
        </motion.div>

        {/* Sisi Kanan */}
        <motion.div 
          className="absolute top-[25%] right-[10%] text-red-500/10 hidden md:block"
          animate={{ y: [0, 25, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <IconHeartbeat size={75} />
        </motion.div>

        <motion.div 
          className="absolute top-[55%] right-[8%] text-white/10 hidden md:block"
          animate={{ y: [0, -35, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <IconBottle size={65} />
        </motion.div>

        <motion.div 
          className="absolute bottom-[20%] right-[12%] text-green-500/10 hidden md:block"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <IconSalad size={80} />
        </motion.div>
      </div>

      {/* ========================================== */}
      {/* KONTEN UTAMA LOGIN (Z-INDEX DI ATAS ICON) */}
      {/* ========================================== */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Header / Logo: Animasi turun dari atas dan fade-in */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }}
          className="mb-8 text-center flex gap-3 items-center justify-center"
        >
          <img src="Logo Gopushkal.png" className="w-16 h-16 md:w-20 md:h-20 rounded-xl" alt="Logo GOPUSHKAL" />
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-wider italic">
            GOPUSHKAL
          </h1>
        </motion.div>

        {/* Container Form: Animasi membesar (scale up) perlahan */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#111111]/90 backdrop-blur-md p-8 rounded-2xl border border-yellow-400/30 shadow-[0_0_25px_rgba(255,215,0,0.15)] w-full relative overflow-hidden"
        >
          {/* Efek Glow di dalam box form */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* AnimatePresence menangani animasi keluar-masuk (perpindahan form) */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {mode === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm onSwitchMode={() => setMode("signup")} />
                </motion.div>
              )}

              {mode === "signup" && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SignUpForm 
                    onSuccess={() => setMode("target")} 
                    onSwitchMode={() => setMode("login")} 
                  />
                </motion.div>
              )}

              {mode === "target" && (
                <motion.div
                  key="target"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <TargetSelection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}