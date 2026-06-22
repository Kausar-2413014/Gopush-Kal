"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

import InfoCards from "./_component/InfoCards";
import StatisticChart from "./_component/StatisticChart";
import WeightEvaluator from "./_component/WeightEvaluator";

import { 
  IconBarbell, 
  IconRun, 
  IconBike, 
  IconHeartbeat, 
  IconJumpRope, 
  IconSwimming, 
  IconStretching, 
  IconTreadmill,
  IconChartLine,
  IconScale
} from "@tabler/icons-react";

export default function StatistikPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");

    if (activeUsername && storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: any) => u.username === activeUsername);
      
      if (foundUser) {
        setUser(foundUser);
      } else {
        router.push("/Login");
      }
    } else {
      router.push("/Login");
    }
  }, [router]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari Gopushkal?")) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  const handleSaveWeight = (weight: number) => {
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");

    if (activeUsername && storedUsers) {
      let users = JSON.parse(storedUsers);
      users = users.map((u: any) => {
        if (u.username === activeUsername) {
          const weightHistory = u.weightHistory || [];
          weightHistory.push({ day: u.currentDay || 1, weight });
          return { ...u, weightHistory, beratSekarang: weight };
        }
        return u;
      });

      localStorage.setItem("gopushkal_users", JSON.stringify(users));
      const updatedUser = users.find((u: any) => u.username === activeUsername);
      setUser(updatedUser);
      setIsWeightModalOpen(false);
      // Notifikasi alert dipindahkan ke dalam WeightEvaluator agar lebih rapih alurnya
    }
  };

  if (!isMounted) {
    return <main className="min-h-screen bg-black" />;
  }

  const userHistory = user?.history || [];
  const currentDay = user?.currentDay || 1;
  const beratTarget = user?.beratTarget || "0";

  const totalMasuk = userHistory.reduce((sum: number, h: any) => sum + (h.kkm || 0), 0);
  const totalKeluar = userHistory.reduce((sum: number, h: any) => sum + (h.kkl || 0), 0);
  const avgMasuk = userHistory.length > 0 ? Math.round(totalMasuk / userHistory.length) : 0;
  const avgKeluar = userHistory.length > 0 ? Math.round(totalKeluar / userHistory.length) : 0;
  
  const targetMode = user?.targetKalori || "Maintenance";
  const targetModeLower = targetMode.toLowerCase();

  // LOGIKA PENDETEKSI METODE BERAT BADAN YANG DIPERBARUI
  let metodeDiet: "turun" | "naik" | "tetap" = "tetap";
  
  // Jika target mengandung kata "surplus" ATAU "bulking" ATAU "naik"
  if (targetModeLower.includes("surplus") || targetModeLower.includes("bulking") || targetModeLower.includes("naik")) {
    metodeDiet = "naik"; 
  } 
  // Jika target mengandung kata "defisit" ATAU "fat loss" ATAU "turun"
  else if (targetModeLower.includes("defisit") || targetModeLower.includes("fat loss") || targetModeLower.includes("turun")) {
    metodeDiet = "turun"; 
  }
  

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 25, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 14 } }
  };

  
  return (
    <main className="min-h-screen bg-black flex flex-col items-center pt-28 pb-16 relative overflow-hidden text-white">
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
      </div>

      {/* Background Ikon */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute top-[25%] left-[5%]"><IconBarbell size={75} /></div>
        <div className="absolute top-[55%] left-[8%]"><IconRun size={85} /></div>
        <div className="absolute bottom-[20%] left-[4%]"><IconJumpRope size={65} /></div>
        <div className="absolute top-[30%] right-[6%]"><IconHeartbeat size={80} /></div>
        <div className="absolute top-[65%] right-[9%]"><IconBike size={95} /></div>
      </div>

      {/* Navbar */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>
          <div className="relative ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-yellow-400 flex flex-col gap-1.5 focus:outline-none">
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden">
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
          <Link href="/Dashboard" className="inline-block hover:opacity-80">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block px-3 py-1 bg-gray-900 text-yellow-400 rounded-md">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block hover:opacity-80">KKL</Link>
        </div>
      </section>

      {/* Konten Utama */}
      <AnimatePresence>
        {!user ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-yellow-400 font-bold text-xl animate-pulse">Memuat Analisis Grafik...</div>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-5xl px-6 z-10 flex flex-col gap-8">
            
            <motion.div variants={fadeInUpVariants} className="text-center mb-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-wide uppercase mb-2 flex items-center justify-center gap-3">
               PROGRES STATISTIK
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                Pantau kestabilan asupan kalori harian Anda secara real-time demi mencapai target tubuh ideal.
              </p>

              {/* 🔥 LOGIKA HANYA MUNCUL PADA KELIPATAN DAY 5 🔥 */}
              {currentDay % 5 === 0 ? (
                <button 
                  onClick={() => setIsWeightModalOpen(true)} 
                  className="mt-5 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg"
                >
                  <IconScale size={16} /> Evaluasi Milestone Berat (Day {currentDay})
                </button>
              ) : (
                <p className="text-xs text-gray-500 mt-4 italic">
                  Tombol evaluasi milestone berikutnya akan aktif di Day {Math.ceil((currentDay + 1) / 5) * 5}
                </p>
              )}
            </motion.div>

            {/* Kotak Info Ringkasan */}
            <motion.div variants={fadeInUpVariants}>
              <InfoCards 
                avgMasuk={avgMasuk} 
                avgKeluar={avgKeluar} 
                targetMode={targetMode} 
              />
            </motion.div>

            {/* Box Grafik Utama */}
            <motion.div variants={fadeInUpVariants} className="bg-[#0c0c0c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-500 via-yellow-400 to-red-500 opacity-70"></div>
              <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wider mb-6">
                Line Chart KKM & KKL
              </h3>
              
              <div className="w-full">
                <StatisticChart historyData={userHistory} currentDay={currentDay} />
              </div>
            </motion.div>

            {/* 🔥 Modal Evaluator Berat (SUDAH DIPERBARUI) 🔥 
              Ditambahkan prop 'metode' agar evaluator tahu apakah ini diet (turun) atau bulking (naik)
            */}
            {/* Modal Evaluator Berat */}
            <AnimatePresence>
              {isWeightModalOpen && (
                <WeightEvaluator 
                  isOpen={isWeightModalOpen} 
                  onClose={() => setIsWeightModalOpen(false)} 
                  currentDay={currentDay} 
                  beratTarget={beratTarget} 
                  metode={metodeDiet} // PASTIKAN PROP INI ADA
                  onSaveWeight={handleSaveWeight} 
                />
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}