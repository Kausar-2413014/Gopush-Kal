"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, Variants } from "framer-motion";
// Import Tabler Icons bertema Alat/Debugger (Wrench diganti Pointer)
import { IconSettings, IconPointer, IconKey, IconLayoutDashboard } from "@tabler/icons-react";

// ==========================================
// Komponen Pembantu: Counter Angka Animasi
// ==========================================
function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // Animasi counter dari 0 ke nilai target
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

// ==========================================
// Komponen Pembantu: Ikon Mengambang Latar Belakang (Tema Alat)
// ==========================================
function FloatingDeveloperIcons() {
  const iconVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0.1, 0.2, 0.1], // Denyut opacity halus
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Sisi Kiri */}
      <motion.div 
        className="absolute top-[20%] left-[8%] text-gray-700 hidden md:block"
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        style={{ y: useTransform(useMotionValue(0), [0, 1], [0, -20]) }}
      ><IconSettings size={70} /></motion.div>
      
      <motion.div 
        className="absolute top-[60%] left-[5%] text-gray-600 hidden md:block"
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        transition={{ delay: 1 }}
        style={{ y: useTransform(useMotionValue(0), [0, 1], [0, 30]) }}
      ><IconPointer size={80} /></motion.div>

      <motion.div 
        className="absolute bottom-[15%] left-[12%] text-gray-700 hidden md:block"
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        transition={{ delay: 0.5 }}
        style={{ y: useTransform(useMotionValue(0), [0, 1], [0, -15]) }}
      ><IconKey size={60} /></motion.div>

      {/* Sisi Kanan */}
      <motion.div 
        className="absolute top-[25%] right-[10%] text-gray-600 hidden md:block"
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        transition={{ delay: 0.2 }}
        style={{ y: useTransform(useMotionValue(0), [0, 1], [0, 25]) }}
      ><IconPointer size={75} /></motion.div>

      <motion.div 
        className="absolute bottom-[20%] right-[12%] text-gray-700 hidden md:block"
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        transition={{ delay: 1.5 }}
        style={{ y: useTransform(useMotionValue(0), [0, 1], [0, 20]) }}
      ><IconSettings size={80} /></motion.div>
    </div>
  );
}

// ==========================================
// Komponen Pembantu: Animasi Intro Kedua Ikon Besar Bergabung
// ==========================================
function DeveloperIntro({ onComplete }: { onComplete: () => void }) {
  
  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.2, y: 50 },
    visible: (custom: { x: number }) => ({
      opacity: 1, 
      scale: 1, 
      y: 0, 
      x: custom.x,
      transition: { type: "spring", stiffness: 100, delay: 0.3 }
    }),
    joined: {
      scale: 1.1,
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: 1.2 }
    }
  };

  useEffect(() => {
    // Selesaikan intro setelah animasi teks selesai
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // Durasi total intro
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-12 font-mono overflow-hidden"
    >
      <div className="relative flex items-center justify-center gap-6">
        {/* Gear Besar */}
        <motion.div
          custom={{ x: -25 }}
          initial="hidden"
          animate={["visible", "joined"]}
          variants={iconVariants}
          className="text-red-500"
        ><IconSettings size={180} /></motion.div>
        
        {/* Pointer Besar (Pengganti Wrench) */}
        <motion.div
          custom={{ x: 25 }}
          initial="hidden"
          animate={["visible", "joined"]}
          variants={iconVariants}
          className="text-red-500"
        ><IconPointer size={180} /></motion.div>
      </div>

      {/* Teks Intro */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-red-500 tracking-wider">DEVELOPER SETTING</h1>
        <p className="text-gray-400 mt-2">Gopushkal Local Environment Debugger</p>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// Komponen Utama Halaman Developer Settings
// ==========================================
export default function DeveloperSettingPage() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State untuk mengontrol intro

  // Mengambil data pengguna saat halaman dimuat
  useEffect(() => {
    setIsMounted(true);
    const storedUsers = localStorage.getItem("gopushkal_users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Fungsi untuk membersihkan SELURUH data lokal
  const handleWipeData = () => {
    const confirmWipe = window.confirm(
      "PERINGATAN: Anda yakin ingin menghapus SELURUH akun dan data pengguna? Tindakan ini tidak bisa dibatalkan."
    );

    if (confirmWipe) {
      // Menghapus semua yang ada di localStorage
      localStorage.clear(); 
      setUsers([]);
      alert("Seluruh data (Akun, Kalori, Sesi) berhasil dihapus! Local Storage sekarang kosong.");
    }
  };

  // Proteksi Hydration Error
  if (!isMounted) return <div className="min-h-screen bg-black" />;

  // Variasi Animasi Masuk Konten Halaman
  const pageVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <AnimatePresence>
      {/* Tampilkan Intro jika sedang memuat */}
      {isLoading ? (
        <DeveloperIntro key="intro" onComplete={() => setIsLoading(false)} />
      ) : (
        <main suppressHydrationWarning className="min-h-screen bg-black text-white p-8 font-mono relative overflow-x-hidden pt-28 pb-10">
          
          {/* Ikon Mengambang Latar Belakang */}
          <FloatingDeveloperIcons />

          {/* Konten Halaman Utama dengan Animasi Masuk */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            className="w-full max-w-6xl mx-auto flex flex-col gap-10 z-10 relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-red-500 gap-4 flex-col md:flex-row">
              <div>
                <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
                  <IconLayoutDashboard className="text-gray-600" />
                  <span>⚙️ DEVELOPER SETTING</span>
                </h1>
                <p className="text-gray-400 mt-1">Gopushkal Local Environment Debugger</p>
              </div>
              <Link 
                href="/Login" 
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-600 flex items-center gap-2 text-sm"
              >
                Kembali ke Login
              </Link>
            </div>

            {/* Kontrol */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={pageVariants}
              className="bg-[#111] p-6 rounded-xl border border-red-500/50 flex justify-between items-center gap-6 shadow-[0_0_20px_rgba(239,68,68,0.1)] flex-col md:flex-row"
            >
              <div>
                <h2 className="text-xl font-bold text-yellow-400">Database Pengguna</h2>
                <p className="text-sm text-gray-400">
                  Total Akun Terdaftar: <span className="font-bold text-red-500"><AnimatedCounter value={users.length} /></span>
                </p>
              </div>
              <button 
                onClick={handleWipeData}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-colors text-lg flex items-center gap-3"
              >
                <IconPointer size={24} />
                <span>🗑️ WIPE ALL DATA</span>
              </button>
            </motion.div>
            
            {/* Tabel Data Users */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={pageVariants}
              className="overflow-x-auto bg-[#111] rounded-xl border border-gray-800"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-yellow-400">
                    <th className="p-4 border-b border-gray-700">No</th>
                    <th className="p-4 border-b border-gray-700">Username</th>
                    <th className="p-4 border-b border-gray-700">Password</th>
                    <th className="p-4 border-b border-gray-700">Nama Lengkap</th>
                    <th className="p-4 border-b border-gray-700">Target Mode</th>
                    <th className="p-4 border-b border-gray-700">Progress Day</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-900 transition-colors">
                        <td className="p-4 border-b border-gray-800">{index + 1}</td>
                        <td className="p-4 border-b border-gray-800 font-bold text-blue-400">{user.username}</td>
                        <td className="p-4 border-b border-gray-800 text-red-400">{user.password}</td>
                        <td className="p-4 border-b border-gray-800">{user.namaLengkap}</td>
                        <td className="p-4 border-b border-gray-800">
                          <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                            {user.targetKalori || "Belum Set"}
                          </span>
                        </td>
                        <td className="p-4 border-b border-gray-800 text-green-400 font-bold">
                          Day {user.currentDay || 1}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                        Tidak ada data pengguna di Local Storage saat ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </main>
      )}
    </AnimatePresence>
  );
}