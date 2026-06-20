"use client";

interface Props {
  kaloriMasuk: number;
  kaloriKeluar: number;
}

export default function CalorieComparison({ kaloriMasuk, kaloriKeluar }: Props) {
  // Hitung selisih kalori
  const selisihKalori = kaloriMasuk - kaloriKeluar;
  const isMinus = selisihKalori < 0;
  
  // Hitung persentase untuk Grafik & Teks
  const total = kaloriMasuk + kaloriKeluar;
  const persenMasuk = total > 0 ? (kaloriMasuk / total) * 100 : 0;
  
  // Persentase bulat untuk teks legend agar rapi (misal: 25%)
  const displayPersenMasuk = total > 0 ? Math.round(persenMasuk) : 0;
  const displayPersenKeluar = total > 0 ? 100 - displayPersenMasuk : 0; // 100 - porsi masuk agar selalu genap 100%

  // Teks status berdasarkan kalkulasi
  let statusText = "Kalori Seimbang";
  let statusColor = "text-gray-400 border-gray-600";
  if (isMinus) {
    statusText = "🔥 Defisit Kalori (Terbakar)";
    statusColor = "text-red-400 border-red-500/30 bg-red-500/10";
  } else if (selisihKalori > 0) {
    statusText = "⚡ Surplus Kalori (Tersimpan)";
    statusColor = "text-green-400 border-green-500/30 bg-green-500/10";
  }

  return (
    <div className="w-full flex justify-center mt-4 mb-8">
      <div className="bg-[#0a0a0a] border-[3px] border-yellow-400 rounded-3xl p-6 md:p-10 w-full flex flex-col md:flex-row items-center justify-between shadow-[0_0_15px_rgba(255,215,0,0.15)] relative overflow-hidden">
        
        {/* Latar Belakang Cahaya Halus (Ambient Glow) */}
        <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[80px] opacity-20 ${isMinus ? 'bg-red-500' : 'bg-green-500'}`}></div>

        {/* BAGIAN KIRI: Informasi & Angka Detail */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 z-10">
          <span className="text-gray-400 font-semibold tracking-widest text-xs md:text-sm mb-2">
            TOTAL NET KALORI
          </span>
          
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl md:text-8xl font-black tracking-tighter drop-shadow-xl ${isMinus ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-green-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]'}`}>
              {isMinus ? '' : '+'}{selisihKalori}
            </span>
            <span className={`text-2xl md:text-3xl font-bold ${isMinus ? 'text-red-500/80' : 'text-green-500/80'}`}>
              KKAL
            </span>
          </div>

          {/* Badge Status */}
          <div className={`mt-4 px-5 py-2 rounded-full border text-sm md:text-base font-semibold tracking-wide ${statusColor}`}>
            {statusText}
          </div>
        </div>

        {/* BAGIAN KANAN: Legend & Donut Chart */}
        <div className="flex items-center gap-6 md:gap-12 z-10">
          
          {/* Legend (Tampilan Persentase) */}
          <div className="flex flex-col gap-4 text-sm font-medium">
            <div className="flex items-center gap-4 bg-black/60 px-4 py-2.5 rounded-xl border border-gray-800 shadow-md">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Kalori Masuk</div>
                <div className="text-white text-base md:text-lg font-bold">{displayPersenMasuk}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-black/60 px-4 py-2.5 rounded-xl border border-gray-800 shadow-md">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              <div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Kalori Keluar</div>
                <div className="text-white text-base md:text-lg font-bold">{displayPersenKeluar}%</div>
              </div>
            </div>
          </div>

          {/* Grafik Donut */}
          <div 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] relative flex items-center justify-center"
            style={{
              background: total > 0 
                ? `conic-gradient(#10b981 0% ${persenMasuk}%, #ef4444 ${persenMasuk}% 100%)`
                : `conic-gradient(#374151 0% 100%)`
            }}
          >
            {/* Lingkaran hitam di tengah agar menjadi Donut Chart */}
            <div className="w-16 h-16 md:w-24 md:h-24 bg-[#0a0a0a] rounded-full border border-gray-800 shadow-inner"></div>
          </div>

        </div>

      </div>
    </div>
  );
}