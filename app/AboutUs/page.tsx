"use client";

import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { 
  IconBarbell, 
  IconRun, 
  IconBike, 
  IconHeartbeat, 
  IconJumpRope, 
  IconSwimming, 
  IconTreadmill, 
  IconStretching 
} from "@tabler/icons-react";


export default function AboutUsPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mencegah Hydration Error: Merender animasi hanya setelah client siap
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

  // Jika belum mounted, kembalikan layar hitam kosong sesaat agar tidak error mismatch
  if (!isMounted) return <main className="min-h-screen bg-black" />;

  // Pengaturan Animasi In and Out untuk Kotak/Card
 const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};


  return (
    <main suppressHydrationWarning className="min-h-screen bg-black flex flex-col items-center pt-28 pb-12 relative overflow-hidden">
      
      {/* ========================================== */}
      {/* BACKGROUND FLOATING ICONS (TABLER ICONS) */}
      {/* ========================================== */}
      {/* Sisi Kiri */}
      <motion.div 
        className="fixed top-[20%] left-[5%] text-white/10 z-0 pointer-events-none"
        animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ><IconBarbell size={80} /></motion.div>
      
      <motion.div 
        className="fixed top-[50%] left-[8%] text-white/10 z-0 pointer-events-none"
        animate={{ y: [0, 40, 0], rotate: [0, -20, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      ><IconRun size={90} /></motion.div>

      <motion.div 
        className="fixed bottom-[15%] left-[4%] text-yellow-400/10 z-0 pointer-events-none"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      ><IconJumpRope size={70} /></motion.div>

      {/* Sisi Kanan */}
      <motion.div 
        className="fixed top-[25%] right-[6%] text-yellow-400/10 z-0 pointer-events-none"
        animate={{ y: [0, 35, 0], rotate: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      ><IconHeartbeat size={85} /></motion.div>

      <motion.div 
        className="fixed top-[60%] right-[4%] text-white/10 z-0 pointer-events-none"
        animate={{ y: [0, -40, 0], rotate: [0, -10, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      ><IconBike size={100} /></motion.div>

      <motion.div 
        className="fixed bottom-[10%] right-[8%] text-white/10 z-0 pointer-events-none"
        animate={{ y: [0, 20, 0], x: [0, 15, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      ><IconStretching size={75} /></motion.div>


      {/* ========================================== */}
      {/* NAVBAR */}
      {/* ========================================== */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="/Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
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

            {isMenuOpen && (
              <div className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                <Link href="/Profile" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">Profile Anda</Link>
                <Link href="/AboutUs" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">About Us</Link>
                <div className="border-t border-gray-700 my-1"></div>
                <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors">Log Out</button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKL</Link>
        </div>
      </section>

      {/* ========================================== */}
      {/* ISI KONTEN UTAMA */}
      {/* ========================================== */}
      <div className="w-full max-w-7xl px-6 md:px-12 z-10 flex flex-col items-center">
        
        {/* JUDUL */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={cardVariants}
          className="text-center mb-16 pt-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter uppercase mb-4">
            ABOUT <span className="text-yellow-400">US</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Kenali lebih dekat platform pelacak kesehatan digital yang dirancang khusus untuk mengoptimalkan gaya hidup sehat Anda.
          </p>
        </motion.div>

        {/* SECTION 1: KISAH GOPUSHKAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-16 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-7 bg-[#0a0a0a] border border-gray-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl transition-colors duration-500"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold text-yellow-400 uppercase tracking-tight mb-5 flex items-center gap-3">
                <span className="text-3xl">🚀</span> KISAH KAMI
              </h2>
              <p className="text-gray-300 leading-relaxed text-base mb-4">
                GOPUSHKAL lahir sebagai solusi inovatif atas kompleksitas pengelolaan defisit dan surplus energi harian. Kami memahami bahwa menjaga keseimbangan nutrisi serta aktivitas fisik membutuhkan konsistensi yang tinggi. 
              </p>
              <p className="text-gray-400 leading-relaxed text-sm">
                Melalui integrasi kalkulator asupan makanan cerdas (KKM) dan pemantau pembakaran aktivitas (KKL), platform ini menyederhanakan pelacakan kalori harian Anda menjadi sebuah pengalaman interaktif yang intuitif, cepat, dan akurat.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-5 bg-linear-to-br from-[#111111] to-[#050505] border-2 border-yellow-400 rounded-3xl p-8 h-full flex flex-col justify-center shadow-[0_0_15px_rgba(255,215,0,0.02)]"
          >
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight mb-5 flex items-center gap-3">
              <span className="text-3xl">🎯</span> VISI UTAMA
            </h2>
            <p className="text-gray-300 leading-relaxed text-base italic border-l-4 border-yellow-400 pl-5 py-1">
              "Menjadi ekosistem kesehatan digital nomor satu yang memberdayakan individu untuk mencapai transformasi fisik ideal mereka secara konsisten dan terukur."
            </p>
          </motion.div>
        </div>

        {/* SECTION 2: TIM PENGEMBANG */}
        <div className="w-full mb-16 pt-6">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={cardVariants}
            className="text-2xl font-extrabold text-center text-white uppercase tracking-widest mb-10 pb-2 border-b border-gray-900 mx-auto max-w-sm"
          >
            TIM <span className="text-yellow-400">PENGEMBANG</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            
            {/* PROFIL 1: MUHAMMAD KAUSAR */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03, borderColor: "rgba(250, 204, 21, 0.5)" }}
              className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-3xl flex flex-col sm:flex-row gap-6 items-center sm:items-start group transition-colors shadow-xl"
            >
              <img src="/Kausar.jpg" alt="Foto Kausar" className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-xl group-hover:scale-105 transition-transform duration-300" />
              
              <div className="flex flex-col text-center sm:text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">Muhammad Kausar</h3>
                <p className="text-yellow-400/80 font-semibold tracking-widest text-xs uppercase mb-3 bg-yellow-400/10 px-3 py-1 rounded inline-block self-center sm:self-start">Full-stack Developer</p>
                <div className="mb-4 pb-3 border-b border-gray-800">
                    <span className="text-sm font-semibold text-gray-200">Mahasiswa (SIB4A) - Sistem Informasi</span>
                    <p className="text-gray-500 text-xs">Universitas Mulia Balikpapan</p>
                </div>
                <div className="text-gray-400 text-sm leading-relaxed text-justify sm:text-left">
                    <span className="font-semibold text-white text-xs block mb-1">Tanggung Jawab Utama:</span>
                    Membangun logika inti aplikasi (Backend), mendesain <span className="text-yellow-400 font-medium">Login Page, Dashboard utama</span>, sistem perhitungan <span className="text-yellow-400 font-medium">KKL & KKM</span>, serta menyusun fungsi <span className="text-yellow-400 font-medium">Developer Setting</span>.
                </div>
              </div>
            </motion.div>

            {/* PROFIL 2: SAMUEL G */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03, borderColor: "rgba(250, 204, 21, 0.5)" }}
              className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-3xl flex flex-col sm:flex-row gap-6 items-center sm:items-start group transition-colors shadow-xl"
            >
              <img src="/Samuel.jpg" alt="Foto Samuel" className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-xl group-hover:scale-105 transition-transform duration-300" />
              
              <div className="flex flex-col text-center sm:text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">Samuel G</h3>
                <p className="text-yellow-400/80 font-semibold tracking-widest text-xs uppercase mb-3 bg-yellow-400/10 px-3 py-1 rounded inline-block self-center sm:self-start">UI/UX & Front-end Developer</p>
                <div className="mb-4 pb-3 border-b border-gray-800">
                    <span className="text-sm font-semibold text-gray-200">Mahasiswa (SIB4A) - Sistem Informasi</span>
                    <p className="text-gray-500 text-xs">Universitas Mulia Balikpapan</p>
                </div>
                <div className="text-gray-400 text-sm leading-relaxed text-justify sm:text-left">
                    <span className="font-semibold text-white text-xs block mb-1">Tanggung Jawab Utama:</span>
                    Mendesain antarmuka pengguna (Frontend) yang modern. Membuat desain visual untuk halaman <span className="text-yellow-400 font-medium">Statistik, Profile, dan About Us</span>, serta merancang identitas visual <span className="text-yellow-400 font-medium">Desain Logo</span> GOPUSHKAL.
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 3: CREDIT FOOTER */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={cardVariants}
          className="flex flex-col items-center gap-6 border-t border-gray-900 pt-10 w-full mt-auto"
        >
          <p className="text-center text-gray-500 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} GOPUSHKAL. Dibuat dengan dedikasi untuk Proyek Sistem Informasi.
          </p>
          
          <div className="flex items-center gap-2 bg-gray-900/50 px-5 py-2.5 rounded-full border border-gray-800 shadow-[0_0_15px_rgba(65,132,232,0.05)] transition-shadow duration-300 cursor-default">
            <span className="text-gray-400 text-xs font-medium tracking-wide">Powered by</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-pulse">
              <defs>
                <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4184e8" />
                  <stop offset="100%" stopColor="#9b51e0" />
                </linearGradient>
              </defs>
              <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill="url(#gemini-grad)" />
            </svg>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4184e8] to-[#9b51e0] text-xs font-bold tracking-wider">
              Gemini AI Engine
            </span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}