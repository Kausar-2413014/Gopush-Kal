"use client";

import { motion } from "framer-motion";

interface DailyRecommendationProps {
  targetMode: string;
  kaloriMasuk: number;
  kaloriKeluar: number;
  onSave: () => void;
}

// Komponen Pembantu Efek Mengetik Premium (Typewriter) per kata
function TypewriterText({ text }: { text: string }) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 } // Kecepatan ketikan antar kata
    }
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible">
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block mr-1">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function DailyRecommendation({ targetMode, kaloriMasuk, kaloriKeluar, onSave }: DailyRecommendationProps) {
  
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
          targetBesok: "Pertahankan defisit sekitar 300-500 kkal esok hari.",
        };
      } else {
        return {
          status: "⚠️ Kalori Surplus (Perlu Evaluasi)",
          pesan: "Asupan makan Anda hari ini melebihi kalori yang terbakar. Kurangi porsi besok.",
          makanan: "Perbanyak sayur kaya serat dan kurangi konsumsi makanan berminyak atau manis.",
          olahraga: "Tambah intensitas kardio (Running / HIIT) selama 45 menit untuk membakar sisa surplus.",
          targetBesok: "Targetkan defisit kalori ketat esok hari.",
        };
      }
    }

    // Default Fallback jika mode lain dipilih
    return {
      status: "⚖️ Mode Pemeliharaan Berjalan",
      pesan: "Pantau terus rasio asupan dan latihan Anda agar tubuh tetap seimbang.",
      makanan: "Konsumsi karbohidrat kompleks, lemak sehat, dan protein seimbang.",
      olahraga: "Lakukan olahraga fungsional atau yoga selama 30 menit.",
      targetBesok: "Pertahankan kestabilan kalori netral.",
    };
  };

  const recs = generateRecommendation();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto bg-[#111111] rounded-3xl border border-gray-800 p-6 md:p-8 mt-6 shadow-2xl"
    >
      <div className="border-b border-gray-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white flex flex-col md:flex-row md:items-center justify-between gap-2">
          <span>🎯 Rekomendasi & Evaluasi Harian</span>
          <span className="text-xs md:text-sm bg-yellow-400 text-black px-3 py-1 rounded-full font-mono font-bold uppercase">{targetMode}</span>
        </h3>
        
        {/* Kotak Konten Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 mt-6">
          <div>
            <p className="mb-4">
              <strong className="text-white">Status Hari Ini:</strong> <br/>
              <span className="text-yellow-400 font-semibold">{recs.status}</span>
            </p>
            <p className="mb-4">
              <strong className="text-white">Evaluasi:</strong> <br/>
              {/* Efek Mengetik di bagian Pesan Evaluasi */}
              <span className="text-sm italic text-gray-400">
                <TypewriterText key={recs.pesan} text={recs.pesan} />
              </span>
            </p>
            <p className="mb-4">
              <strong className="text-yellow-400">Target Besok:</strong> <br/>
              <span className="text-sm">{recs.targetBesok}</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-black/40 p-4 rounded-xl border border-gray-800">
              <strong className="text-green-400 flex items-center gap-2 mb-1">🥗 Rekomendasi Makanan</strong>
              <p className="text-sm text-gray-300">
                <TypewriterText key={recs.makanan} text={recs.makanan} />
              </p>
            </div>
            
            <div className="bg-black/40 p-4 rounded-xl border border-gray-800">
              <strong className="text-red-400 flex items-center gap-2 mb-1">🏃‍♂️ Rekomendasi Olahraga</strong>
              <p className="text-sm text-gray-300">
                <TypewriterText key={recs.olahraga} text={recs.olahraga} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="mt-8 flex justify-end">
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSave}
          className="w-full md:w-auto bg-linear-to-r from-yellow-400 to-amber-500 text-black font-black px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:from-yellow-500 hover:to-amber-600 transition-all uppercase tracking-wider text-sm"
        >
          Simpan Log Hari Ini & Lanjut Esok ➡️
        </motion.button>
      </div>
    </motion.div>
  );
}