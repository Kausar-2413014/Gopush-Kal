"use client";

import { useState, useEffect } from "react";

interface FoodItem {
  name: string;
  caloriesPer100g: number;
  grams: number;
  totalCalories: number;
}

interface MealBoxProps {
  label: string;
  onUpdateTotal: (calories: number) => void;
}

export default function MealBox({ label, onUpdateTotal }: MealBoxProps) {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [grams, setGrams] = useState<number | "">("");
  const [searchResults, setSearchResults] = useState<{name: string, cal: number}[]>([]);
  const [selectedFood, setSelectedFood] = useState<{name: string, cal: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- EFEK DEBOUNCE UNTUK PENCARIAN API/LOKAL ---
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
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data makanan:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedFood]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedFood(null);
  };

  const handleSelectFromDropdown = (food: {name: string, cal: number}) => {
    setSelectedFood(food);
    setSearchTerm(food.name);
    setSearchResults([]); 
  };

  const handleAddFood = () => {
    if (!selectedFood) {
      alert("Silakan pilih makanan/minuman dari daftar pencarian terlebih dahulu!");
      return;
    }
    if (!grams || grams <= 0) {
      alert("Masukkan jumlah gram terlebih dahulu!");
      return;
    }

    const calculatedCalories = Math.round((selectedFood.cal / 100) * Number(grams));
    
    const newFood = {
      name: selectedFood.name,
      caloriesPer100g: selectedFood.cal,
      grams: Number(grams),
      totalCalories: calculatedCalories
    };

    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    
    // Mengirim total kalori terbaru ke parent (Halaman Kalkulator)
    const boxTotal = updatedFoods.reduce((acc, curr) => acc + curr.totalCalories, 0);
    onUpdateTotal(boxTotal);

    // Reset input setelah berhasil ditambah
    setSearchTerm("");
    setSelectedFood(null);
    setGrams("");
  };

  // --- FITUR BARU: FUNGSI RESET KOTAK ---
  const handleResetBox = () => {
    if (foods.length === 0) return; // Abaikan jika kotak sudah kosong

    const confirmReset = window.confirm(`Yakin ingin mengosongkan semua makanan di menu ${label}?`);
    
    if (confirmReset) {
      setFoods([]); // Kosongkan daftar makanan di UI
      onUpdateTotal(0); // Beri tahu halaman utama bahwa kalori kotak ini sekarang 0
      
      // Bersihkan juga form input yang mungkin masih terisi
      setSearchTerm("");
      setSelectedFood(null);
      setGrams("");
    }
  };

  const boxTotalCalories = foods.reduce((acc, curr) => acc + curr.totalCalories, 0);

  return (
    <div className="bg-[#111111] border border-yellow-400/50 rounded-2xl p-6 w-full relative z-10">
      
      {/* HEADER KOTAK & TOMBOL RESET */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h3 className="text-xl font-bold text-yellow-400">{label}</h3>
        <div className="flex items-center gap-4">
          {foods.length > 0 && (
            <button 
              onClick={handleResetBox}
              className="text-xs text-red-400 border border-red-500/50 hover:bg-red-500/20 px-3 py-1.5 rounded transition-colors"
            >
              Kosongkan
            </button>
          )}
          <span className="text-green-400 font-bold">{boxTotalCalories} Kkal</span>
        </div>
      </div>

      {/* AREA PENCARIAN */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 relative">
        <div className="flex-grow: 1 relative">
          <input 
            type="text" 
            placeholder="Cari makanan/minuman (Cth: Nasi)..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          
          {isLoading && <div className="absolute right-3 top-3 text-xs text-yellow-400">Mencari...</div>}

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#151a24] border border-gray-700 rounded shadow-2xl z-99 max-h-48 overflow-y-auto">
              {searchResults.map((res, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleSelectFromDropdown(res)}
                  className="px-4 py-3 hover:bg-[#1e2532] cursor-pointer flex justify-between items-center border-b border-gray-800 last:border-0 transition-colors"
                >
                  <span className="text-white font-medium">{res.name}</span>
                  <span className="text-gray-400 text-xs">{res.cal} kcal/100g</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-32 flex items-center gap-2 relative z-0">
          <input 
            type="number" 
            placeholder="Berat" 
            value={grams}
            onChange={(e) => setGrams(e.target.value ? Number(e.target.value) : "")}
            className="w-full bg-black border border-gray-600 text-white px-3 py-2.5 rounded focus:outline-none focus:border-yellow-400"
          />
          <span className="text-gray-400 text-sm hidden md:block">g</span>
        </div>

        <button 
          onClick={handleAddFood}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded transition-colors whitespace-nowrap relative z-0"
        >
          + Tambah
        </button>
      </div>

      {/* DAFTAR MAKANAN YANG SUDAH DITAMBAHKAN */}
      {foods.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {foods.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center bg-black/50 p-3 rounded border border-gray-800">
              <div>
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs">{item.grams} gram</p>
              </div>
              <div className="text-green-400 font-bold text-sm">
                +{item.totalCalories} Kkal
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-sm italic text-center mt-6">Belum ada makanan ditambahkan.</p>
      )}
    </div>
  );
}