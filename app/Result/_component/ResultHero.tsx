"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IconTrophy, IconStar, IconConfetti, IconRefresh, IconArrowLeft } from "@tabler/icons-react";

export default function ResultHero() {
  const router = useRouter();

  const handleReset = () => {
    if (confirm("Apakah Anda yakin ingin mereset semua data perjalanan Anda? Statistik akan dihapus dan diulang kembali dari Day 1.")) {
      const activeUsername = localStorage.getItem("gopushkal_currentUser");
      const storedUsers = localStorage.getItem("gopushkal_users");

      if (activeUsername && storedUsers) {
        let users = JSON.parse(storedUsers);
        
        // Memetakan ulang data user untuk mereset riwayat & hari
        users = users.map((u: any) => {
          if (u.username === activeUsername) {
            return { 
              ...u, 
              currentDay: 1,         // Mengembalikan progres ke Day 1
              history: [],           // Mengosongkan riwayat grafik KKM & KKL
              weightHistory: [],     // Mengosongkan riwayat evaluasi berat badan
              beratSekarang: u.beratAwal || u.beratSekarang // Opsional: mengembalikan ke berat awal jika ada
            };
          }
          return u;
        });

        // Simpan kembali data yang sudah bersih ke localStorage
        localStorage.setItem("gopushkal_users", JSON.stringify(users));
        
        alert("Data perjalanan berhasil di-reset! Mari mulai lembaran baru dari Day 1.");
        router.push("/Dashboard"); // Menggunakan huruf kapital D
      } else {
        router.push("/Login");
      }
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center text-center mt-10">
      {/* Animasi Icon Melayang (Kiri & Kanan) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, -10, 5, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-10 left-10 md:left-32 text-yellow-400 opacity-80 hidden md:block"
      >
        <IconStar size={64} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -25, 0], rotate: [0, 15, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-10 md:right-32 text-yellow-500 opacity-80 hidden md:block"
      >
        <IconConfetti size={72} />
      </motion.div>

      {/* Konten Utama */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="bg-yellow-400/10 p-8 rounded-full mb-6 border border-yellow-400/30 shadow-[0_0_60px_rgba(250,204,21,0.2)]"
      >
        <IconTrophy size={80} className="text-yellow-400" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4"
      >
        TARGET <span className="text-yellow-400">TERCAPAI!</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 max-w-lg mb-10 text-lg"
      >
        Luar biasa! Konsistensi dan kerja keras Anda telah membuahkan hasil. Anda berhasil mencapai (atau bahkan melewati) target berat badan yang Anda tetapkan.
      </motion.p>

      {/* Tombol Aksi */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md"
      >
        <button 
          onClick={() => router.push("/Dashboard")} 
          className="flex items-center justify-center gap-2 bg-[#111] hover:bg-[#222] border-2 border-gray-800 hover:border-yellow-400 text-white font-bold py-4 px-6 rounded-xl transition-all"
        >
          <IconArrowLeft size={20} />
          Kembali Dashboard
        </button>
        <button 
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)]"
        >
          <IconRefresh size={20} />
          Mulai Perjalanan Baru
        </button>
      </motion.div>
    </div>
  );
}