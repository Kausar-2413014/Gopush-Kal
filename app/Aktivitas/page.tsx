"use client";

import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, Variants } from "framer-motion";
import ActivitySelector from "./_component/ActivitySelector";
import ActivityBox from "./_component/ActivityBox";
// Import Tabler Icons bertema Olahraga/Aktivitas
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

// Komponen Counter Angka Animasi
function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function AktivitasPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // State Aktivitas
  const [sessionCount, setSessionCount] = useState<number | null>(null);
  const [sessionTotals, setSessionTotals] = useState<number[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari akun?");
    if (confirmLogout) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  const getSessionLabels = (count: number) => {
    if (count === 1) return ["Olahraga Utama"];
    if (count === 2) return ["Olahraga Pagi", "Olahraga Sore"];
    if (count === 3) return ["Sesi Pagi", "Sesi Siang", "Sesi Malam"];
    return Array.from({ length: count }, (_, i) => `Sesi Olahraga ${i + 1}`);
  };

  const handleSelectSessions = (count: number) => {
    setSessionCount(count);
    setSessionTotals(new Array(count).fill(0));
  };

  const handleUpdateBoxTotal = (index: number, newTotal: number) => {
    setSessionTotals(prev => {
      const updatedTotals = [...prev];
      updatedTotals[index] = newTotal;
      return updatedTotals;
    });
  };

  const grandTotalCalories = sessionTotals.reduce((a, b) => a + b, 0);

  const handleSimpanKKL = () => {
    const activeUser = localStorage.getItem("gopushkal_currentUser");
    if (activeUser) {
      localStorage.setItem(`gopushkal_kkl_today_${activeUser}`, grandTotalCalories.toString());
      alert(`Berhasil menyimpan ${grandTotalCalories} Kkal pembakaran untuk hari ini!`);
      router.push("/Dashboard");
    } else {
      alert("Anda harus login terlebih dahulu.");
      router.push("/");
    }
  };

  // Proteksi Hydration
  if (!isMounted) return <main className="min-h-screen bg-black" />;

  // Variasi Animasi In and Out Sesuai Spek KKM
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-black text-white font-sans overflow-x-clap pt-28 pb-10 relative">
      
      {/* ========================================== */}
      {/* BACKGROUND FLOATING ICONS (SPORTS THEME) */}
      {/* ========================================== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Sisi Kiri */}
        <motion.div 
          className="absolute top-[25%] left-[5%] text-red-500/10 hidden xl:block"
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        ><IconBarbell size={70} /></motion.div>
        
        <motion.div 
          className="absolute top-[55%] left-[8%] text-white/10 hidden xl:block"
          animate={{ y: [0, 30, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        ><IconRun size={80} /></motion.div>

        <motion.div 
          className="absolute bottom-[20%] left-[4%] text-orange-500/10 hidden xl:block"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        ><IconJumpRope size={60} /></motion.div>

        {/* Sisi Kanan */}
        <motion.div 
          className="absolute top-[30%] right-[6%] text-white/10 hidden xl:block"
          animate={{ y: [0, 35, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        ><IconHeartbeat size={75} /></motion.div>

        <motion.div 
          className="absolute top-[60%] right-[5%] text-red-500/10 hidden xl:block"
          animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        ><IconBike size={90} /></motion.div>

        <motion.div 
          className="absolute bottom-[15%] right-[7%] text-white/10 hidden xl:block"
          animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        ><IconSwimming size={65} /></motion.div>
      </div>

      {/* ========================================== */}
      {/* NAVBAR ASLI (KUNING) - TIDAK DIUBAH SAMA SEKALI */}
      {/* ========================================== */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>

          <div className="relative ml-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-yellow-400 transition-colors focus:outline-none flex flex-col justify-center items-center gap-1.5"
            >
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50"
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
          <Link href="/Dashboard" className="inline-block hover:-translate-y-1 transition-transform">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block hover:-translate-y-1 transition-transform">KKM</Link>
          <Link href="/Statistik" className="inline-block hover:-translate-y-1 transition-transform">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block px-3 py-1 bg-gray-900 text-yellow-400 rounded-md">KKL</Link>
        </div>
      </section>

      {/* ========================================== */}
      {/* KONTEN KALKULATOR OLAHRAGA DENGAN ANIMASI */}
      {/* ========================================== */}
      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col gap-6 z-10 relative">
        
        {/* JUDUL DENGAN ANIMASI IN & OUT */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={cardVariants}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-wide mb-2 uppercase">Input Kalori <span className="text-red-500">Keluar</span></h1>
          <p className="text-gray-400">Catat semua aktivitas fisik dan olahraga yang Anda lakukan hari ini.</p>
        </motion.div>

        {/* AnimatePresence untuk pertukaran halaman */}
        <AnimatePresence mode="wait">
          {sessionCount === null ? (
            <motion.div 
              key="selector" 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={cardVariants}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <ActivitySelector onSelect={handleSelectSessions} />
            </motion.div>
          ) : (
            <motion.div 
              key="activityBoxes"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={cardVariants}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between bg-black/50 border border-gray-800 p-4 rounded-xl">
                <h2 className="text-xl text-white font-semibold">Daftar Aktivitas Anda</h2>
                <button onClick={() => setSessionCount(null)} className="text-yellow-400 text-sm hover:underline font-bold">
                  🔄 Ubah Frekuensi Olahraga
                </button>
              </div>

              {getSessionLabels(sessionCount).map((label, index) => (
                <ActivityBox key={index} index={index} label={label} onUpdateTotal={(total) => handleUpdateBoxTotal(index, total)} />
              ))}

              {/* Panel Hasil Akhir Merah (KKL) dengan Counter Animasi */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={cardVariants}
                className="mt-8 bg-red-900/20 border-2 border-red-500/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
              >
                <div>
                  <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">Total Kalori Keluar (KKL)</p>
                  <p className="text-4xl md:text-5xl font-bold text-red-500">
                    <AnimatedCounter value={grandTotalCalories} /> <span className="text-xl md:text-2xl font-normal">KKAL</span>
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleSimpanKKL}
                  className="bg-red-500 hover:bg-red-400 text-white font-black text-lg px-8 py-4 rounded-xl transition-colors w-full md:w-auto uppercase shadow-lg shadow-red-500/20"
                >
                  Kirim Ke Dashboard
                </motion.button>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}