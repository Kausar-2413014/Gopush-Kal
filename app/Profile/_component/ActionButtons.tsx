"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ActionButtonsProps { user: any; onUpdate: () => void; }

export default function ActionButtons({ user, onUpdate }: ActionButtonsProps) {
  const router = useRouter();
  const [showModeSelection, setShowModeSelection] = useState(false);

  const handlePilihMetode = (metodeBaru: string) => {
    if (window.confirm(`Ganti target program ke "${metodeBaru}"? Ini akan mereset progress harian.`)) {
      const users = JSON.parse(localStorage.getItem("gopushkal_users") || "[]");
      const updated = users.map((u: any) => u.username === user.username ? { ...u, targetKalori: metodeBaru, currentDay: 1 } : u);
      localStorage.setItem("gopushkal_users", JSON.stringify(updated));
      localStorage.removeItem(`gopushkal_kkm_today_${user.username}`);
      localStorage.removeItem(`gopushkal_kkl_today_${user.username}`);
      setShowModeSelection(false);
      onUpdate();
    }
  };

  const handleHapusAkun = () => {
    if (window.confirm("HAPUS AKUN PERMANEN? Tindakan ini tidak bisa dibatalkan!")) {
      const users = JSON.parse(localStorage.getItem("gopushkal_users") || "[]").filter((u: any) => u.username !== user.username);
      localStorage.setItem("gopushkal_users", JSON.stringify(users));
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  return (
    <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-gray-800 shadow-2xl flex flex-col gap-6">
      <h3 className="text-xl font-bold text-white text-center uppercase tracking-widest border-b border-gray-800 pb-4">Metode Program</h3>
      
      <AnimatePresence mode="wait">
        {showModeSelection ? (
          <motion.div 
            key="selection" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col gap-2"
          >
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
        className="w-full bg-transparent border-2 border-red-600 text-red-600 hover:text-white font-black py-5 rounded-2xl tracking-wider transition-all uppercase"
      >
        🗑️ Hapus Akun Permanen
      </motion.button>
    </div>
  );
}