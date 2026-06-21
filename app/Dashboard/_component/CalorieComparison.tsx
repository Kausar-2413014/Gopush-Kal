"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

interface Props {
  kaloriMasuk: number;
  kaloriKeluar: number;
}

export default function CalorieComparison({ kaloriMasuk, kaloriKeluar }: Props) {
  const selisihKalori = kaloriMasuk - kaloriKeluar;
  const isMinus = selisihKalori < 0;
  
  const total = kaloriMasuk + kaloriKeluar;
  const persenMasuk = total > 0 ? (kaloriMasuk / total) * 100 : 0;
  
  const displayPersenMasuk = total > 0 ? Math.round(persenMasuk) : 0;
  const displayPersenKeluar = total > 0 ? 100 - displayPersenMasuk : 0;

  // State untuk menampung animasi live pergerakan Pie Chart
  const [animatedChartPercent, setAnimatedChartPercent] = useState(0);

  useEffect(() => {
    // Animasikan Pie Chart dari 0 menuju ke persentase aslinya
    const controls = animate(0, persenMasuk, {
      duration: 1.8,
      ease: "easeInOut",
      onUpdate: (latest) => setAnimatedChartPercent(latest)
    });
    return controls.stop;
  }, [persenMasuk]);

  let statusText = "Kalori Seimbang";
  let statusColor = "text-gray-400 border-gray-600";
  if (isMinus) {
    statusText = "🔥 Defisit Kalori (Terbakar)";
    statusColor = "text-red-400 border-red-500/30 bg-red-500/10";
  } else if (selisihKalori > 0) {
    statusText = "📈 Surplus Kalori (Menyimpan)";
    statusColor = "text-green-400 border-green-500/30 bg-green-500/10";
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#111111] border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col items-center gap-8 w-full max-w-5xl mx-auto mt-6 shadow-xl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
        
        {/* Sisi Kiri: Status & Angka Selisih */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-1/2">
          <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${statusColor}`}>
            {statusText}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Selisih Nutrisi Hari Ini</h3>
            <div className={`text-4xl md:text-5xl font-black tracking-tight ${isMinus ? "text-red-400" : selisihKalori > 0 ? "text-green-400" : "text-white"}`}>
              {isMinus ? "" : "+"}{selisihKalori} <span className="text-xl font-normal text-gray-500">KKAL</span>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Grafik Donut Interaktif */}
        <div className="flex items-center justify-center gap-6 md:gap-10 w-full md:w-1/2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-black/60 px-4 py-2.5 rounded-xl border border-gray-800">
              <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <div>
                <div className="text-gray-500 text-[10px] uppercase tracking-wider">Kalori Masuk</div>
                <div className="text-white text-base md:text-lg font-bold">{displayPersenMasuk}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-black/60 px-4 py-2.5 rounded-xl border border-gray-800">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              <div>
                <div className="text-gray-500 text-[10px] uppercase tracking-wider">Kalori Keluar</div>
                <div className="text-white text-base md:text-lg font-bold">{displayPersenKeluar}%</div>
              </div>
            </div>
          </div>

          {/* Grafik Donut dengan Conic Gradient Teranimasi */}
          <div 
            className="w-32 h-32 md:w-44 md:h-44 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.6)] relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              background: total > 0 
                ? `conic-gradient(#10b981 0% ${animatedChartPercent}%, #ef4444 ${animatedChartPercent}% 100%)`
                : "#222"
            }}
          >
            {/* Lubang Tengah Donut */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#111111] rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Rasio</span>
              <span className="text-lg md:text-xl font-black text-white">
                {displayPersenMasuk}:{displayPersenKeluar}
              </span>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}