"use client";

import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";
import ActivitySelector from "./_component/ActivitySelector";
import ActivityBox from "./_component/ActivityBox";

export default function AktivitasPage() {
  const router = useRouter();
  const [sessionCount, setSessionCount] = useState<number | null>(null);
  const [sessionTotals, setSessionTotals] = useState<number[]>([]);

  // Penamaan label otomatis berdasarkan jumlah sesi olahraga
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
    const updatedTotals = [...sessionTotals];
    updatedTotals[index] = newTotal;
    setSessionTotals(updatedTotals);
  };

  // Kalkulasi total kalori keluar
  const grandTotalCalories = sessionTotals.reduce((acc, curr) => acc + curr, 0);

  const handleSimpanKKL = () => {
  const activeUsername = localStorage.getItem("gopushkal_currentUser");
  if (activeUsername) {
    // Menyimpan spesifik untuk user yang sedang aktif
    localStorage.setItem(`gopushkal_kkl_today_${activeUsername}`, grandTotalCalories.toString());
    alert(`Berhasil menyimpan ${grandTotalCalories} Kkal Terbakar! Kembali ke Dashboard.`);
    router.push("/Dashboard");
  }
};

  return (
    <section className="min-h-screen bg-black flex flex-col items-center pt-28 pb-10">
      {/* NAVBAR */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>
        </div>
        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 font-bold border-b-2 border-black">KKL</Link>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <div className="w-full max-w-4xl px-4 flex flex-col gap-6">
        
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-yellow-400 tracking-wide">Kalkulator Kalori Keluar</h1>
          <p className="text-gray-400 mt-2">Catat aktivitas fisik dan olahraga Anda untuk menghitung kalori terbakar.</p>
        </div>

        {/* Jika belum pilih jumlah olahraga, tampilkan Selector bundar */}
        {!sessionCount ? (
          <ActivitySelector onSelect={handleSelectSessions} />
        ) : (
          /* Jika sudah pilih, tampilkan Kotak Olahraga */
          <div className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <h2 className="text-xl text-white font-semibold">Daftar Aktivitas Anda</h2>
              <button 
                onClick={() => setSessionCount(null)}
                className="text-yellow-400 text-sm hover:underline"
              >
                Ubah Frekuensi Olahraga
              </button>
            </div>

            {/* Render Kotak (ActivityBox) sesuai jumlah */}
            {getSessionLabels(sessionCount).map((label, index) => (
              <ActivityBox 
                key={index} 
                label={label} 
                onUpdateTotal={(total) => handleUpdateBoxTotal(index, total)} 
              />
            ))}

            {/* PANEL HASIL & SIMPAN (Warna Merah untuk Kalori Keluar) */}
            <div className="mt-8 bg-red-900/30 border-2 border-red-500 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">Total Kalori Keluar (KKL)</p>
                <p className="text-4xl font-bold text-red-500">{grandTotalCalories} <span className="text-xl">KKAL</span></p>
              </div>
              <button 
                onClick={handleSimpanKKL}
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all transform hover:scale-105"
              >
                Hitung & Simpan ke Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}