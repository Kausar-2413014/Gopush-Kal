"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProfileCard from "./_component/ProfileCard";
import ActionButtons from "./_component/ActionButtons";
import { 
  IconBarbell, 
  IconRun, 
  IconBike, 
  IconHeartbeat, 
  IconJumpRope, 
  IconStretching 
} from "@tabler/icons-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // State Form untuk memantau perubahan data diri secara langsung
  const [formData, setFormData] = useState({
    namaLengkap: "",
    username: "",
    password: "",
    beratSekarang: 0,
    beratTarget: 0,
  });

  // State untuk melacak apakah ada perubahan data (dirty)
  const [isDirty, setIsDirty] = useState(false);

  // Mengamankan dari Hydration Error & Load Data Awal
  useEffect(() => {
    setIsMounted(true);
    fetchUserData();
  }, []);

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
      }
    }
  };

  // Otomatis deteksi perubahan antara form input dengan data asli di localStorage
  useEffect(() => {
    if (!user) return;
    const hasChanged =
      formData.namaLengkap !== (user.namaLengkap || "") ||
      formData.username !== (user.username || "") ||
      formData.password !== (user.password || "") ||
      Number(formData.beratSekarang) !== Number(user.beratSekarang || 0) ||
      Number(formData.beratTarget) !== Number(user.beratTarget || 0);

    setIsDirty(hasChanged);
  }, [formData, user]);

  const handleCancel = () => {
    fetchUserData();
  };

  const handleSave = () => {
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");
    if (activeUsername && storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => {
        if (u.username === activeUsername) {
          return { ...u, ...formData };
        }
        return u;
      });
      localStorage.setItem("gopushkal_users", JSON.stringify(updatedUsers));
      setUser({ ...user, ...formData });
      alert("Profil berhasil diperbarui!");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari akun?");
    if (confirmLogout) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  // Proteksi Hydration Mismatch
  if (!isMounted) return <main className="min-h-screen bg-black" />;

  // Variasi Animasi In and Out Sesuai Spek
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-black flex flex-col items-center pt-28 pb-24 relative overflow-hidden">
      
      {/* ========================================== */}
      {/* BACKGROUND FLOATING ICONS (TABLER ICONS) */}
      {/* ========================================== */}
      {/* Sisi Kiri */}
      <motion.div 
        className="fixed top-[22%] left-[4%] text-white/10 z-0 pointer-events-none hidden xl:block"
        animate={{ y: [0, -25, 0], rotate: [0, 12, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ><IconBarbell size={75} /></motion.div>
      
      <motion.div 
        className="fixed top-[55%] left-[6%] text-white/10 z-0 pointer-events-none hidden xl:block"
        animate={{ y: [0, 35, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      ><IconRun size={85} /></motion.div>

      <motion.div 
        className="fixed bottom-[18%] left-[3%] text-yellow-400/10 z-0 pointer-events-none hidden xl:block"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      ><IconJumpRope size={65} /></motion.div>

      {/* Sisi Kanan */}
      <motion.div 
        className="fixed top-[26%] right-[5%] text-yellow-400/10 z-0 pointer-events-none hidden xl:block"
        animate={{ y: [0, 30, 0], rotate: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      ><IconHeartbeat size={80} /></motion.div>

      <motion.div 
        className="fixed top-[62%] right-[4%] text-white/10 z-0 pointer-events-none hidden xl:block"
        animate={{ y: [0, -35, 0], rotate: [0, -8, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      ><IconBike size={95} /></motion.div>

      <motion.div 
        className="fixed bottom-[14%] right-[7%] text-white/10 z-0 pointer-events-none hidden xl:block"
        animate={{ y: [0, 25, 0], x: [0, 12, 0], rotate: [0, -12, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      ><IconStretching size={70} /></motion.div>


      {/* ========================================== */}
      {/* NAVBAR */}
      {/* ========================================== */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="/Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>

          <div className="relative ml-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-yellow-400 transition-colors focus:outline-none flex flex-col justify-center items-center gap-1.5"
            >
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>

           <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50"
                >
                  <Link href="/Profile" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">Profile Anda</Link>
                  <Link href="/AboutUs" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">About Us</Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors">Log Out</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKL</Link>
        </div>
      </section>

      {/* ========================================== */}
      {/* ISI KONTEN UTAMA */}
      {/* ========================================== */}
      <div className="w-full max-w-5xl px-4 z-10 flex flex-col gap-2">
        
        {/* JUDUL UTAMA (Font disamakan persis dengan style Dashboard) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={cardVariants}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide mb-2">PROFILE ANDA</h1>
          <p className="text-gray-400">Kelola informasi data fisik diri Anda untuk kalkulasi kesehatan yang presisi.</p>
        </motion.div>

        {/* SECTION GRID YANG SUDAH DIBERSIHKAN RASIONYA (3:2) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={cardVariants}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start"
        >
          {/* PROFILE CARD (Kotak Informasi Diri Mengambil 3 Kolom / Lebih Besar) */}
          <div className="md:col-span-3">
            <ProfileCard 
              formData={formData} 
              setFormData={setFormData} 
              targetKalori={user?.targetKalori || "Maintenance"} 
            />
          </div>

          {/* ACTION BUTTONS (Kotak Ubah Metode Mengambil 2 Kolom / Lebih Kecil) */}
          <div className="md:col-span-2">
            <ActionButtons 
              user={user} 
              onUpdate={fetchUserData} 
            />
          </div>
        </motion.div>
      </div>

      {/* ========================================== */}
      {/* BAR ACTIONS DI PALING BAWAH (Save & Cancel) */}
      {/* ========================================== */}
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
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(250, 204, 21, 0.4)" }} whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded-xl transition-all"
            >
              Save Changes
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}