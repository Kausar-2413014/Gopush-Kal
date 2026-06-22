"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconStarFilled } from "@tabler/icons-react";

export default function RatingSystem() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return alert("Pilih rating terlebih dahulu!");
    setSubmitted(true);
    // Di sini Anda bisa menembak API/Backend untuk menyimpan rating
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 w-full max-w-2xl text-center shadow-2xl relative overflow-hidden"
    >
      {!submitted ? (
        <>
          <h2 className="text-xl font-bold text-white mb-2">Bantu Kami Berkembang</h2>
          <p className="text-sm text-gray-500 mb-6">Seberapa puas Anda dengan aplikasi GOPUSHKAL dalam menemani perjalanan Anda?</p>
          
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <IconStarFilled 
                  size={48} 
                  className={`transition-colors duration-200 ${
                    star <= (hover || rating) ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "text-gray-800"
                  }`} 
                />
              </motion.button>
            ))}
          </div>

          <button 
            onClick={handleSubmit}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-colors border border-white/10"
          >
            Kirim Penilaian
          </button>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-10"
        >
          <div className="text-yellow-400 mb-4 flex justify-center">
            <IconStarFilled size={60} className="drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Terima Kasih!</h2>
          <p className="text-gray-400">Penilaian Anda sangat berarti untuk pengembangan kami ke depannya.</p>
        </motion.div>
      )}
    </motion.div>
  );
}