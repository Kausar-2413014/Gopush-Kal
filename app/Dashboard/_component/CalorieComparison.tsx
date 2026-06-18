"use client";

interface CalorieComparisonProps {
  kaloriMasuk: number;
  kaloriKeluar: number;
}

export default function CalorieComparison({ kaloriMasuk, kaloriKeluar }: CalorieComparisonProps) {
  // Hitung total kalori untuk dasar persentase
  const total = kaloriMasuk + kaloriKeluar;
  
  // Hitung persentase, hindari pembagian dengan nol
  const persentaseMasuk = total > 0 ? Math.round((kaloriMasuk / total) * 100) : 50;
  const persentaseKeluar = total > 0 ? Math.round((kaloriKeluar / total) * 100) : 50;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-4">
      <div className="flex w-full h-12 rounded-lg overflow-hidden shadow-lg border border-gray-800">
        {/* Bagian Masuk (Hijau) */}
        <div 
          style={{ width: `${persentaseMasuk}%` }} 
          className="bg-green-500 h-full transition-all duration-500 flex items-center justify-start px-4"
        >
          {total > 0 && (
            <span className="text-black font-bold text-sm sm:text-base">
              Masuk: {persentaseMasuk}%
            </span>
          )}
        </div>

        {/* Bagian Keluar (Merah) */}
        <div 
          style={{ width: `${persentaseKeluar}%` }} 
          className="bg-red-500 h-full transition-all duration-500 flex items-center justify-end px-4"
        >
          {total > 0 && (
            <span className="text-white font-bold text-sm sm:text-base">
              Keluar: {persentaseKeluar}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}   