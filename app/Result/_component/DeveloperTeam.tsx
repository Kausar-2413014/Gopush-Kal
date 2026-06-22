"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function DeveloperTeam() {
  // Definisi variasi animasi
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
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
            <div className="w-32 h-32 shrink-0 relative rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/Penguin.gif" 
                alt="Foto Kausar" 
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            
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
            <div className="w-32 h-32 shrink-0 relative rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/Neuron.gif" 
                alt="Foto Samuel" 
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col text-center sm:text-left">
              <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">Samuel Georgiou</h3>
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
          {"©"} {new Date().getFullYear()} GOPUSHKAL. Dibuat dengan dedikasi untuk Proyek Sistem Informasi.
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
          {/* Mengembalikan ke format Tailwind CSS Anda (bg-linear-to-r) */}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4184e8] to-[#9b51e0] text-xs font-bold tracking-wider">
            Gemini AI Engine
          </span>
        </div>
      </motion.div>
    </div>
  );
}