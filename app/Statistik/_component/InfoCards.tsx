"use client";

import { IconActivity, IconFlame, IconCheck, IconX, IconMinus } from "@tabler/icons-react";

interface InfoCardsProps {
  avgMasuk: number;
  avgKeluar: number;
  targetMode: string;
}

export default function InfoCards({ avgMasuk, avgKeluar, targetMode }: InfoCardsProps) {
  
  // 🔥 LOGIKA KONSISTENSI BERDASARKAN METODE / TARGET KALORI
  let isConsistent = false;
  let statusText = "Belum Ada Data";
  let statusColor = "text-gray-500";
  let bgIconColor = "bg-gray-500/10";
  let StatusIcon = IconMinus;

  if (avgMasuk > 0 || avgKeluar > 0) {
    // 1. Logika FAT LOSS (Defisit: KKM harus lebih rendah dari KKL)
    if (targetMode === "Fat Loss" || targetMode === "Cutting") {
      isConsistent = avgMasuk < avgKeluar;
      statusText = isConsistent ? "Baik (Defisit)" : "Buruk (Surplus)";
    } 
    // 2. Logika BULKING / MUSCLE GAIN (Surplus: KKM harus lebih besar dari KKL)
    else if (targetMode === "Muscle Gain" || targetMode === "Bulking") {
      isConsistent = avgMasuk > avgKeluar;
      statusText = isConsistent ? "Baik (Surplus)" : "Buruk (Defisit)";
    } 
    // 3. Logika MAINTENANCE (Seimbang: Selisih KKM dan KKL maksimal 200 Kkal)
    else { 
      const selisih = Math.abs(avgMasuk - avgKeluar);
      isConsistent = selisih <= 200;
      statusText = isConsistent ? "Baik (Seimbang)" : "Buruk (Jomplang)";
    }

    // Tentukan warna dan ikon berdasarkan hasil evaluasi
    statusColor = isConsistent ? "text-green-400" : "text-red-500";
    bgIconColor = isConsistent ? "bg-green-500/10" : "bg-red-500/10";
    StatusIcon = isConsistent ? IconCheck : IconX;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* CARD KANAN - RATA-RATA KALORI MASUK */}
      <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
        <div className="p-4 bg-green-500/10 rounded-xl text-green-400">
          <IconActivity size={32} />
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider">Avg. Masuk (KKM)</p>
          <p className="text-2xl font-bold text-white">
            {avgMasuk} <span className="text-sm text-gray-500">Kkal</span>
          </p>
        </div>
      </div>
      
      {/* CARD TENGAH - RATA-RATA KALORI KELUAR */}
      <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
        <div className="p-4 bg-red-500/10 rounded-xl text-red-500">
          <IconFlame size={32} />
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider">Avg. Keluar (KKL)</p>
          <p className="text-2xl font-bold text-white">
            {avgKeluar} <span className="text-sm text-gray-500">Kkal</span>
          </p>
        </div>
      </div>

      {/* CARD KIRI - STATUS KONSISTENSI (BERDASARKAN METODE) */}
      <div className={`bg-[#111111] border ${isConsistent ? 'border-green-500/30' : 'border-red-500/30'} rounded-2xl p-6 shadow-lg flex items-center gap-4 transition-colors`}>
        <div className={`p-4 rounded-xl ${bgIconColor} ${statusColor}`}>
          <StatusIcon size={32} />
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
            Konsistensi ({targetMode || "Maintenance"})
          </p>
          <p className={`text-xl md:text-2xl font-bold ${statusColor}`}>
            {statusText}
          </p>
        </div>
      </div>

    </div>
  );
}