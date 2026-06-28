"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, Variants } from "framer-motion";
import { 
  IconSettings, 
  IconPointer, 
  IconKey, 
  IconLayoutDashboard, 
  IconDatabase 
} from "@tabler/icons-react";

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
// Komponen Pembantu: Ikon Mengambang
// ==========================================
function FloatingDeveloperIcons() {
  const iconVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0.05, 0.15, 0.05], 
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-between px-20">
      <motion.div variants={iconVariants} initial="hidden" animate="visible" className="text-gray-600">
        <IconSettings size={150} />
      </motion.div>
      <motion.div variants={iconVariants} initial="hidden" animate="visible" className="text-gray-600">
        <IconKey size={150} />
      </motion.div>
    </div>
  );
}

// ==========================================
// Komponen Pembantu: Layar Loading Intro
// ==========================================
function DeveloperIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 font-mono fixed inset-0 z-50"
    >
      <IconSettings className="animate-spin mb-4" size={80} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-center px-4">
        INITIALIZING DEBUGGER...
      </h1>
    </motion.div>
  );
}

// ==========================================
// KOMPONEN UTAMA HALAMAN
// ==========================================
export default function DeveloperSettingPage() {
  // Ditambahkan tipe data <any[]> agar TypeScript tidak error
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const storedUsers = localStorage.getItem("gopushkal_users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // --- Fungsi Hapus Data ---
  const handleWipeData = () => {
    const confirmWipe = window.confirm(
      "PERINGATAN: Anda yakin ingin menghapus SELURUH akun dan data pengguna? Tindakan ini tidak bisa dibatalkan."
    );

    if (confirmWipe) {
      localStorage.clear(); 
      setUsers([]);
      alert("Seluruh data (Akun, Kalori, Sesi) berhasil dihapus! Local Storage sekarang kosong.");
    }
  };

  // --- Fungsi Inject Data Acak (BARU) ---
  const handleInjectRandomData = () => {
    if (users.length === 0) {
      alert("Tidak ada user terdaftar. Silakan register/buat akun terlebih dahulu di halaman Login.");
      return;
    }

    const inputDay = window.prompt("Masukkan target Progress Day yang ingin di-generate (Contoh: 7, 10, atau 15):", "7");
    
    // Validasi input
    if (!inputDay || isNaN(Number(inputDay))) return;
    const targetDay = parseInt(inputDay);

    const confirmInject = window.confirm(`Generate data random KKM & KKL dari Day 1 sampai Day ${targetDay} untuk semua user?`);
    if (!confirmInject) return;

    // Memodifikasi data user dengan data random KKM dan KKL
    const updatedUsers = users.map((user: any) => {
      const randomHistory = [];
      
      for (let i = 1; i <= targetDay; i++) {
        randomHistory.push({
          day: i,
          kkm: Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000, // Random KKM
          kkl: Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500, // Random KKL
        });
      }

      return {
        ...user,
        currentDay: targetDay,
        history: randomHistory
      };
    });

    // Simpan ke Local Storage dan update State
    localStorage.setItem("gopushkal_users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    alert(`Berhasil inject data riwayat acak hingga Day ${targetDay}! Silakan cek halaman Statistik Anda.`);
  };

  // Menghindari Hydration Error di Next.js
  if (!isMounted) return <div className="min-h-screen bg-black" />;

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
      {isLoading ? (
        <DeveloperIntro key="intro" onComplete={() => setIsLoading(false)} />
      ) : (
        <main suppressHydrationWarning className="min-h-screen bg-black text-white p-8 font-mono relative overflow-x-hidden pt-28 pb-10">
          
          <FloatingDeveloperIcons />

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

            {/* Kontrol Button Panel */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={pageVariants}
              className="bg-[#111] p-6 rounded-xl border border-red-500/50 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
            >
              <div>
                <h2 className="text-xl font-bold text-yellow-400">Database Pengguna</h2>
                <p className="text-sm text-gray-400">
                  Total Akun Terdaftar: <span className="font-bold text-red-500">
                    <AnimatedCounter value={users.length} />
                  </span>
                </p>
              </div>
              
              {/* Group Tombol Aksi */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleInjectRandomData}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-colors text-lg flex items-center gap-3"
                >
                  <IconDatabase size={24} />
                  <span>🎲 INJECT RANDOM DATA</span>
                </button>
                <button 
                  onClick={handleWipeData}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-colors text-lg flex items-center gap-3"
                >
                  <IconPointer size={24} />
                  <span>🗑️ WIPE ALL DATA</span>
                </button>
              </div>
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
                    // Penambahan tipe data (user: any, index: number) di sini menyelesaikan error ts(7006)
                    users.map((user: any, index: number) => (
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