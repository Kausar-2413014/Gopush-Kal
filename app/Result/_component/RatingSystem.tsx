"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconStarFilled } from "@tabler/icons-react";

const playSound = (soundPath: string) => {
  if (typeof window !== "undefined") {
    const audio = new Audio(soundPath);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }
};

export default function RatingSystem() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      playSound("/sounds/click.mp3");
      return alert("Pilih rating terlebih dahulu!");
    }
    playSound("/sounds/success.mp3");
    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-linear-to-b from-[#111] to-[#050505] border border-gray-800 hover:border-yellow-400/30 transition-colors duration-500 rounded-3xl p-8 w-full max-w-2xl text-center shadow-2xl relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-400/5 blur-[80px] pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div 
            key="rating-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="relative z-10"
          >
            <h2 className="text-2xl font-black text-white mb-2 tracking-wide">BANTU KAMI <span className="text-yellow-400">BERKEMBANG</span></h2>
            <p className="text-sm text-gray-400 mb-8 font-medium">Seberapa puas Anda dengan aplikasi GOPUSHKAL?</p>
            
            <div className="flex justify-center gap-3 mb-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                  whileTap={{ scale: 0.8 }}
                  onMouseEnter={() => {
                    setHover(star);
                    playSound("/sounds/star.mp3");
                  }}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => {
                    setRating(star);
                    playSound("/sounds/click.mp3");
                  }}
                  className="focus:outline-none"
                >
                  <IconStarFilled 
                    size={54} 
                    className={`transition-all duration-300 ${
                      star <= (hover || rating) 
                      ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] scale-110" 
                      : "text-gray-800 hover:text-gray-600"
                    }`} 
                  />
                </motion.button>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(250,204,21,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-colors border border-white/10 hover:border-yellow-400/50"
            >
              Kirim Penilaian
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="rating-success"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="py-10 relative z-10"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-yellow-400 mb-6 flex justify-center"
            >
              <IconStarFilled size={80} className="drop-shadow-[0_0_30px_rgba(250,204,21,1)]" />
            </motion.div>
            <h2 className="text-3xl font-black text-white mb-3 tracking-wider uppercase">Terima Kasih!</h2>
            <p className="text-gray-400 font-medium">Penilaian Anda adalah energi bagi kami untuk terus berinovasi.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}