"use client";

import { useState } from "react";
import { IconUserCircle, IconEye, IconEyeOff, IconId, IconWeight, IconTarget } from "@tabler/icons-react";

interface ProfileCardProps {
  formData: any;
  setFormData: any;
  targetKalori: string;
}

export default function ProfileCard({ formData, setFormData, targetKalori }: ProfileCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="w-2 h-8 bg-yellow-400 rounded-full"></span> Informasi Akun & Fisik
      </h2>
      
      <div className="space-y-6">
        {/* INPUT NAMA LENGKAP */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <IconUserCircle size={16} className="text-yellow-400" /> Nama Lengkap
          </label>
          <input 
            type="text"
            name="namaLengkap"
            value={formData.namaLengkap}
            onChange={handleInputChange}
            className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors font-semibold"
          />
        </div>

        {/* INPUT USERNAME */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <IconId size={16} className="text-yellow-400" /> Username
          </label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors font-semibold"
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <IconTarget size={16} className="text-yellow-400" /> Password
          </label>
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors font-semibold pr-12"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors"
            >
              {showPassword ? <IconEyeOff size={22} /> : <IconEye size={22} />}
            </button>
          </div>
        </div>

        {/* INPUT BERAT BADAN (SEKARANG & TARGET) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <IconWeight size={16} className="text-green-400" /> Berat Sekarang (KG)
            </label>
            <input 
              type="number"
              name="beratSekarang"
              value={formData.beratSekarang || ""}
              onChange={handleInputChange}
              className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <IconWeight size={16} className="text-red-500" /> Berat Target (KG) <span className="text-[10px] text-red-400/80 lowercase">(reset progress)</span>
            </label>
            <input 
              type="number"
              name="beratTarget"
              value={formData.beratTarget || ""}
              onChange={handleInputChange}
              className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors font-semibold"
            />
          </div>
        </div>
        
        {/* Informasi Target Aktif */}
        <div className="p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl flex justify-between items-center mt-2">
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <IconTarget className="text-yellow-400" size={20} />
            <span>Metode Kebutuhan Kalori Aktif:</span>
          </div>
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-lg font-black text-xs uppercase">
            {targetKalori || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}