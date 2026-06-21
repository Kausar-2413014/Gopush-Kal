"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export default function SignUpForm({ onSuccess, onSwitchMode }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    namaLengkap: "", username: "", beratSekarang: "", beratTarget: "", password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaLengkap || !formData.username || !formData.beratSekarang || !formData.beratTarget || !formData.password) {
      setErrorMsg("Harap isi semua kolom pendaftaran.");
      return;
    }

    const storedUsers = localStorage.getItem("gopushkal_users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const isExist = users.some((u: any) => u.username === formData.username);
    if (isExist) {
      setErrorMsg("Username sudah digunakan, pilih yang lain.");
      return;
    }

    const newUser = { ...formData, targetKalori: "" };
    users.push(newUser);
    localStorage.setItem("gopushkal_users", JSON.stringify(users));
    localStorage.setItem("gopushkal_currentUser", formData.username);

    onSuccess();
  };

  return (
    <motion.form 
      onSubmit={handleSignUp} 
      className="flex flex-col gap-4"
      initial={{ opacity: 0, x: 30 }}  // Muncul dari kanan
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}    // Keluar ke kiri
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2 text-center">Buat Akun Baru</h2>

      {errorMsg && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded text-sm text-center">
          {errorMsg}
        </div>
      )}

      <div>
        <label className="text-yellow-400 text-sm font-semibold mb-1 block">Nama Lengkap</label>
        <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" placeholder="Masukkan nama lengkap" />
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-yellow-400 text-sm font-semibold mb-1 block">BB Sekarang (kg)</label>
          <input type="number" name="beratSekarang" value={formData.beratSekarang} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" placeholder="Cth: 75" />
        </div>
        <div className="w-1/2">
          <label className="text-yellow-400 text-sm font-semibold mb-1 block">BB Target (kg)</label>
          <input type="number" name="beratTarget" value={formData.beratTarget} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" placeholder="Cth: 65" />
        </div>
      </div>

      <div>
        <label className="text-yellow-400 text-sm font-semibold mb-1 block">Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" placeholder="Masukkan username" />
      </div>

      <div>
        <label className="text-yellow-400 text-sm font-semibold mb-1 block">Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" placeholder="••••••••" />
      </div>

      <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-3 rounded mt-2 hover:bg-yellow-500 transition-colors hover:scale-[1.02] active:scale-95 duration-200">
        Lanjut Pilih Target
      </button>

      <p className="text-gray-400 text-sm text-center mt-2">
        Sudah punya akun?{" "}
        <button type="button" onClick={onSwitchMode} className="text-yellow-400 font-semibold hover:underline">
          Login
        </button>
      </p>
    </motion.form>
  );
}