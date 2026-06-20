"use client";

import { useState } from "react";
import { IconUserCircle, IconPencil, IconEye, IconEyeOff } from "@tabler/icons-react";

interface ProfileCardProps {
  user: any;
  onUpdate: () => void;
}

export default function ProfileCard({ user, onUpdate }: ProfileCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleEditBB = (jenis: "sekarang" | "target") => {
    const label = jenis === "sekarang" ? "Berat Badan Sekarang" : "Berat Badan Target";
    // UPDATE: Menyesuaikan dbKey dengan SignUpForm
    const dbKey = jenis === "sekarang" ? "beratSekarang" : "beratTarget";

    const nilaiBaru = window.prompt(`Masukkan ${label} (kg) baru:\n(Contoh: 65)`, user[dbKey] || "");

    if (nilaiBaru !== null && nilaiBaru.trim() !== "") {
      if (isNaN(Number(nilaiBaru))) {
        alert("Masukan harus berupa angka yang valid!");
        return;
      }

      const confirmReset = window.confirm(`PENTING: Mengubah ${label} akan mereset progress (Day dan Kalori) Anda kembali ke 0. Lanjutkan?`);

      if (confirmReset) {
        const storedUsers = localStorage.getItem("gopushkal_users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          
          const updatedUsers = users.map((u: any) => {
            if (u.username === user.username) {
              return { ...u, [dbKey]: Number(nilaiBaru), currentDay: 1 };
            }
            return u;
          });
          
          localStorage.setItem("gopushkal_users", JSON.stringify(updatedUsers));
          localStorage.removeItem(`gopushkal_kkm_today_${user.username}`);
          localStorage.removeItem(`gopushkal_kkl_today_${user.username}`);

          alert(`${label} berhasil diubah! Progress direset ke Day 1.`);
          onUpdate(); 
        }
      }
    }
  };

  const renderPassword = () => {
    if (!user.password) return "";
    return showPassword ? user.password : "•".repeat(user.password.length);
  };

  return (
    <div className="bg-[#111111] p-8 rounded-xl border border-yellow-400/30 shadow-[0_0_15px_rgba(255,215,0,0.1)] w-full mb-6 md:mb-0">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-gray-700 pb-3">Informasi Akun</h2>
      
      <div className="flex flex-col gap-5 text-lg">
        
        {/* NAMA LENGKAP */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <span className="text-gray-400">Nama Lengkap</span>
          <div className="flex items-center gap-2 text-white font-bold">
            <IconUserCircle size={28} className="text-yellow-400" />
            <span>{user.namaLengkap}</span>
          </div>
        </div>
        
        {/* USERNAME */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <span className="text-gray-400">Username</span>
          <span className="text-white font-semibold">{user.username}</span>
        </div>
        
        {/* PASSWORD DENGAN TOGGLE MATA */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <span className="text-gray-400">Password</span>
          <div className="flex items-center gap-3">
            <span className="text-white font-mono tracking-widest">{renderPassword()}</span>
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-yellow-400 transition-colors"
              title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
        </div>
        
        {/* BERAT BADAN SEKARANG */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <span className="text-gray-400">Berat Badan Sekarang</span>
          <div className="flex items-center gap-3">
            {/* UPDATE: Menggunakan user.beratSekarang */}
            <span className="text-white">{user.beratSekarang ? `${user.beratSekarang} kg` : "Belum diisi"}</span>
            <button 
              onClick={() => handleEditBB("sekarang")}
              className="text-gray-500 hover:text-yellow-400 transition-colors"
              title="Edit Berat Badan Sekarang"
            >
              <IconPencil size={20} />
            </button>
          </div>
        </div>
        
        {/* BERAT BADAN TARGET */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <span className="text-gray-400">Berat Badan Target</span>
          <div className="flex items-center gap-3">
            {/* UPDATE: Menggunakan user.beratTarget */}
            <span className="text-white">{user.beratTarget ? `${user.beratTarget} kg` : "Belum diisi"}</span>
            <button 
              onClick={() => handleEditBB("target")}
              className="text-gray-500 hover:text-yellow-400 transition-colors"
              title="Edit Berat Badan Target"
            >
              <IconPencil size={20} />
            </button>
          </div>
        </div>
        
        {/* TARGET MODE */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-400">Target Mode</span>
          <span className="text-yellow-400 font-bold px-4 py-1 border border-yellow-400/20 rounded-lg">
            {user.targetKalori || "Belum dipilih"}
          </span>
        </div>

      </div>
    </div>
  );
}