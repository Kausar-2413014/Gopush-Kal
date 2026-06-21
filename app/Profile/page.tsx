"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "./_component/ProfileCard";
import ActionButtons from "./_component/ActionButtons";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State Form untuk memantau perubahan secara langsung
  const [formData, setFormData] = useState({
    namaLengkap: "",
    username: "",
    password: "",
    beratSekarang: 0,
    beratTarget: 0,
  });

  const fetchUserData = () => {
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");
    if (activeUsername && storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: any) => u.username === activeUsername);
      if (foundUser) {
        setUser(foundUser);
        setFormData({
          namaLengkap: foundUser.namaLengkap || "",
          username: foundUser.username || "",
          password: foundUser.password || "",
          beratSekarang: foundUser.beratSekarang || 0,
          beratTarget: foundUser.beratTarget || 0,
        });
      } else {
        router.push("/Login");
      }
    } else {
      router.push("/Login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  // Cek apakah ada perubahan antara data di form dengan data asli di DB
  const isDirty = user && (
    formData.namaLengkap !== user.namaLengkap ||
    formData.username !== user.username ||
    formData.password !== user.password ||
    Number(formData.beratSekarang) !== Number(user.beratSekarang) ||
    Number(formData.beratTarget) !== Number(user.beratTarget)
  );

  const handleCancel = () => {
    // Kembalikan form ke data asli
    setFormData({
      namaLengkap: user.namaLengkap,
      username: user.username,
      password: user.password,
      beratSekarang: user.beratSekarang,
      beratTarget: user.beratTarget,
    });
  };

  const handleSave = () => {
    const storedUsers = localStorage.getItem("gopushkal_users");
    if (!storedUsers || !user) return;

    let users = JSON.parse(storedUsers);
    
    // Cek aturan reset: Jika berat target berubah, progress direset
    const isBeratTargetChanged = Number(formData.beratTarget) !== Number(user.beratTarget);

    if (isBeratTargetChanged) {
      const confirmReset = window.confirm(
        "Anda mengubah Berat Badan Target. Tindakan ini akan mereset progress hari Anda ke Day 1 dan menghapus log kalori hari ini. Lanjutkan?"
      );
      if (!confirmReset) return;
    }

    // Update data di array users
    users = users.map((u: any) => {
      if (u.username === user.username) {
        return {
          ...u,
          namaLengkap: formData.namaLengkap,
          username: formData.username,
          password: formData.password,
          beratSekarang: Number(formData.beratSekarang),
          beratTarget: Number(formData.beratTarget),
          currentDay: isBeratTargetChanged ? 1 : (u.currentDay || 1) // Reset ke 1 jika berat target berubah
        };
      }
      return u;
    });

    // Jika username berubah, perbarui juga session saat ini
    if (formData.username !== user.username) {
      localStorage.setItem("gopushkal_currentUser", formData.username);
      // Pindahkan data kalori lama ke key username baru jika diperlukan
      const kkm = localStorage.getItem(`gopushkal_kkm_today_${user.username}`);
      const kkl = localStorage.getItem(`gopushkal_kkl_today_${user.username}`);
      if (kkm) localStorage.setItem(`gopushkal_kkm_today_${formData.username}`, kkm);
      if (kkl) localStorage.setItem(`gopushkal_kkl_today_${formData.username}`, kkl);
    }

    // Jika berat target berubah, hapus log kalori hari ini
    if (isBeratTargetChanged) {
      localStorage.removeItem(`gopushkal_kkm_today_${formData.username}`);
      localStorage.removeItem(`gopushkal_kkl_today_${formData.username}`);
    }

    localStorage.setItem("gopushkal_users", JSON.stringify(users));
    alert("Perubahan profile berhasil disimpan!");
    fetchUserData();
  };

  if (!user) return <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center font-bold text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-28 pb-32 relative overflow-hidden">
      
      {/* BACKGROUND AMBIENT GLOW: Mengisi ruang kosong kanan & kiri */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-500px h-500px bg-yellow-400/5 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-40 w-500px h-500px bg-yellow-400/5 blur-[140px] rounded-full"></div>
      </div>

      {/* NAVBAR (DIPERTAHANKAN) */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>
          <div className="relative ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-yellow-400 transition-colors flex flex-col justify-center gap-1.5">
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>
            {isMenuOpen && (
              <div className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                <Link href="/Profile" className="px-5 py-3 text-yellow-400 font-bold bg-gray-900 border-l-4 border-yellow-400">Profile Anda</Link>
                <Link href="/AboutUs" className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">About Us</Link>
                <div className="border-t border-gray-700 my-1"></div>
                <button onClick={handleLogout} className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors">Log Out</button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block hover:-translate-y-1 transition-transform">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block hover:-translate-y-1 transition-transform">KKM</Link>
          <Link href="/Statistik" className="inline-block hover:-translate-y-1 transition-transform">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block hover:-translate-y-1 transition-transform">KKL</Link>
        </div>
      </section>

      {/* ISI HALAMAN PROFILE */}
      <div className="w-full max-w-7xl px-6 md:px-12 z-10 flex flex-col items-center">
        {/* JUDUL DI TENAH SESUAI PERMINTAAN */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-yellow-400 tracking-tighter mb-12 text-center uppercase"
        >
          Pengaturan <span className="text-white">Profile</span>
        </motion.h1>
        
        {/* Layout Grid 12 Kolom Melebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
          {/* SISI KIRI (7 Kolom): Input Form Langsung */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 w-full"
          >
            <ProfileCard formData={formData} setFormData={setFormData} targetKalori={user.targetKalori} />
          </motion.div>

          {/* SISI KANAN (5 Kolom): Action Buttons (Metode Target & Hapus) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <ActionButtons user={user} onUpdate={fetchUserData} />
          </motion.div>
        </div>
      </div>

      {/* BAR ACTIONS DI PALING BAWAH (Save & Cancel) */}
      <AnimatePresence>
        {isDirty && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t-2 border-yellow-400/50 p-4 flex justify-center items-center gap-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
          >
            <span className="text-sm text-gray-400 hidden md:inline font-medium mr-4">Ada perubahan data profil belum disimpan!</span>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(234,179,8,0.3)" }} whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-8 py-2.5 rounded-xl transition-colors"
            >
              Save Perubahan
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}