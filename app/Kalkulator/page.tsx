"use client";

import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";
import MealSelector from "./_component/MealSelector";
import MealBox from "./_component/MealBox";

export default function KalkulatorPage() {
  const router = useRouter();
  const [mealCount, setMealCount] = useState<number | null>(null);
  
  // State untuk menyimpan total kalori dari masing-masing kotak (index)
  const [mealTotals, setMealTotals] = useState<number[]>([]);

  // Penamaan label otomatis berdasarkan jumlah makan
  const getMealLabels = (count: number) => {
    if (count === 1) return ["Makan Utama"];
    if (count === 2) return ["Pagi", "Malam"];
    if (count === 3) return ["Pagi", "Siang", "Malam"];
    if (count === 4) return ["Pagi", "Siang", "Sore", "Malam"];
    return ["Sarapan", "Cemilan Pagi", "Makan Siang", "Cemilan Sore", "Makan Malam"];
  };

  const handleSelectMeals = (count: number) => {
    setMealCount(count);
    // Siapkan array kosong [0, 0, 0...] sebanyak kotak makan
    setMealTotals(new Array(count).fill(0));
  };

  const handleUpdateBoxTotal = (index: number, newTotal: number) => {
    const updatedTotals = [...mealTotals];
    updatedTotals[index] = newTotal;
    setMealTotals(updatedTotals);
  };

  // Kalkulasi total kalori keseluruhan hari ini
  const grandTotalCalories = mealTotals.reduce((acc, curr) => acc + curr, 0);

  const handleSimpanKKM = () => {
  const activeUsername = localStorage.getItem("gopushkal_currentUser");
  if (activeUsername) {
    // Menyimpan spesifik untuk user yang sedang aktif
    localStorage.setItem(`gopushkal_kkm_today_${activeUsername}`, grandTotalCalories.toString());
    alert(`Berhasil menyimpan ${grandTotalCalories} Kkal Masuk! Kembali ke Dashboard.`);
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
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 font-bold border-b-2 border-black">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKL</Link>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <div className="w-full max-w-4xl px-4 flex flex-col gap-6">
        
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-yellow-400 tracking-wide">Kalkulator Kalori Masuk</h1>
          <p className="text-gray-400 mt-2">Catat semua makanan dan minuman yang Anda konsumsi hari ini.</p>
        </div>

        {/* Jika belum pilih jumlah makan, tampilkan Selector */}
        {!mealCount ? (
          <MealSelector onSelect={handleSelectMeals} />
        ) : (
          /* Jika sudah pilih, tampilkan Kotak Makanan */
          <div className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <h2 className="text-xl text-white font-semibold">Daftar Menu Anda</h2>
              <button 
                onClick={() => setMealCount(null)}
                className="text-yellow-400 text-sm hover:underline"
              >
                Ubah Frekuensi Makan
              </button>
            </div>

            {/* Render Kotak (MealBox) sesuai jumlah makan */}
            {getMealLabels(mealCount).map((label, index) => (
              <MealBox 
                key={index} 
                label={label} 
                onUpdateTotal={(total) => handleUpdateBoxTotal(index, total)} 
              />
            ))}

            {/* Panel Hasil & Simpan */}
            <div className="mt-8 bg-green-900/30 border-2 border-green-500 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">Total Kalori Masuk (KKM)</p>
                <p className="text-4xl font-bold text-green-400">{grandTotalCalories} <span className="text-xl">KKAL</span></p>
              </div>
              <button 
                onClick={handleSimpanKKM}
                className="bg-green-500 hover:bg-green-600 text-black font-bold text-lg px-8 py-4 rounded-xl transition-all transform hover:scale-105"
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