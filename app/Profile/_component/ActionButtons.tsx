"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  user: any;
  onUpdate: () => void;
}

export default function ActionButtons({ user, onUpdate }: ActionButtonsProps) {
  const router = useRouter();
  const [showModeSelection, setShowModeSelection] = useState(false);

  // Fungsi saat salah satu metode dipilih
  const handlePilihMetode = (metodeBaru: string) => {
    const confirmReset = window.confirm(`Mengubah metode menjadi "${metodeBaru}" akan mereset progress Day dan Kalori Anda kembali ke 0. Lanjutkan?`);
    
    if (confirmReset) {
      updateUserData({ targetKalori: metodeBaru, currentDay: 1 });
      resetKaloriHarian();
      alert(`Metode berhasil diubah menjadi ${metodeBaru}. Progress direset ke Day 1.`);
      setShowModeSelection(false);
      onUpdate();
    }
  };

  const handleResetData = () => {
    const confirmReset = window.confirm("Apakah Anda yakin ingin mereset seluruh progress? Anda akan kembali ke Day 1 dan kalori hari ini akan dihapus.");
    if (confirmReset) {
      updateUserData({ currentDay: 1 });
      resetKaloriHarian();
      alert("Seluruh progress berhasil direset kembali ke Day 1!");
      onUpdate();
    }
  };

  const handleHapusAkun = () => {
    const confirmDelete = window.confirm("PERINGATAN KERAS! Apakah Anda yakin ingin menghapus akun ini selamanya? Data tidak dapat dikembalikan.");
    if (confirmDelete) {
      const storedUsers = localStorage.getItem("gopushkal_users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const remainingUsers = users.filter((u: any) => u.username !== user.username);
        localStorage.setItem("gopushkal_users", JSON.stringify(remainingUsers));
      }
      localStorage.removeItem("gopushkal_currentUser");
      resetKaloriHarian();
      alert("Akun berhasil dihapus.");
      router.push("/Login");
    }
  };

  const updateUserData = (newData: any) => {
    const storedUsers = localStorage.getItem("gopushkal_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => {
        if (u.username === user.username) return { ...u, ...newData };
        return u;
      });
      localStorage.setItem("gopushkal_users", JSON.stringify(updatedUsers));
    }
  };

  const resetKaloriHarian = () => {
    localStorage.removeItem(`gopushkal_kkm_today_${user.username}`);
    localStorage.removeItem(`gopushkal_kkl_today_${user.username}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-xl">
      <h3 className="text-white font-bold mb-2 text-center text-lg border-b border-gray-800 pb-2">Kontrol Akun</h3>
      
      {/* Logika Tampilan Tombol Ganti Metode */}
      {showModeSelection ? (
        <div className="w-full bg-black border border-blue-500 rounded-lg p-4 flex flex-col gap-3 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
          <p className="text-white text-sm text-center font-semibold">Pilih Target Mode Baru:</p>
          <div className="grid grid-cols-1 gap-2">
            <button onClick={() => handlePilihMetode('Fat Loss')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors">Fat Loss</button>
            <button onClick={() => handlePilihMetode('Bulking')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors">Bulking</button>
            <button onClick={() => handlePilihMetode('Maintenance')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors">Maintenance</button>
          </div>
          <button onClick={() => setShowModeSelection(false)} className="text-gray-400 hover:text-white text-sm mt-1 transition-colors">Batal</button>
        </div>
      ) : (
        <button 
          onClick={() => setShowModeSelection(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md"
        >
          🔄 Ganti Metode Target
        </button>
      )}

      <button 
        onClick={handleResetData}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors shadow-md"
      >
        ⚠️ Reset Progress (Ke Day 1)
      </button>

      <button 
        onClick={handleHapusAkun}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md mt-4"
      >
        🗑️ Hapus Akun Permanen
      </button>
    </div>
  );
}