"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CalorieComparison from './_component/CalorieComparison';
import CalorieSummary from './_component/CalorieSummary';
import DailyRecommendation from './_component/DailyRecommendation';
// Import Tabler Icons for sports related decorations
import { 
  IconBarbell, 
  IconRun, 
  IconBike, 
  IconHeartbeat, 
  IconJumpRope, 
  IconSwimming, 
  IconStretching, 
  IconTreadmill 
} from "@tabler/icons-react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [currentDay, setCurrentDay] = useState(1);
  const [kaloriMasuk, setKaloriMasuk] = useState(0); 
  const [kaloriKeluar, setKaloriKeluar] = useState(0); 

  useEffect(() => {
    // Mencegah Hydration Error dan Memuat Data
    setIsMounted(true);
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");

    if (activeUsername && storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: any) => u.username === activeUsername);
      
      if (foundUser) {
        setUser(foundUser);
        const userDay = foundUser.currentDay || 1;
        setCurrentDay(userDay);

        const savedKkm = localStorage.getItem(`gopushkal_kkm_today_${activeUsername}`);
        const savedKkl = localStorage.getItem(`gopushkal_kkl_today_${activeUsername}`);

        setKaloriMasuk(savedKkm ? Number(savedKkm) : 0);
        setKaloriKeluar(savedKkl ? Number(savedKkl) : 0);
      } else {
        router.push("/Login");
      }
    } else {
      router.push("/Login");
    }
  }, [router]);

  // =========================================================================
  // 🔥 PERUBAHAN DI SINI: LOGIKA PENYIMPANAN HISTORY UNTUK LINE CHART STATISTIK
  // =========================================================================
  const handleNextDay = () => {
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");
    
    if(activeUsername && storedUsers) {
        let users = JSON.parse(storedUsers);
        
        users = users.map((u: any) => {
          if (u.username === activeUsername) {
            // 1. Ambil array riwayat lama atau inisialisasi array kosong jika belum ada
            const currentHistory = u.history || [];
            
            // 2. Bungkus cetakan data kalori hari ini (KKM & KKL)
            const todayLog = {
              day: u.currentDay || 1,
              kkm: kaloriMasuk, // Mengambil nilai dari state kaloriMasuk
              kkl: kaloriKeluar  // Mengambil nilai dari state kaloriKeluar
            };

            // 3. Validasi penimpaan (Cek apakah progress day ini sudah pernah disimpan)
            const existingIndex = currentHistory.findIndex((h: any) => h.day === u.currentDay);
            let updatedHistory = [...currentHistory];
            
            if (existingIndex !== -1) {
              updatedHistory[existingIndex] = todayLog; // Jika sudah ada, perbarui nilainya
            } else {
              updatedHistory.push(todayLog); // Jika belum ada, push object baru ke array
            }

            // 4. Return user dengan penambahan array history & penambahan hari (+1)
            return { 
              ...u, 
              history: updatedHistory,
              currentDay: (u.currentDay || 1) + 1 
            };
          }
          return u;
        });

        // 5. Commit perubahan ke dalam Local Storage database
        localStorage.setItem("gopushkal_users", JSON.stringify(users));
        localStorage.removeItem(`gopushkal_kkm_today_${activeUsername}`);
        localStorage.removeItem(`gopushkal_kkl_today_${activeUsername}`);
        
        alert(`Progress Day ${currentDay} tersimpan! Dialihkan ke halaman Statistik.`);
        
        // 6. Alihkan user ke halaman Statistik agar Line Chart langsung ter-render otomatis
        router.push("/Statistik");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  // Proteksi Hydration untuk Framer Motion
  if (!isMounted) {
    return <main className="min-h-screen bg-black" />;
  }

  // Pengaturan Varian Animasi Staggered (Muncul Bergantian)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Jeda waktu antar elemen anak
        delayChildren: 0.2 // Jeda awal sebelum elemen pertama muncul
      }
    }
  };

  // Varian Animasi Fade In & Slide Up untuk Kartu/Elemen Individu
  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 15, duration: 0.5 }
    },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.3 } }
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-black flex flex-col items-center pt-28 pb-12 relative overflow-hidden">
      
      {/* ========================================== */}
      {/* BACKGROUND FLOATING ICONS (TABLER ICONS) */}
      {/* ========================================== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* Ikon Terapung Sisi Kiri */}
        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '25%', left: '5%' }}
          animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        ><IconBarbell size={75} /></motion.div>
        
        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '55%', left: '8%' }}
          animate={{ y: [0, -30, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        ><IconRun size={85} /></motion.div>

        <motion.div 
          className="absolute text-yellow-400/10 hidden xl:block"
          style={{ bottom: '20%', left: '4%' }}
          animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        ><IconJumpRope size={65} /></motion.div>

        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '40%', left: '12%' }}
          animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
        ><IconSwimming size={55} /></motion.div>

        {/* Ikon Terapung Sisi Kanan */}
        <motion.div 
          className="absolute text-yellow-400/10 hidden xl:block"
          style={{ top: '30%', right: '6%' }}
          animate={{ y: [0, 35, 0], rotate: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        ><IconHeartbeat size={80} /></motion.div>

        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '65%', right: '9%' }}
          animate={{ y: [0, -40, 0], rotate: [0, -10, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        ><IconBike size={95} /></motion.div>

        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ bottom: '15%', right: '4%' }}
          animate={{ y: [0, 30, 0], x: [0, 15, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        ><IconStretching size={70} /></motion.div>

        <motion.div 
          className="absolute text-yellow-400/10 hidden xl:block"
          style={{ top: '50%', right: '14%' }}
          animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3.3 }}
        ><IconTreadmill size={60} /></motion.div>

        {/* Ambient Glow Effects agar latar tidak hampa */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* ========================================== */}
      {/* NAVBAR */}
      {/* ========================================== */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>

          <div className="relative ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-yellow-400 transition-colors flex flex-col justify-center gap-1.5 focus:outline-none">
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden"
                >
                  <Link href="/Profile" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">Profile Anda</Link>
                  <Link href="/AboutUs" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">About Us</Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors">Log Out</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block px-3 py-1 bg-gray-900 text-yellow-400 rounded-md">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKL</Link>
        </div>
      </section>

      {/* ========================================== */}
      {/* ISI KONTEN UTAMA */}
      {/* ========================================== */}
      <AnimatePresence>
        {!user ? (
          <motion.div 
            initial="visible" exit="exit" variants={fadeInUpVariants} 
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-yellow-400 font-bold text-xl animate-pulse">Memuat Dashboard...</div>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-5xl px-6 z-10 flex flex-col gap-4"
          >
            
            {/* JUDUL UTAMA DENGAN ANIMASI FADE-IN SLIDE-UP */}
            <motion.div 
              variants={fadeInUpVariants}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-tighter uppercase mb-4">
                Dashboard 
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Selamat datang, <span className="text-white font-bold">{user.namaLengkap}</span>! Pantau keseimbangan kalori Anda untuk mencapai target program <span className="text-yellow-400 font-bold uppercase">{user.targetKalori}</span> secara efisien.
              </p>
            </motion.div>

            {/* KOMPONEN DENGAN ANIMASI FADE-IN SLIDE-UP (STAGGERED) */}
            
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-yellow-400/40 transition-colors"
            >
              {/* Soft Glow Effect saat kartu di-hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-colors duration-500"></div>
              <div className="relative z-10">
                <CalorieSummary 
                  kaloriMasuk={kaloriMasuk} 
                  kaloriKeluar={kaloriKeluar} 
                  day={currentDay} 
                />
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-yellow-400/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-colors duration-500"></div>
              <div className="relative z-10">
                <CalorieComparison 
                  kaloriMasuk={kaloriMasuk} 
                  kaloriKeluar={kaloriKeluar} 
                />
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUpVariants}
              className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-yellow-400/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-colors duration-500"></div>
              <div className="relative z-10">
                <DailyRecommendation 
                  targetMode={user.targetKalori} 
                  kaloriMasuk={kaloriMasuk} 
                  kaloriKeluar={kaloriKeluar} 
                  onSave={handleNextDay} 
                />
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}