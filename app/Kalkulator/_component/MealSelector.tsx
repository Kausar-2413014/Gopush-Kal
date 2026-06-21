"use client";

import { motion } from "framer-motion";

interface MealSelectorProps {
  onSelect: (count: number) => void;
}

export default function MealSelector({ onSelect }: MealSelectorProps) {
  const options = [1, 2, 3, 4, 5];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-8 bg-[#111111] border-[3px] border-yellow-400 rounded-3xl w-full max-w-2xl mx-auto shadow-[0_0_15px_rgba(255,215,0,0.1)]"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Berapa kali Anda makan hari ini?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            onClick={() => onSelect(num)}
            className="bg-black border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold text-xl w-16 h-16 rounded-full transition-colors flex items-center justify-center shadow-lg"
          >
            {num}x
          </motion.button>
        ))}
      </div>
      <p className="text-gray-500 mt-6 text-sm text-center">Pilih frekuensi makan untuk memunculkan kotak input makanan.</p>
    </motion.div>
  );
}