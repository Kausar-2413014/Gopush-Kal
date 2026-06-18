"use client";

import { useState } from "react";

// Simulasi Database Olahraga
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
}

export default function ActivityBox({ label, onUpdateTotal }: ActivityBoxProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [distance, setDistance] = useState<number | "">("");
  
  const [searchResults, setSearchResults] = useState<typeof activityDB>([]);
  const [selectedActivity, setSelectedActivity] = useState<typeof activityDB[0] | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    setSelectedActivity(null);

    if (query.length > 0) {
      const results = activityDB.filter(act => act.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectFromDropdown = (act: typeof activityDB[0]) => {
    setSelectedActivity(act);
    setSearchTerm(act.name);
    setSearchResults([]); 
  };

  const handleAddActivity = () => {
    if (!selectedActivity) {
      alert("Pilih jenis olahraga dari daftar pencarian terlebih dahulu!");
      return;
    }
    if (!duration && !distance) {
      alert("Masukkan Durasi (Menit) atau Jarak (KM) terlebih dahulu!");
      return;
    }

    let calculatedCalories = 0;
    
    // Logika Perhitungan (Prioritaskan Durasi jika keduanya diisi)
    if (duration) {
      calculatedCalories = Math.round(selectedActivity.calPerMin * Number(duration));
    } else if (distance) {
      calculatedCalories = Math.round(selectedActivity.calPerKm * Number(distance));
    }

    if (calculatedCalories === 0 && distance && selectedActivity.calPerKm === 0) {
        alert("Olahraga ini tidak bisa dihitung dengan jarak. Silakan masukkan Durasi (Menit).");
        return;
    }

    const newActivity: ActivityItem = {
      name: selectedActivity.name,
      duration: duration ? Number(duration) : null,
      distance: distance ? Number(distance) : null,
      totalCalories: calculatedCalories
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    
    const boxTotal = updatedActivities.reduce((acc, curr) => acc + curr.totalCalories, 0);
    onUpdateTotal(boxTotal);

    setSearchTerm("");
    setSelectedActivity(null);
    setDuration("");
    setDistance("");
  };

  const handleResetBox = () => {
    if (activities.length === 0) return;
    const confirmReset = window.confirm(`Yakin ingin mengosongkan semua data di ${label}?`);
    if (confirmReset) {
      setActivities([]);
      onUpdateTotal(0);
      setSearchTerm("");
      setSelectedActivity(null);
      setDuration("");
      setDistance("");
    }
  };

  const boxTotalCalories = activities.reduce((acc, curr) => acc + curr.totalCalories, 0);

  return (
    <div className="bg-[#111111] border border-yellow-400/50 rounded-2xl p-6 w-full relative z-10">
      
      {/* HEADER & TOMBOL KOSONGKAN */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h3 className="text-xl font-bold text-yellow-400">{label}</h3>
        <div className="flex items-center gap-4">
          {activities.length > 0 && (
            <button 
              onClick={handleResetBox}
              className="text-xs text-red-400 border border-red-500/50 hover:bg-red-500/20 px-3 py-1.5 rounded transition-colors"
            >
              Kosongkan
            </button>
          )}
          <span className="text-red-500 font-bold">{boxTotalCalories} Kkal</span>
        </div>
      </div>

      {/* AREA PENCARIAN & INPUT (MIRIP KKM) */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 relative">
        <div className="flex-grow: 1 relative">
          <input 
            type="text" 
            placeholder="Cari olahraga (Cth: Lari)..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#151a24] border border-gray-700 rounded shadow-2xl z-99 max-h-48 overflow-y-auto">
              {searchResults.map((res, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleSelectFromDropdown(res)}
                  className="px-4 py-3 hover:bg-[#1e2532] cursor-pointer flex justify-between items-center border-b border-gray-800 last:border-0 transition-colors"
                >
                  <span className="text-white font-medium">{res.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-24 flex items-center gap-2 relative z-0">
          <input 
            type="number" 
            placeholder="Waktu" 
            value={duration}
            onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : "")}
            className="w-full bg-black border border-gray-600 text-white px-3 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          <span className="text-gray-400 text-sm hidden md:block">Mnt</span>
        </div>
        
        <span className="text-gray-600 flex items-center justify-center font-bold md:flex">/</span>

        <div className="w-full md:w-24 flex items-center gap-2 relative z-0">
          <input 
            type="number" 
            placeholder="Jarak" 
            value={distance}
            onChange={(e) => setDistance(e.target.value ? Number(e.target.value) : "")}
            className="w-full bg-black border border-gray-600 text-white px-3 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          <span className="text-gray-400 text-sm hidden md:block">KM</span>
        </div>

        <button 
          onClick={handleAddActivity}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded transition-colors whitespace-nowrap relative z-0"
        >
          + Tambah
        </button>
      </div>

      {/* DAFTAR OLAHRAGA YANG DITAMBAHKAN */}
      {activities.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {activities.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center bg-black/50 p-3 rounded border border-gray-800">
              <div>
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs">
                  {item.duration ? `${item.duration} Menit` : ""}
                  {item.duration && item.distance ? " | " : ""}
                  {item.distance ? `${item.distance} KM` : ""}
                </p>
              </div>
              <div className="text-red-500 font-bold text-sm">
                +{item.totalCalories} Kkal
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-sm italic text-center mt-6">Belum ada aktivitas ditambahkan.</p>
      )}
    </div>
  );
}