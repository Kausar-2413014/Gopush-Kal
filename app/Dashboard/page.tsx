"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import animasi
import CalorieComparison from './_component/CalorieComparison';
import CalorieSummary from './_component/CalorieSummary';
import DailyRecommendation from './_component/DailyRecommendation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu garis tiga
  
  const [currentDay, setCurrentDay] = useState(1);
  const [kaloriMasuk, setKaloriMasuk] = useState(0); 
  const [kaloriKeluar, setKaloriKeluar] = useState(0); 

  useEffect(() => {
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

  // Fungsi untuk tombol "Simpan & Lanjut Hari Berikutnya" di DailyRecommendation
  const handleNextDay = () => {
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");
    
    if(activeUsername && storedUsers) {
        let users = JSON.parse(storedUsers);
        users = users.map((u: any) => u.username === activeUsername ? { ...u, currentDay: (u.currentDay || 1) + 1 } : u);
        
        localStorage.setItem("gopushkal_users", JSON.stringify(users));
        localStorage.removeItem(`gopushkal_kkm_today_${activeUsername}`);
        localStorage.removeItem(`gopushkal_kkl_today_${activeUsername}`);
        
        window.location.reload();
    }
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  if (!user) return <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center font-bold text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-28 pb-32 relative overflow-hidden">
      
      {/* BACKGROUND AMBIENT GLOW: Sama seperti di Profile */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-500px h-500px bg-yellow-400/5 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-40 w-500px h-500px bg-yellow-400/5 blur-[140px] rounded-full"></div>
      </div>

      {/* NAVBAR SERAGAM (Dengan Dropdown Profile/Logout) */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>
          <div className="relative ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-yellow-400 transition-colors flex flex-col justify-center gap-1.5">
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>
            {isMenuOpen && (
              <div className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                <Link href="/Profile" className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">Profile Anda</Link>
                <Link href="/AboutUs" className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">About Us</Link>
                <div className="border-t border-gray-700 my-1"></div>
                <button onClick={handleLogout} className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors">Log Out</button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block px-3 py-1 bg-gray-900 text-yellow-400 rounded-md">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block hover:-translate-y-1 transition-transform">KKM</Link>
          <Link href="/Statistik" className="inline-block hover:-translate-y-1 transition-transform">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block hover:-translate-y-1 transition-transform">KKL</Link>
        </div>
      </section>

      {/* ISI HALAMAN DASHBOARD */}
      <div className="w-full max-w-5xl px-6 z-10 flex flex-col gap-4">
        
        {/* JUDUL: Font & Ukuran disamakan dengan Profile */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-yellow-400 tracking-tighter uppercase mb-4">
            Dashboard 
          </h1>
          <p className="text-gray-400 text-lg">
            Selamat datang, <span className="text-white font-bold">{user.namaLengkap}</span>! <br className="md:hidden"/>
            Target Program: <span className="text-yellow-400 font-black uppercase px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-lg ml-1">{user.targetKalori}</span>
          </p>
        </motion.div>

        {/* KOMPONEN DENGAN ANIMASI STAGGER (Muncul bergantian dari bawah) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <CalorieSummary 
            kaloriMasuk={kaloriMasuk} 
            kaloriKeluar={kaloriKeluar} 
            day={currentDay} 
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CalorieComparison 
            kaloriMasuk={kaloriMasuk} 
            kaloriKeluar={kaloriKeluar} 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <DailyRecommendation 
            targetMode={user.targetKalori} 
            kaloriMasuk={kaloriMasuk} 
            kaloriKeluar={kaloriKeluar} 
            onSave={handleNextDay} 
          />
        </motion.div>

      </div>
    </div>
  );
}