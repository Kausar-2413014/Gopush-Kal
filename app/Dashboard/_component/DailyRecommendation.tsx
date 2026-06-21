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
    // Jika belum ada input kalori sama sekali
    if (kaloriMasuk === 0 && kaloriKeluar === 0) {
      return {
        status: "Belum Ada Data",
        pesan: "Silakan input Kalori Masuk (KKM) dan Kalori Keluar (KKL) Anda hari ini.",
        makanan: "-",
        olahraga: "-",
        targetBesok: "Sesuai kebutuhan kalori harian (BMR/TDEE) Anda.",
      };
    }

    const selisih = kaloriMasuk - kaloriKeluar;
    // Normalisasi string agar tidak sensitif terhadap huruf besar/kecil (contoh: "BULKING" menjadi "bulking")
    const modeNormalized = targetMode ? targetMode.trim().toLowerCase() : "";

    // ==========================================
    // 1. KONDISI UNTUK METODE: FAT LOSS
    // ==========================================
    if (modeNormalized === "fat loss") {
      if (selisih < 0) {
        return {
          status: "🔥 Defisit Kalori Tercapai (Bagus!)",
          pesan: "Kerja bagus! Anda berhasil membakar lebih banyak kalori daripada yang masuk. Program Fat Loss Anda berjalan optimal.",
          makanan: "Pertahankan asupan tinggi protein (dada ayam, telur, tempe) agar massa otot tidak menyusut, serta perbanyak serat dari sayuran.",
          olahraga: "Lakukan latihan beban (Weight Training) sekitar 30-45 menit untuk mempertahankan otot, lalu kombinasikan dengan kardio ringan (jalan cepat/sepeda).",
          targetBesok: "Pertahankan konsistensi defisit kalori di kisaran 300-500 kkal esok hari.",
        };
      } else {
        return {
          status: "⚠️ Kalori Surplus (Perlu Evaluasi)",
          pesan: "Asupan kalori Anda hari ini melebihi kalori yang terbakar. Untuk menyukseskan Fat Loss, Anda memerlukan defisit kalori.",
          makanan: "Perbanyak sayuran kaya serat, kurangi porsi karbohidrat simpleks, serta hindari makanan berminyak atau terlalu manis.",
          olahraga: "Tingkatkan intensitas kardio esok hari (Running, Bersepeda, atau HIIT) selama 45 menit untuk membantu membakar sisa surplus energi.",
          targetBesok: "Targetkan defisit kalori yang lebih disiplin dan ketat esok hari.",
        };
      }
    }

    // ==========================================
    // 2. KONDISI UNTUK METODE: BULKING
    // ==========================================
    if (modeNormalized === "bulking") {
      if (selisih > 0) {
        return {
          status: "💪 Surplus Kalori Tercapai (Mantap!)",
          pesan: "Luar biasa! Target surplus kalori berhasil dicapai. Tubuh Anda memiliki surplus energi yang ideal untuk membangun jaringan otot baru.",
          makanan: "Utamakan sumber Clean Bulking: karbohidrat kompleks (nasi, kentang, oat), protein berkualitas tinggi, serta lemak sehat (alpukat, kacang-kacangan).",
          olahraga: "Fokus pada latihan beban intensif (Hypertrophy / Strength Training) dengan prinsip progressive overload untuk merangsang sintesis otot.",
          targetBesok: "Pertahankan surplus kalori bersih secara konsisten sekitar 200-400 kkal esok hari.",
        };
      } else {
        return {
          status: "⚠️ Kalori Defisit/Netral (Asupan Kurang)",
          pesan: "Hari ini kalori Anda defisit atau netral. Untuk program Bulking, Anda membutuhkan surplus kalori agar otot dapat berkembang dengan optimal.",
          makanan: "Tingkatkan porsi makan utama Anda atau tambahkan camilan padat kalori sehat seperti buah pisang dengan selai kacang atau susu protein.",
          olahraga: "Tetap lakukan latihan beban dengan intensitas tinggi, namun batasi durasi kardio agar tidak membakar terlalu banyak kalori bulking Anda.",
          targetBesok: "Naikkan asupan makanan padat nutrisi agar target surplus kalori tercapai esok hari.",
        };
      }
    }

    // ==========================================
    // 3. KONDISI UNTUK METODE: MAINTENANCE (DEFAULT)
    // ==========================================
    if (Math.abs(selisih) <= 200) {
      return {
        status: "⚖️ Keseimbangan Kalori Terjaga",
        pesan: "Sangat baik! Anda berhasil menjaga keseimbangan energi. Kalori masuk sebanding dengan kalori keluar untuk mempertahankan berat badan saat ini.",
        makanan: "Konsumsi makanan dengan komposisi gizi seimbang (gizi makro dan mikro lengkap) untuk mendukung stabilitas metabolisme.",
        olahraga: "Lakukan aktivitas fisik fungsional, yoga, atau latihan kebugaran umum selama 30-45 menit untuk menjaga stamina tubuh.",
        targetBesok: "Pertahankan stabilitas kalori netral dan konsistensi latihan esok hari.",
      };
    } else if (selisih > 200) {
      return {
        status: "⚠️ Sedikit Surplus Kalori",
        pesan: "Hari ini kalori masuk sedikit melebihi batas maintenance Anda. Kurangi sedikit asupan esok hari agar berat badan tetap stabil.",
        makanan: "Batasi camilan manis atau porsi karbohidrat berlebih pada menu makan berikutnya.",
        olahraga: "Tambahkan jalan santai atau aktivitas fisik tambahan berdurasi pendek hari ini untuk menyeimbangkan surplus.",
        targetBesok: "Kembalikan asupan makanan ke porsi normal kalori harian (TDEE) Anda.",
      };
    } else {
      return {
        status: "⚠️ Sedikit Defisit Kalori",
        pesan: "Pengeluaran kalori Anda sedikit lebih besar daripada asupannya. Tingkatkan sedikit asupan esok hari untuk mempertahankan berat badan.",
        makanan: "Tambahkan porsi kecil makanan padat nutrisi atau konsumsi camilan sehat di antara jam makan.",
        olahraga: "Latihan Anda hari ini sangat baik, pastikan energi yang masuk sepadan untuk pemulihan energi tubuh.",
        targetBesok: "Tingkatkan porsi makan secara berkala agar mencapai status kalori netral.",
      };
    }
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