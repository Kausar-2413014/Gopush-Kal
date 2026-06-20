"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CalorieComparison from './_component/CalorieComparison';
import CalorieSummary from './_component/CalorieSummary';
import DailyRecommendation from './_component/DailyRecommendation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
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

        setKaloriMasuk(savedKkm ? parseInt(savedKkm) : 0);
        setKaloriKeluar(savedKkl ? parseInt(savedKkl) : 0);

      } else {
        router.push("/Login");
      }
    } else {
      router.push("/Login");
    }
  }, [router]);

  const handleSimpanStatistik = () => {
    if (!user) return;

    const nextDay = currentDay + 1;
    alert(`Data berhasil disimpan ke Statistik! Melangkah ke Hari ${nextDay}`);
    
    setCurrentDay(nextDay);

    const storedUsers = localStorage.getItem("gopushkal_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => {
        if (u.username === user.username) {
          return { ...u, currentDay: nextDay }; 
        }
        return u;
      });
      localStorage.setItem("gopushkal_users", JSON.stringify(updatedUsers));
    }

    localStorage.removeItem(`gopushkal_kkm_today_${user.username}`);
    localStorage.removeItem(`gopushkal_kkl_today_${user.username}`);
    setKaloriMasuk(0);
    setKaloriKeluar(0);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari akun?");
    if (confirmLogout) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  if (!user) return <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center font-bold text-xl">Loading...</div>;

  return (
    <section className="min-h-screen bg-black flex flex-col items-center pt-28 pb-10">
      
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
                  className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors"
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
          <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1 font-bold border-b-2 border-black">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKL</Link>
        </div>
      </section>

      <div className="w-full max-w-5xl px-4 flex flex-col gap-2">
        
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Selamat datang, <span className="text-white font-semibold">{user.namaLengkap}</span>! 
            Target Anda: <span className="text-yellow-400 font-semibold">{user.targetKalori}</span>
          </p>
        </div>

        <CalorieSummary 
          kaloriMasuk={kaloriMasuk} 
          kaloriKeluar={kaloriKeluar} 
          day={currentDay} 
        />
        
        {/* Desain Gabungan (Pie Chart & Angka) akan muncul di sini */}
        <CalorieComparison 
          kaloriMasuk={kaloriMasuk} 
          kaloriKeluar={kaloriKeluar} 
        />

        <DailyRecommendation 
          targetMode={user.targetKalori} 
          kaloriMasuk={kaloriMasuk} 
          kaloriKeluar={kaloriKeluar}
          onSave={handleSimpanStatistik}
        />

      </div>
    </section>
  );
}