    "use client";

interface DailyRecommendationProps {
  targetMode: string;
  kaloriMasuk: number;
  kaloriKeluar: number;
  onSave: () => void;
}

export default function DailyRecommendation({ targetMode, kaloriMasuk, kaloriKeluar, onSave }: DailyRecommendationProps) {
  // --- LOGIKA REKOMENDASI OTOMATIS ---
  const generateRecommendation = () => {
    if (kaloriMasuk === 0 && kaloriKeluar === 0) {
      return {
        status: "Belum Ada Data",
        pesan: "Silakan input Kalori Masuk (KKM) dan Kalori Keluar (KKL) Anda hari ini.",
        makanan: "-",
        olahraga: "-",
        targetBesok: "Sesuai kebutuhan BMR Anda.",
      };
    }

    const selisih = kaloriMasuk - kaloriKeluar;

    if (targetMode === "Fat Loss") {
      if (selisih < 0) {
        return {
          status: "🔥 Defisit Kalori Tercapai (Bagus!)",
          pesan: "Kerja bagus! Anda membakar lebih banyak kalori daripada yang masuk.",
          makanan: "Pertahankan asupan tinggi protein (Dada ayam, tempe) agar massa otot tidak turun.",
          olahraga: "Lakukan Latihan Beban 30 menit, dilanjut Kardio ringan (jalan cepat).",
          targetBesok: "Pertahankan defisit sekitar 300-500 Kkal.",
        };
      } else {
        return {
          status: "⚠️ Surplus Kalori (Perhatian)",
          pesan: "Kalori masuk lebih besar dari kalori keluar. Ini memperlambat fat loss.",
          makanan: "Kurangi karbohidrat sederhana (gula, tepung). Perbanyak sayuran hijau.",
          olahraga: "Tambah durasi Kardio (Lari / Bersepeda) selama 45 menit besok.",
          targetBesok: "Usahakan defisit kalori besok dengan memotong porsi makan 10%.",
        };
      }
    }

    if (targetMode === "Bulking") {
      if (selisih > 0) {
        return {
          status: "💪 Surplus Kalori Tercapai (Bagus!)",
          pesan: "Anda berada di jalur yang benar untuk menambah berat badan/otot.",
          makanan: "Tetap konsumsi karbohidrat kompleks (nasi, kentang, oat) dan protein tinggi.",
          olahraga: "Fokus pada latihan Hipertrofi (Angkat beban berat dengan repetisi 8-12).",
          targetBesok: "Pertahankan surplus 300-500 Kkal.",
        };
      } else {
        return {
          status: "⚠️ Defisit Kalori (Perlu Makan Lebih)",
          pesan: "Kalori yang terbakar terlalu banyak, sulit untuk membangun otot.",
          makanan: "Tambahkan selingan padat kalori sehat (Selai kacang, alpukat, susu protein).",
          olahraga: "Kurangi durasi kardio. Fokus angkat beban saja.",
          targetBesok: "Tingkatkan porsi karbohidrat dan protein di setiap jadwal makan.",
        };
      }
    }

    // Default Maintenance
    return {
      status: "⚖️ Mode Maintenance",
      pesan: Math.abs(selisih) <= 200 
        ? "Kalori sangat seimbang! Sempurna untuk mempertahankan berat badan."
        : "Ada sedikit ketidakseimbangan kalori hari ini.",
      makanan: "Makan dengan porsi seimbang (Isi Piringku: 50% Sayur, 25% Karbo, 25% Protein).",
      olahraga: "Kombinasi 20 menit kardio dan 20 menit latihan beban ringan.",
      targetBesok: "Jaga agar Kalori Masuk = Kalori Keluar.",
    };
  };

  const recs = generateRecommendation();

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 border-[3px] border-yellow-400 rounded-3xl p-6 md:p-8 bg-black/50 shadow-[0_0_20px_rgba(255,215,0,0.15)] flex flex-col justify-between min-h-300px">
      
      {/* Konten Rekomendasi */}
      <div>
        <h3 className="text-yellow-400 text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
          Hasil & Rekomendasi: <span className="text-white">{targetMode || "Belum Set Target"}</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <div>
            <p className="mb-2"><strong className="text-white">Status Hari Ini:</strong> <br/>{recs.status}</p>
            <p className="mb-2"><strong className="text-white">Evaluasi:</strong> <br/>{recs.pesan}</p>
            <p className="mb-2"><strong className="text-yellow-400">Target Besok:</strong> <br/>{recs.targetBesok}</p>
          </div>
          <div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 mb-4">
              <strong className="text-green-400 flex items-center gap-2 mb-1">🥗 Rekomendasi Makanan</strong>
              <p className="text-sm">{recs.makanan}</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <strong className="text-red-400 flex items-center gap-2 mb-1">🏃‍♂️ Rekomendasi Olahraga</strong>
              <p className="text-sm">{recs.olahraga}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="mt-8 flex justify-end">
        <button 
          onClick={onSave}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95"
        >
          Simpan ke Statistik
        </button>
      </div>
    </div>
  );
}