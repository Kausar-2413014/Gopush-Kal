import Link from 'next/link';
export default function Statistik() {
  return (
    <section className="h-screen bg-black flex justify-center items-center">
        <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>
        </div>
         <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block hover:-translate-y-1 transition-transform">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block hover:-translate-y-1 transition-transfor">KKM</Link>
          <Link href="/Statistik" className="inline-block px-3 py-1 bg-gray-900 text-yellow-400 rounded-md">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block hover:-translate-y-1 transition-transfor">KKL</Link>
        </div>
      </section>
        <div className='font-bold text-4xl flex justify-center text-yellow-400'>Statistik</div>
    </section>

  )
}