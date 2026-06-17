"use client";

import { useState } from "react";

interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export default function SignUpForm({ onSuccess, onSwitchMode }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    username: "",
    beratSekarang: "",
    beratTarget: "",
    password: "",
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

    // 1. Ambil data semua user dari localStorage (jika belum ada, buat array kosong [])
    const storedUsers = localStorage.getItem("gopushkal_users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // 2. Cek apakah username sudah dipakai
    const isExist = users.some((u: any) => u.username === formData.username);
    if (isExist) {
      setErrorMsg("Username sudah digunakan, silakan pilih yang lain.");
      return;
    }

    // 3. Tambahkan user baru ke dalam array
    users.push(formData);
    localStorage.setItem("gopushkal_users", JSON.stringify(users));

    // 4. Catat user ini sebagai user yang sedang aktif login sekarang
    localStorage.setItem("gopushkal_currentUser", formData.username);

    setErrorMsg("");
    onSuccess(); // Lanjut ke pemilihan target
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Create Account</h2>

      {errorMsg && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded text-sm text-center">
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
          <input type="number" name="beratSekarang" value={formData.beratSekarang} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" placeholder="Cth: 70" />
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

      <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-3 rounded mt-2 hover:bg-yellow-500 transition-colors">
        Sign Up
      </button>

      <p className="text-gray-400 text-sm text-center mt-4">
        Sudah punya akun? {" "}
        <button type="button" onClick={onSwitchMode} className="text-yellow-400 hover:underline font-semibold">
          Login di sini
        </button>
      </p>
    </form>
  );
}