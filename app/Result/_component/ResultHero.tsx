"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { IconTrophy, IconStar, IconConfetti, IconRefresh, IconArrowLeft } from "@tabler/icons-react";

const playSound = (soundPath: string) => {
  if (typeof window !== "undefined") {
    const audio = new Audio(soundPath);
    audio.volume = 0.5;
    audio.play().catch((err) => console.log("Audio play blocked by browser:", err));
  }
};

export default function ResultHero() {
  const router = useRouter();
  const { width, height } = useWindowSize();
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [isClient, setIsClient] = useState(false); // State untuk mencegah Hydration Mismatch

  useEffect(() => {
    // Menandakan komponen sudah di-render di client (browser)
    setIsClient(true); 

    playSound("/sounds/victory.mp3");
    
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    playSound("/sounds/click.mp3");
    if (confirm("Apakah Anda yakin ingin mereset semua data perjalanan Anda? Statistik akan dihapus dan diulang kembali dari Day 1.")) {
      const activeUsername = localStorage.getItem("gopushkal_currentUser");
      const storedUsers = localStorage.getItem("gopushkal_users");

      if (activeUsername && storedUsers) {
        let users = JSON.parse(storedUsers);
        users = users.map((u: any) => {
          if (u.username === activeUsername) {
            return { 
              ...u, 
              currentDay: 1,
              history: [],
              weightHistory: [],
              beratSekarang: u.beratAwal || u.beratSekarang 
            };
          }
          return u;
        });

        localStorage.setItem("gopushkal_users", JSON.stringify(users));
        alert("Data perjalanan berhasil di-reset! Mari mulai lembaran baru dari Day 1.");
        router.push("/Dashboard");
      } else {
        router.push("/Login");
      }
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center text-center mt-10 z-10">
      
      {/* Confetti Overlay - Hanya muncul jika isClient true untuk menghindari Hydration Error */}
      {/* Confetti Overlay - Tambahkan properti style fixed */}
      {isClient && showConfetti && (
        <Confetti 
          width={width} 
          height={height} 
          colors={['#FACC15', '#FFFFFF', '#000000']} 
          recycle={false} 
          numberOfPieces={500} 
          style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }} // <--- Tambahkan baris ini
        />
      )}
      {/* Animasi Icon Melayang */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, -10, 5, 0], scale: [1, 1.2, 1] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-10 left-10 md:left-32 text-yellow-400 opacity-80 hidden md:block drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
      >
        <IconStar size={64} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -25, 0], rotate: [0, 15, -5, 0], scale: [1, 1.2, 1] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-10 md:right-32 text-yellow-500 opacity-80 hidden md:block drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
      >
        <IconConfetti size={72} />
      </motion.div>

      {/* Konten Utama - Trophy Glow (Animasi Diperbaiki) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ 
          // Memisahkan transisi: Spring hanya untuk scale, rotate pakai durasi standar
          scale: { type: "spring", bounce: 0.6, duration: 1.2 },
          rotate: { duration: 1.2, ease: "easeInOut" },
          opacity: { duration: 1 }
        }}
        className="bg-yellow-400/10 p-8 rounded-full mb-6 border-2 border-yellow-400 shadow-[0_0_80px_rgba(250,204,21,0.4)]"
      >
        <IconTrophy size={90} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-xl"
      >
        TARGET <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">TERCAPAI!</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-gray-300 max-w-lg mb-10 text-lg md:text-xl font-medium leading-relaxed"
      >
        Luar biasa! Konsistensi dan kerja keras Anda telah membuahkan hasil. Anda berhasil mencapai target berat badan yang Anda tetapkan.
      </motion.p>

      {/* Tombol Aksi Interaktif */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-6 w-full justify-center max-w-lg"
      >
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => playSound("/sounds/hover.mp3")}
          onClick={() => { playSound("/sounds/click.mp3"); router.push("/Dashboard"); }} 
          className="flex-1 flex items-center justify-center gap-2 bg-[#111] border-2 border-gray-700 hover:border-white text-white font-bold py-4 px-6 rounded-2xl transition-colors"
        >
          <IconArrowLeft size={22} />
          Kembali
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(250,204,21,0.6)" }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => playSound("/sounds/hover.mp3")}
          onClick={handleReset}
          className="flex-2 flex items-center justify-center gap-2 bg-yellow-400 text-black font-black py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-colors"
        >
          <IconRefresh size={22} />
          Mulai Perjalanan Baru
        </motion.button>
      </motion.div>
    </div>
  );
}