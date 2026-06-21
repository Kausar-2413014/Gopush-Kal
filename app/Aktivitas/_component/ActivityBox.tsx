"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const activityDB = [
  { name: "Lari / Jogging", calPerMin: 10, calPerKm: 65 },
  { name: "Bersepeda", calPerMin: 8, calPerKm: 30 },
  { name: "Berenang", calPerMin: 11, calPerKm: 0 }, 
  { name: "Jalan Santai", calPerMin: 4, calPerKm: 50 },
  { name: "Angkat Beban", calPerMin: 6, calPerKm: 0 },
  { name: "Senam / Aerobik", calPerMin: 7, calPerKm: 0 },
  { name: "Lompat Tali", calPerMin: 12, calPerKm: 0 },
  { name: "Yoga", calPerMin: 3, calPerKm: 0 },
  { name: "Futsal / Sepak Bola", calPerMin: 9, calPerKm: 0 },
];

interface ActivityItem {
  name: string;
  duration: number | null;
  distance: number | null;
  totalCalories: number;
}

interface ActivityBoxProps {
  label: string;
  onUpdateTotal: (calories: number) => void;
  index: number; // Tambahan prop index untuk efek staggered loading
}

export default function ActivityBox({ label, onUpdateTotal, index }: ActivityBoxProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [distance, setDistance] = useState<number | "">("");

  const handleAddActivity = () => {
    if (!selectedActivity) {
      alert("Silakan pilih jenis olahraga terlebih dahulu!");
      return;
    }
    if (!duration && !distance) {
      alert("Silakan isi Durasi (Menit) atau Jarak (KM)!");
      return;
    }

    const matched = activityDB.find(a => a.name === selectedActivity);
    if (!matched) return;

    let calFromMin = 0;
    let calFromKm = 0;

    if (duration && matched.calPerMin > 0) {
      calFromMin = Number(duration) * matched.calPerMin;
    }
    if (distance && matched.calPerKm > 0) {
      calFromKm = Number(distance) * matched.calPerKm;
    }

    const totalCal = calFromMin + calFromKm;

    const newItem: ActivityItem = {
      name: selectedActivity,
      duration: duration ? Number(duration) : null,
      distance: distance ? Number(distance) : null,
      totalCalories: totalCal
    };

    const updated = [...activities, newItem];
    setActivities(updated);

    const newBoxTotal = updated.reduce((sum, item) => sum + item.totalCalories, 0);
    onUpdateTotal(newBoxTotal);

    // Reset Form Input
    setSelectedActivity("");
    setDuration("");
    setDistance("");
  };

  // Fitur Baru: Menghapus item aktivitas untuk memicu animasi pengosongan
  const handleDeleteActivity = (itemIdx: number) => {
    const updated = activities.filter((_, idx) => idx !== itemIdx);
    setActivities(updated);

    const newBoxTotal = updated.reduce((sum, item) => sum + item.totalCalories, 0);
    onUpdateTotal(newBoxTotal);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }} // Efek meluncur bergantian
      className="bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-lg"
    >
      <h3 className="text-xl font-bold text-yellow-400 mb-4">{label}</h3>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end w-full">
        <div className="w-full md:w-2/5">
          <label className="text-gray-400 text-xs font-semibold mb-1 block uppercase">Pilih Olahraga</label>
          <select 
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
          >
            <option value="" disabled>-- Pilih Aktivitas --</option>
            {activityDB.map((act, i) => (
              <option key={i} value={act.name} className="text-white bg-black">
                {act.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4 flex items-center gap-2">
          <input 
            type="number" placeholder="Durasi" value={duration}
            onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : "")}
            className="w-full bg-black border border-gray-600 text-white px-3 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          <span className="text-gray-400 text-sm hidden md:block">Menit</span>
        </div>

        <div className="w-full md:w-1/4 flex items-center gap-2">
          <input 
            type="number" placeholder="Jarak" value={distance}
            onChange={(e) => setDistance(e.target.value ? Number(e.target.value) : "")}
            className="w-full bg-black border border-gray-600 text-white px-3 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          <span className="text-gray-400 text-sm hidden md:block">KM</span>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleAddActivity}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded transition-colors whitespace-nowrap"
        >
          + Tambah
        </motion.button>
      </div>

      {/* DAFTAR OLAHRAGA DENGAN ANIMASI TAMBAH DAN PENGOSONGAN */}
      <ul className="space-y-2 mt-6 overflow-hidden">
        <AnimatePresence>
          {activities.map((item, idx) => (
            <motion.li 
              key={`${item.name}-${idx}`}
              initial={{ opacity: 0, x: -30, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 30, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center bg-black/50 p-3 rounded border border-gray-800"
            >
              <div>
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs">
                  {item.duration ? `${item.duration} Menit` : ""}
                  {item.duration && item.distance ? " | " : ""}
                  {item.distance ? `${item.distance} KM` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-red-500 font-bold">{item.totalCalories} kkal</p>
                <button 
                  onClick={() => handleDeleteActivity(idx)}
                  className="text-red-500 hover:text-red-400 text-sm font-bold bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded transition-colors"
                >
                  ❌
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}