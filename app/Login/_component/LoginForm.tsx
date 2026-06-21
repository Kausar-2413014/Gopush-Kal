"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface LoginFormProps {
  onSwitchMode: () => void;
}

export default function LoginForm({ onSwitchMode }: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // FITUR RAHASIA: DEVELOPER MODE
    if (formData.username === "AdminWeb" && formData.password === "gopush-kal") {
      alert("🔑 Developer Mode Terdeteksi! Mengalihkan ke Developer Setting...");
      router.push("/DeveloperSetting");
      return; 
    }

    const storedUsers = localStorage.getItem("gopushkal_users");
    
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const user = users.find((u: any) => u.username === formData.username && u.password === formData.password);

      if (user) {
        localStorage.setItem("gopushkal_currentUser", user.username);
        router.push("/Dashboard");
      } else {
        setErrorMsg("Username atau password salah!");
      }
    } else {
      setErrorMsg("Belum ada user yang terdaftar. Silakan Sign Up.");
    }
  };

  return (
    <motion.form 
      onSubmit={handleLogin} 
      className="flex flex-col gap-4"
      initial={{ opacity: 0, x: -30 }} // Awal: transparan & geser kiri
      animate={{ opacity: 1, x: 0 }}   // Muncul: penuh & di tengah
      exit={{ opacity: 0, x: 30 }}     // Keluar: transparan & geser kanan
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2 text-center">Login</h2>

      {errorMsg && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded text-sm text-center">
          {errorMsg}
        </div>
      )}

      <div>
        <label className="text-yellow-400 text-sm font-semibold mb-1 block">Username</label>
        <input 
          type="text" name="username" value={formData.username} onChange={handleChange} 
          className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" 
          placeholder="Masukkan username" required 
        />
      </div>

      <div>
        <label className="text-yellow-400 text-sm font-semibold mb-1 block">Password</label>
        <input 
          type="password" name="password" value={formData.password} onChange={handleChange} 
          className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400 transition-colors" 
          placeholder="••••••••" required 
        />
      </div>

      <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-3 rounded mt-2 hover:bg-yellow-500 transition-colors hover:scale-[1.02] active:scale-95 duration-200">
        Login
      </button>

      <p className="text-gray-400 text-sm text-center mt-2">
        Belum punya akun?{" "}
        <button type="button" onClick={onSwitchMode} className="text-yellow-400 font-semibold hover:underline">
          Sign Up
        </button>
      </p>
    </motion.form>
  );
}