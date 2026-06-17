"use client";

import { useRouter } from "next/navigation";

export default function TargetSelection() {
  const router = useRouter();

  const handlePilihTarget = (target: string) => {
    const storedUsers = localStorage.getItem("gopushkal_users");
    const currentUser = localStorage.getItem("gopushkal_currentUser");

    if (storedUsers && currentUser) {
      let users = JSON.parse(storedUsers);
      
      // Cari user yang sedang login di dalam array, dan tambahkan targetnya
      users = users.map((u: any) => {
        if (u.username === currentUser) {
          return { ...u, targetKalori: target };
        }
        return u;
      });

      // Simpan kembali array yang sudah diperbarui
      localStorage.setItem("gopushkal_users", JSON.stringify(users));
      
      router.push("/Dashboard");
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Pilih Target Anda</h2>
      <p className="text-gray-400 mb-4 text-sm">Pilih tujuan yang ingin Anda capai agar kami bisa menghitung kebutuhan kalori Anda.</p>
      
      <button onClick={() => handlePilihTarget("Fat Loss")} className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg text-lg hover:bg-yellow-500 transition-colors">
        🔥 Fat Loss
      </button>
      <button onClick={() => handlePilihTarget("Maintenance")} className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg text-lg hover:bg-yellow-500 transition-colors">
        ⚖️ Maintenance
      </button>
      <button onClick={() => handlePilihTarget("Bulking")} className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg text-lg hover:bg-yellow-500 transition-colors">
        💪 Bulking
      </button>
    </div>
  );
}