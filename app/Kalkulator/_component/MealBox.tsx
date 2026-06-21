"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FoodItem {
  name: string;
  caloriesPer100g: number;
  grams: number;
  totalCalories: number;
}

interface MealBoxProps {
  label: string;
  onUpdateTotal: (calories: number) => void;
  index: number; // Tambahan prop index untuk efek delay staggered
}

export default function MealBox({ label, onUpdateTotal, index }: MealBoxProps) {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [grams, setGrams] = useState<number | "">("");
  const [searchResults, setSearchResults] = useState<{name: string, cal: number}[]>([]);
  const [selectedFood, setSelectedFood] = useState<{name: string, cal: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Efek Debounce untuk pencarian API (tetap sama seperti kode Anda)
  useEffect(() => {
    if (selectedFood) return;
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/food?search=${searchTerm}`);
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          setSearchResults([{ name: "Dada Ayam Bakar", cal: 165 }, { name: "Nasi Putih", cal: 130 }]);
        }
      } catch (error) {
        setSearchResults([{ name: "Dada Ayam Bakar", cal: 165 }, { name: "Nasi Putih", cal: 130 }]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedFood]);

  const handleSelectResult = (food: {name: string, cal: number}) => {
    setSelectedFood(food);
    setSearchTerm(food.name);
    setSearchResults([]);
  };

  const handleAddFood = () => {
    if (!selectedFood || !grams) {
      alert("Pilih makanan dari hasil pencarian dan masukkan berat (gram)!");
      return;
    }

    const totalCal = Math.round((selectedFood.cal / 100) * Number(grams));
    
    const newFood: FoodItem = {
      name: selectedFood.name,
      caloriesPer100g: selectedFood.cal,
      grams: Number(grams),
      totalCalories: totalCal
    };

    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    
    const newBoxTotal = updatedFoods.reduce((sum, item) => sum + item.totalCalories, 0);
    onUpdateTotal(newBoxTotal);

    setSearchTerm("");
    setGrams("");
    setSelectedFood(null);
  };

  // FITUR BARU: Menghapus makanan untuk memicu efek pengosongan
  const handleDeleteFood = (foodIndex: number) => {
    const updatedFoods = foods.filter((_, idx) => idx !== foodIndex);
    setFoods(updatedFoods);
    
    const newBoxTotal = updatedFoods.reduce((sum, item) => sum + item.totalCalories, 0);
    onUpdateTotal(newBoxTotal);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }} // Delay bertahap antar kotak
      className="bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-lg relative"
    >
      <h3 className="text-xl font-bold text-yellow-400 mb-4">{label}</h3>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end w-full relative">
        <div className="w-full md:w-2/3 relative">
          <label className="text-gray-400 text-xs font-semibold mb-1 block uppercase">Cari Makanan</label>
          <input 
            type="text" 
            placeholder="Cth: Dada Ayam, Nasi Putih..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedFood(null);
            }}
            className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded focus:outline-none focus:border-yellow-400 transition-colors"
          />
          {isLoading && <p className="text-xs text-yellow-400 absolute top-full left-0 mt-1">Mencari...</p>}
          
          <AnimatePresence>
            {searchResults.length > 0 && !selectedFood && (
              <motion.ul 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-2xl max-h-40 overflow-y-auto"
              >
                {searchResults.map((res, i) => (
                  <li 
                    key={i} 
                    onClick={() => handleSelectResult(res)}
                    className="px-4 py-2 hover:bg-gray-800 text-white text-sm cursor-pointer border-b border-gray-800 last:border-0"
                  >
                    {res.name} <span className="text-gray-500 text-xs">({res.cal} kkal/100g)</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/4 flex items-center gap-2">
          <input 
            type="number" placeholder="Berat" value={grams}
            onChange={(e) => setGrams(e.target.value ? Number(e.target.value) : "")}
            className="w-full bg-black border border-gray-600 text-white px-3 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          <span className="text-gray-400 text-sm hidden md:block">g</span>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleAddFood}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded transition-colors whitespace-nowrap"
        >
          + Tambah
        </motion.button>
      </div>

      {/* DAFTAR MAKANAN DENGAN ANIMASI TAMBAH DAN PENGOSONGAN */}
      <ul className="space-y-2 mt-6 overflow-hidden">
        <AnimatePresence>
          {foods.map((item, idx) => (
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
                <p className="text-gray-500 text-xs">{item.grams} gram</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-yellow-400 font-bold">{item.totalCalories} kkal</p>
                <button 
                  onClick={() => handleDeleteFood(idx)}
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