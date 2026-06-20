"use client";

import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutUsPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi khusus untuk Logout di Navbar
  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari akun?");
    if (confirmLogout) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  return (
    <section className="min-h-screen bg-black flex flex-col items-center pt-28 pb-10">
      
      {/* ========================================== */}
      {/* NAVBAR */}
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

            {isMenuOpen && (
              <div className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
                <Link 
                  href="/Profile" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors"
                >
                  Profile Anda
                </Link>
                <Link 
                  href="/AboutUs" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-3 text-yellow-400 font-bold bg-gray-900 border-l-4 border-yellow-400"
                >
                  About Us
                </Link>
                
                <div className="border-t border-gray-700 my-1"></div>
                
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors"
                >
                  Log Out
                </button>
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
      {/* KONTEN HALAMAN ABOUT US */}
      {/* ========================================== */}
      <div className="w-full max-w-5xl px-4 flex flex-col items-center">
        
        {/* Header Judul */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide mb-4">Tentang Kami</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            GOPUSHKAL dikembangkan oleh tim mahasiswa yang berdedikasi tinggi untuk menciptakan ekosistem pencatatan kalori yang modern, cepat, dan mudah digunakan.
          </p>
        </div>

        {/* Container Kartu Profil */}
        <div className="flex flex-col gap-8 w-full">
          
          {/* ========================================== */}
          {/* KARTU PROFIL 1: MUHAMMAD KAUSAR */}
          {/* ========================================== */}
          <div className="bg-[#0a0a0a] border border-yellow-400/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-stretch text-center md:text-left shadow-[0_0_20px_rgba(255,215,0,0.05)] hover:border-yellow-400 transition-colors duration-300 group relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/3 md:pr-8 md:border-r border-gray-800 mb-6 md:mb-0 z-10">
              <div className="w-32 h-32 rounded-full bg-black border-4 border-yellow-400 mb-4 flex items-center justify-center overflow-hidden z-10 shadow-lg">
                <img src="Kausar.jpg" alt="Foto Kausar" className="w-full h-full object-cover" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">Muhammad Kausar</h2>
              <p className="text-yellow-400 font-semibold tracking-widest text-xs mb-4">FULL-STACK DEVELOPER</p>

              <div className="flex gap-3 text-gray-400">
                <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 tooltip" title="Programming & Logic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></svg>
                </div>
                <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 tooltip" title="Database & System">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><ellipse cx="12" cy="6" rx="8" ry="3"></ellipse><path d="M4 6v6a8 3 0 0 0 16 0v-6"></path><path d="M4 12v6a8 3 0 0 0 16 0v-6"></path></svg>
                </div>
                <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 tooltip" title="Developer Settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center w-full md:w-2/3 md:pl-8 z-10">
              <div className="mb-4 pb-4 border-b border-gray-800">
                <span className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>
                  Status Akademik
                </span>
                <span className="block text-white font-medium text-lg">Mahasiswa (SIB4A) - Sistem Informasi</span>
                <span className="block text-yellow-400/80 text-sm">Universitas Mulia Balikpapan</span>
              </div>
              
              <div>
                <span className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                  Tanggung Jawab Utama
                </span>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">
                  Merancang arsitektur sistem dan membangun logika inti aplikasi (Backend & Logic). Bertanggung jawab penuh atas pengembangan <span className="text-yellow-400 font-semibold">Login Page, Dashboard utama, Sistem Perhitungan Kalori KKL & KKM</span>, serta menyusun fungsionalitas <span className="text-yellow-400 font-semibold">Developer Setting</span> untuk kontrol aplikasi.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* KARTU PROFIL 2: SAMUEL G */}
          {/* ========================================== */}
          <div className="bg-[#0a0a0a] border border-yellow-400/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-stretch text-center md:text-left shadow-[0_0_20px_rgba(255,215,0,0.05)] hover:border-yellow-400 transition-colors duration-300 group relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/3 md:pr-8 md:border-r border-gray-800 mb-6 md:mb-0 z-10">
              <div className="w-32 h-32 rounded-full bg-black border-4 border-yellow-400 mb-4 flex items-center justify-center overflow-hidden z-10 shadow-lg">
                <img src="Samuel.jpg" alt="Foto samuel" className="w-full h-full object-cover" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">Samuel G</h2>
              <p className="text-yellow-400 font-semibold tracking-widest text-xs mb-4">UI/UX & FRONT-END DEVELOPER</p>

              <div className="flex gap-3 text-gray-400">
                <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 tooltip" title="Design & Visuals">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /><circle cx="8.5" cy="10.5" r="1" /><circle cx="12.5" cy="7.5" r="1" /><circle cx="16.5" cy="10.5" r="1" /></svg>
                </div>
                <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 tooltip" title="Interface Layout">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v8h-6z" /><path d="M4 16h6v4h-6z" /><path d="M14 12h6v8h-6z" /><path d="M14 4h6v4h-6z" /></svg>
                </div>
                <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 tooltip" title="Data Visualization">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 20l14 0" /></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center w-full md:w-2/3 md:pl-8 z-10">
              <div className="mb-4 pb-4 border-b border-gray-800">
                <span className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>
                  Status Akademik
                </span>
                <span className="block text-white font-medium text-lg">Mahasiswa (SIB4A) - Sistem Informasi</span>
                <span className="block text-yellow-400/80 text-sm">Universitas Mulia Balikpapan</span>
              </div>
              
              <div>
                <span className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                  Tanggung Jawab Utama
                </span>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">
                  Berfokus pada visualisasi antarmuka dan menciptakan pengalaman pengguna yang mulus (Frontend). Mengembangkan dan mendesain halaman <span className="text-yellow-400 font-semibold">Statistik, Profile, dan About Us</span>, serta merancang seluruh identitas visual aplikasi termasuk <span className="text-yellow-400 font-semibold">Desain Logo</span> GOPUSHKAL.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================== */}
        {/* FOOTER & POWERED BY GEMINI BADGE */}
        {/* ========================================== */}
        <div className="mt-16 mb-4 flex flex-col items-center gap-4 border-t border-gray-800 pt-8 w-full max-w-lg">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GOPUSHKAL. Dibuat dengan dedikasi untuk Proyek Sistem Informasi.
          </p>
          
          <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 shadow-[0_0_15px_rgba(65,132,232,0.1)] hover:shadow-[0_0_20px_rgba(65,132,232,0.2)] transition-shadow duration-300 cursor-default">
            <span className="text-gray-400 text-xs font-medium tracking-wide">Powered by</span>
            
            {/* Gemini SVG Star Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-pulse">
              <defs>
                <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4184e8" />
                  <stop offset="100%" stopColor="#9b51e0" />
                </linearGradient>
              </defs>
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="url(#gemini-grad)" />
            </svg>
            
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 font-bold text-sm tracking-wide">
              Gemini
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}