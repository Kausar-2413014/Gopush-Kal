import Link from 'next/link';
export default function Statistik() {
  return (
    <section className="h-screen bg-black flex justify-center items-center">
        <section className="bg-yellow-300 w-full h-20 pe-7 fixed top-0 left-0 flex justify-between">
          <div className="flex gap-2 px-6 items-center">
              <img src="Man-running.svg" className="w-10 h-10 -scale-x-100"/>
              <div className="font-bold text-2xl">GOPUSHKAL</div>
          </div>
          <div className="flex gap-6 justify-between items-center">
           <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1">
            Dashboard
          </Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1">
            Kalkulator Kalori
          </Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1">
            Statistik
          </Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1">
            Aktivitas
          </Link>
          </div>
        </section>
        <div className='font-bold text-4xl flex justify-center text-yellow-400'>Statistik</div>
    </section>

  )
}