"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DeveloperSettingPage() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  // Mengambil data pengguna saat halaman dimuat
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-red-500 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-red-500">⚙️ DEVELOPER SETTING</h1>
          <p className="text-gray-400 mt-1">Gopushkal Local Environment Debugger</p>
        </div>
        <Link 
          href="/Login" 
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-600"
        >
          Kembali ke Login
        </Link>
      </div>

      {/* Kontrol */}
      <div className="mb-8 bg-[#111] p-6 rounded-xl border border-red-500/50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-yellow-400">Database Pengguna</h2>
          <p className="text-sm text-gray-400">Total Akun Terdaftar: {users.length}</p>
        </div>
        <button 
          onClick={handleWipeData}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-colors"
        >
          🗑️ WIPE ALL DATA
        </button>
      </div>

      {/* Tabel Data Users */}
      <div className="overflow-x-auto bg-[#111] rounded-xl border border-gray-800">
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
      </div>
    </div>
  );
}