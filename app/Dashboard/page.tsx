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
  
  // State untuk data Dashboard (Default diset ke 0 atau 1)
  const [currentDay, setCurrentDay] = useState(1);
  const [kaloriMasuk, setKaloriMasuk] = useState(0); 
  const [kaloriKeluar, setKaloriKeluar] = useState(0); 

  // Mengambil data user dan data kalori yang spesifik akun saat halaman dimuat
  useEffect(() => {
    // 1. CEK LOGIN USER
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");

    if (activeUsername && storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: any) => u.username === activeUsername);
      
      if (foundUser) {
        setUser(foundUser);
        
        // --- PERUBAHAN 1: PROGRESS DAY MENYESUAIKAN AKUN ---
        // Mengambil currentDay dari data akun user yang tersimpan, jika belum ada default ke 1
        const userDay = foundUser.currentDay || 1;
        setCurrentDay(userDay);

        // --- PERUBAHAN 2: KKM & KKL SPESIFIK AKUN (ULANG DARI 0 JIKA BARU LOGIN) ---
        // Kunci local storage sekarang menggunakan nama username di belakangnya
        const savedKkm = localStorage.getItem(`gopushkal_kkm_today_${activeUsername}`);
        const savedKkl = localStorage.getItem(`gopushkal_kkl_today_${activeUsername}`);

        // Jika data kalori akun ini ada di browser, pasang angkanya. Jika tidak ada, otomatis tetap 0
        setKaloriMasuk(savedKkm ? parseInt(savedKkm) : 0);
        setKaloriKeluar(savedKkl ? parseInt(savedKkl) : 0);

      } else {
        router.push("/Login");
      }
    } else {
      router.push("/Login");
    }
  }, [router]);

  // Fungsi saat menekan tombol "Simpan & Lanjut ke Hari Berikutnya"
  const handleSimpanStatistik = () => {
    if (!user) return;

    const nextDay = currentDay + 1;
    alert(`Data berhasil disimpan ke Statistik! Melangkah ke Hari ${nextDay}`);
    
    // 1. Update state di UI
    setCurrentDay(nextDay);

    // 2. Simpan progress DAY baru ke dalam database user (gopushkal_users) agar permanen di akunnya
    const storedUsers = localStorage.getItem("gopushkal_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => {
        if (u.username === user.username) {
          return { ...u, currentDay: nextDay }; // update hari untuk user aktif
        }
        return u;
      });
      localStorage.setItem("gopushkal_users", JSON.stringify(updatedUsers));
    }

    // 3. Reset nilai KKM dan KKL akun ini ke 0 karena sudah ganti hari
    localStorage.removeItem(`gopushkal_kkm_today_${user.username}`);
    localStorage.removeItem(`gopushkal_kkl_today_${user.username}`);
    setKaloriMasuk(0);
    setKaloriKeluar(0);
  };

  // Loading screen saat data sedang diambil
  if (!user) return <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center font-bold text-xl">Loading...</div>;

  return (
    <section className="min-h-screen bg-black flex flex-col items-center pt-28 pb-10">
      
      {/* NAVBAR BAWAAN ANDA */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>
        </div>
        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1 font-bold border-b-2 border-black">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKL</Link>
        </div>
      </section>

      {/* ISI WEBSITE / KONTEN DASHBOARD */}
      <div className="w-full max-w-5xl px-4 flex flex-col gap-2">
        
        {/* Judul & Sapaan */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Selamat datang, <span className="text-white font-semibold">{user.namaLengkap}</span>! 
            Target Anda: <span className="text-yellow-400 font-semibold">{user.targetKalori}</span>
          </p>
        </div>

        {/* 1. Komponen Kotak KKM, KKL, Day */}
        <CalorieSummary 
          kaloriMasuk={kaloriMasuk} 
          kaloriKeluar={kaloriKeluar} 
          day={currentDay} 
        />
        
        {/* 2. Komponen Bar Perbandingan Merah-Hijau */}
        <CalorieComparison 
          kaloriMasuk={kaloriMasuk} 
          kaloriKeluar={kaloriKeluar} 
        />
        
        {/* 3. Komponen Rekomendasi Otomatis */}
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