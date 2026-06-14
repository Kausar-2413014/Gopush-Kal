import Link from 'next/link';
export default function Dasboard() {
  return (
    <section className="h-screen bg-black flex justify-center items-center">
        <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Man-running.svg" className="w-10 h-10 -scale-x-100" alt="Logo" />
          <div className="font-bold text-2xl tracking-wider">GOPUSHKAL</div>
        </div>
        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1 font-bold border-b-2 border-black">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKA</Link>
        </div>
      </section>
        <div className='font-bold text-4xl flex justify-center text-yellow-400'>Dashboard</div>
    </section>

  )
}