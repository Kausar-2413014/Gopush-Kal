"use client";

interface MealSelectorProps {
  onSelect: (count: number) => void;
}

export default function MealSelector({ onSelect }: MealSelectorProps) {
  const options = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#111111] border-[3px] border-yellow-400 rounded-3xl w-full max-w-2xl mx-auto shadow-[0_0_15px_rgba(255,215,0,0.1)]">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Berapa kali Anda makan hari ini?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((num) => (
          <button
            key={num}
            onClick={() => onSelect(num)}
            className="bg-black border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold text-xl w-16 h-16 rounded-full transition-all flex items-center justify-center"
          >
            {num}x
          </button>
        ))}
      </div>
      <p className="text-gray-500 mt-6 text-sm text-center">Pilih frekuensi makan untuk memunculkan kotak input makanan.</p>
    </div>
  );
}