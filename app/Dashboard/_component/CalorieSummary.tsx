"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CalorieSummaryProps {
  kaloriMasuk: number;
  kaloriKeluar: number;
  day: number;
}

// Komponen Pembantu untuk Animasi Angka Berjalan dari 0
function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function CalorieSummary({ kaloriMasuk, kaloriKeluar, day }: CalorieSummaryProps) {
  return (
    // CLASS overflow-hidden SUDAH DIHAPUS DARI BARIS DI BAWAH INI
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-10 w-full max-w-5xl mx-auto pt-6">
      
      {/* Kotak Kalori Masuk - Animasi Masuk dari Kiri */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative border-[3px] border-yellow-400 rounded-3xl p-8 w-full md:w-1/3 flex flex-col items-center justify-center min-h-160px shadow-[0_0_15px_rgba(255,215,0,0.1)]"
      >
        <div className="absolute -top-6 bg-black border-[3px] border-yellow-400 rounded-full px-6 py-2 whitespace-nowrap">
          <h2 className="text-yellow-400 font-bold text-xl">Kalori Masuk</h2>
        </div>
        <div className="flex items-end gap-2 mt-4 text-green-500 font-bold text-4xl">
          {kaloriMasuk > 0 ? <AnimatedCounter value={kaloriMasuk} /> : <span>- - - -</span>}
          <span className="text-xl pb-1">KKAL</span>
        </div>
      </motion.div>

      {/* Pill Day - Animasi Muncul Membesar (Scale) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        className="bg-yellow-400 text-black font-bold text-2xl px-10 py-4 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.3)] z-10"
      >
        Day : {day}
      </motion.div>

      {/* Kotak Kalori Keluar - Animasi Masuk dari Kanan */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative border-[3px] border-yellow-400 rounded-3xl p-8 w-full md:w-1/3 flex flex-col items-center justify-center min-h-[160px shadow-[0_0_15px_rgba(255,215,0,0.1)]"
      >
        <div className="absolute -top-6 bg-black border-[3px] border-yellow-400 rounded-full px-6 py-2 whitespace-nowrap">
          <h2 className="text-yellow-400 font-bold text-xl">Kalori Keluar</h2>
        </div>
        <div className="flex items-end gap-2 mt-4 text-red-500 font-bold text-4xl">
          {kaloriKeluar > 0 ? <AnimatedCounter value={kaloriKeluar} /> : <span>- - - -</span>}
          <span className="text-xl pb-1">KKAL</span>
        </div>
      </motion.div>
    </div>
  );
}