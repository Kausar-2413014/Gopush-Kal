"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ActionButtonsProps { user: any; onUpdate: () => void; }

export default function ActionButtons({ user, onUpdate }: ActionButtonsProps) {
  const router = useRouter();
  const [showModeSelection, setShowModeSelection] = useState(false);

  const handlePilihMetode = (metodeBaru: string) => {
    // 🔥 PESAN KONFIRMASI DIPERJELAS BAHWA RIWAYAT AKAN DIRESET
    if (window.confirm(`Ganti target program ke "${metodeBaru}"? Ini akan mereset total seluruh riwayat progres harian & statistik Anda.`)) {
      const users = JSON.parse(localStorage.getItem("gopushkal_users") || "[]");
      
      const updated = users.map((u: any) => 
        u.username === user.username 
          ? { 
              ...u, 
              targetKalori: metodeBaru, 
              currentDay: 1,
              history: [],        // 🔥 RESET RIWAYAT KALORI (KKM & KKL)
              weightHistory: [],  // 🔥 RESET RIWAYAT BERAT BADAN MILESTONE
            } 
          : u
      );
      
      localStorage.setItem("gopushkal_users", JSON.stringify(updated));
      localStorage.removeItem(`gopushkal_kkm_today_${user.username}`);
      localStorage.removeItem(`gopushkal_kkl_today_${user.username}`);
      setShowModeSelection(false);
      onUpdate();
    }
  };

  const handleHapusAkun = () => {
    if (window.confirm("HAPUS AKUN PERMANEN? Tindakan ini tidak bisa dibatalkan!")) {
      const users = JSON.parse(localStorage.getItem("gopushkal_users") || "[]");
      const filtered = users.filter((u: any) => u.username !== user.username);
      localStorage.setItem("gopushkal_users", JSON.stringify(filtered));
      localStorage.removeItem("gopushkal_currentUser");
      localStorage.removeItem(`gopushkal_kkm_today_${user.username}`);
      localStorage.removeItem(`gopushkal_kkl_today_${user.username}`);
      router.push("/Login");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <AnimatePresence mode="wait">
        {showModeSelection ? (
          <motion.div 
            key="selection" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-black/50 border border-gray-800 p-4 rounded-2xl flex flex-col gap-2 shadow-inner"
          >
            <p className="text-xs text-yellow-400 font-medium mb-1 text-center">Pilih Program Baru:</p>
            {['Fat Loss', 'Bulking', 'Maintenance'].map((mode) => (
              <button 
                key={mode} 
                onClick={() => handlePilihMetode(mode)} 
                className="bg-gray-900 hover:bg-yellow-400 hover:text-black text-white font-bold py-3 rounded-xl transition-all"
              >
                {mode}
              </button>
            ))}
            <button onClick={() => setShowModeSelection(false)} className="text-gray-500 text-sm mt-2">Batal</button>
          </motion.div>
        ) : (
          <motion.button 
            key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.1)" }}
            onClick={() => setShowModeSelection(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl tracking-wider uppercase transition-colors"
          >
            🔄 Ubah Metode Program
          </motion.button>
        )}
      </AnimatePresence>

      <div className="border-t border-gray-800/80 my-2"></div>

      <motion.button 
        whileHover={{ scale: 1.02, backgroundColor: "#ef4444" }}
        onClick={handleHapusAkun}
        className="w-full bg-red-600/20 border border-red-500/40 text-red-500 font-bold py-4 rounded-2xl tracking-wider uppercase transition-all"
      >
        ⚠️ Hapus Akun Gopushkal
      </motion.button>
    </div>
  );
}