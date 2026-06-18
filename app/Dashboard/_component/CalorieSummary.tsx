"use client";

interface CalorieSummaryProps {
  kaloriMasuk: number;
  kaloriKeluar: number;
  day: number;
}

export default function CalorieSummary({ kaloriMasuk, kaloriKeluar, day }: CalorieSummaryProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-10 w-full max-w-5xl mx-auto">
      {/* Kotak Kalori Masuk */}
      <div className="relative border-[3px] border-yellow-400 rounded-3xl p-8 w-full md:w-1/3 flex flex-col items-center justify-center min-h-160px shadow-[0_0_15px_rgba(255,215,0,0.1)]">
        <div className="absolute -top-6 bg-black border-[3px] border-yellow-400 rounded-full px-6 py-2">
          <h2 className="text-yellow-400 font-bold text-xl">Kalori Masuk</h2>
        </div>
        <div className="flex items-end gap-2 mt-4 text-green-500 font-bold text-4xl">
          <span>{kaloriMasuk || "- - - -"}</span>
          <span className="text-xl pb-1">KKAL</span>
        </div>
      </div>

      {/* Pill Day */}
      <div className="bg-yellow-400 text-black font-bold text-2xl px-10 py-4 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.3)]">
        Day : {day}
      </div>

      {/* Kotak Kalori Keluar */}
      <div className="relative border-[3px] border-yellow-400 rounded-3xl p-8 w-full md:w-1/3 flex flex-col items-center justify-center min-h-160px shadow-[0_0_15px_rgba(255,215,0,0.1)]">
        <div className="absolute -top-6 bg-black border-[3px] border-yellow-400 rounded-full px-6 py-2">
          <h2 className="text-yellow-400 font-bold text-xl">Kalori Keluar</h2>
        </div>
        <div className="flex items-end gap-2 mt-4 text-red-500 font-bold text-4xl">
          <span>{kaloriKeluar || "- - - -"}</span>
          <span className="text-xl pb-1">KKAL</span>
        </div>
      </div>
    </div>
  );
}