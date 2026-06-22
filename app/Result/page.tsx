"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ResultHero from './_component/ResultHero';
import RatingSystem from './_component/RatingSystem';
import DeveloperTeam from './_component/DeveloperTeam';
import { 
  IconBarbell, 
  IconRun, 
  IconBike, 
  IconHeartbeat, 
  IconJumpRope, 
  IconSwimming, 
  IconStretching, 
  IconTreadmill,
  IconChartLine,
  IconScale
} from "@tabler/icons-react";


export default function ResultPage() {
    const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const activeUsername = localStorage.getItem("gopushkal_currentUser");
    const storedUsers = localStorage.getItem("gopushkal_users");

    if (activeUsername && storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: any) => u.username === activeUsername);
      
      if (foundUser) {
        setUser(foundUser);
      } else {
        router.push("/Login");
      }
    } else {
      router.push("/Login");
    }
  }, [router]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari Gopushkal?")) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col relative pb-10">
         <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* Ikon Terapung Sisi Kiri */}
        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '25%', left: '5%' }}
          animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        ><IconBarbell size={75} /></motion.div>
        
        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '55%', left: '8%' }}
          animate={{ y: [0, -30, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        ><IconRun size={85} /></motion.div>

        <motion.div 
          className="absolute text-yellow-400/10 hidden xl:block"
          style={{ bottom: '20%', left: '4%' }}
          animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        ><IconJumpRope size={65} /></motion.div>

        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '40%', left: '12%' }}
          animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
        ><IconSwimming size={55} /></motion.div>

        {/* Ikon Terapung Sisi Kanan */}
        <motion.div 
          className="absolute text-yellow-400/10 hidden xl:block"
          style={{ top: '30%', right: '6%' }}
          animate={{ y: [0, 35, 0], rotate: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        ><IconHeartbeat size={80} /></motion.div>

        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ top: '65%', right: '9%' }}
          animate={{ y: [0, -40, 0], rotate: [0, -10, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        ><IconBike size={95} /></motion.div>

        <motion.div 
          className="absolute text-white/10 hidden xl:block"
          style={{ bottom: '15%', right: '4%' }}
          animate={{ y: [0, 30, 0], x: [0, 15, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        ><IconStretching size={70} /></motion.div>

        <motion.div 
          className="absolute text-yellow-400/10 hidden xl:block"
          style={{ top: '50%', right: '14%' }}
          animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3.3 }}
        ><IconTreadmill size={60} /></motion.div>

        {/* Ambient Glow Effects agar latar tidak hampa */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>
          <div className="relative ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-yellow-400 flex flex-col gap-1.5 focus:outline-none">
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                  <Link href="/Profile" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">Profile Anda</Link>
                  <Link href="/AboutUs" onClick={() => setIsMenuOpen(false)} className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">About Us</Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors">Log Out</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block hover:opacity-80">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block px-3 py-1 bg-gray-900 text-yellow-400 rounded-md">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block hover:opacity-80">KKL</Link>
        </div>
      </section>
      

      <div className="max-w-5xl mx-auto w-full px-6 flex flex-col items-center gap-16 pt-20">
        <ResultHero />
        <RatingSystem />
        <DeveloperTeam />
      </div>
    </main>
  );
}