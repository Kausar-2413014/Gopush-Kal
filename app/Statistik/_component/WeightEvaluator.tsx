"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconScale, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation"; 

interface WeightEvaluatorProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
  beratTarget: string;
  metode: "turun" | "naik" | "tetap"; // Tambahkan "tetap" untuk Maintenance
  onSaveWeight: (weight: number) => void;
}

export default function WeightEvaluator({ 
  isOpen, 
  onClose, 
  currentDay, 
  beratTarget, 
  metode, 
  onSaveWeight 
}: WeightEvaluatorProps) {
  const [inputWeight, setInputWeight] = useState("");
  const router = useRouter(); 

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!inputWeight) return alert("Masukkan berat badan Anda!");
    
    const beratSekarang = parseFloat(inputWeight);
    const targetBB = parseFloat(beratTarget);

    // Jalankan fungsi simpan log ke localStorage
    onSaveWeight(beratSekarang);

    // Logika Evaluasi Pencapaian Target sesuai Target Kalori (Fat loss, Bulking, Maintenance)
    let apakahTargetTercapai = false;

    if (metode === "turun") {
      // Fat loss: Berhasil jika BB sekarang <= BB target
      if (beratSekarang <= targetBB) apakahTargetTercapai = true;
    } else if (metode === "naik") {
      // Bulking: Berhasil jika BB sekarang >= BB target
      if (beratSekarang >= targetBB) apakahTargetTercapai = true;
    } else if (metode === "tetap") {
      // Maintenance: Berhasil hanya jika BB sekarang == BB target
      if (beratSekarang === targetBB) apakahTargetTercapai = true;
    }

    if (apakahTargetTercapai) {
      // Jika berhasil sesuai rules, arahkan ke halaman /Result
      router.push("/Result");
    } else {
      // Jika belum mencapai/melebihi target, tetap di halaman dan tutup modal
      alert(`Log disimpan! Target belum tercapai. Tetap semangat, target Anda adalah ${beratTarget} KG.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#111] border-2 border-yellow-400 rounded-3xl p-8 max-w-md w-full shadow-[0_0_40px_rgba(255,215,0,0.2)] relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <IconX />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconScale size={32} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-black text-white">Evaluasi Day {currentDay}!</h2>
          <p className="text-gray-400 text-sm mt-2">
            Anda telah mencapai milestone baru. Masukkan berat badan Anda saat ini untuk melihat apakah Anda sudah mencapai target <strong className="text-yellow-400">{beratTarget} KG</strong>.
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-xs text-gray-500 uppercase tracking-widest text-center">Berat Sekarang (KG)</label>
          <input 
            type="number" 
            value={inputWeight}
            onChange={(e) => setInputWeight(e.target.value)}
            placeholder="Misal: 65"
            className="w-full bg-black border border-gray-800 text-center text-3xl text-white px-4 py-4 rounded-2xl focus:outline-none focus:border-yellow-400 transition-colors font-black"
            autoFocus
          />
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl transition-colors uppercase tracking-widest text-sm"
        >
          Simpan & Cek Target
        </button>
      </motion.div>
    </div>
  );
}