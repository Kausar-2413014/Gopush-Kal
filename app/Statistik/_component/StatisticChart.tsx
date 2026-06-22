"use client";

import { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface StatisticChartProps {
  historyData: any[];
  currentDay: number;
}

export default function StatisticChart({ historyData, currentDay }: StatisticChartProps) {
  const [mounted, setMounted] = useState(false);

  // Mengatasi Hidrasi SSR di Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-350px bg-[#111111] rounded-2xl border border-gray-800 animate-pulse" />;
  }

  // Jika belum ada log harian di localStorage
  if (!historyData || historyData.length === 0) {
    return (
      <div className="bg-black/40 border-2 border-dashed border-gray-800 rounded-2xl p-6 w-full h-350px flex flex-col items-center justify-center text-center gap-2">
         <h2 className="text-xl font-bold text-gray-500">Belum Ada Riwayat Data</h2>
         <p className="text-gray-600 text-sm max-w-sm">
           Silakan isi kalori masuk/keluar di Dashboard lalu klik <strong>Simpan Log</strong> untuk melihat pergerakan grafik Anda di sini.
         </p>
      </div>
    );
  }

  // Memetakan data riwayat agar siap dibaca oleh Recharts
  const chartData = historyData.map((item) => ({
    name: `Day ${item.day || 1}`,
    kkm: Number(item.kkm || 0),
    kkl: Number(item.kkl || 0),
  }));

  return (
    <div className="w-full">
      {/* Menggunakan nilai tinggi angka (350) untuk memaksa Recharts merender tingginya dengan presisi */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 15, right: 20, left: -15, bottom: 5 }}>
          
          {/* DEFINISI EFEK SHADOW / GLOW UNTUK GARIS */}
          <defs>
            <filter id="shadow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#4ade80" floodOpacity="0.6" />
            </filter>
            <filter id="shadow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#f87171" floodOpacity="0.6" />
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          
          <XAxis 
            dataKey="name" 
            stroke="#6b7280" 
            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 'bold' }} 
          />
          
          <YAxis 
            stroke="#6b7280" 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ fontWeight: 'bold' }}
          />
          
          <Legend verticalAlign="top" height={40} wrapperStyle={{ fontSize: '13px', fontWeight: 'bold' }} />
          
          {/* Line Kalori Masuk (KKM) - Hijau */}
          <Line 
            type="linear" /* Diubah dari monotone menjadi linear agar tajam */
            name="Kalori Masuk (KKM)" 
            dataKey="kkm" 
            stroke="#4ade80" 
            strokeWidth={4} 
            dot={{ r: 5, fill: '#111', stroke: '#4ade80', strokeWidth: 2 }} 
            activeDot={{ r: 7, fill: '#4ade80' }} 
            style={{ filter: "url(#shadow-green)" }} /* Menambahkan efek shadow hijau */
          />
          
          {/* Line Kalori Keluar (KKL) - Merah */}
          <Line 
            type="linear" /* Diubah dari monotone menjadi linear agar tajam */
            name="Kalori Keluar (KKL)" 
            dataKey="kkl" 
            stroke="#f87171" 
            strokeWidth={4} 
            dot={{ r: 5, fill: '#111', stroke: '#f87171', strokeWidth: 2 }} 
            activeDot={{ r: 7, fill: '#f87171' }} 
            style={{ filter: "url(#shadow-red)" }} /* Menambahkan efek shadow merah */
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}