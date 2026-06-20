"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "./_component/ProfileCard";
import ActionButtons from "./_component/ActionButtons";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchUserData = () => {
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
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari akun?");
    if (confirmLogout) {
      localStorage.removeItem("gopushkal_currentUser");
      router.push("/Login");
    }
  };

  if (!user) return <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center font-bold text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-28 pb-10">
      {/* NAVBAR */}
      <section className="bg-yellow-300 text-black w-full h-20 pe-7 fixed top-0 left-0 flex justify-between items-center z-50 shadow-lg">
        <div className="flex gap-2 px-6 items-center">
          <img src="Logo_Gopushkal-BL.png" className="w-15 h-15" alt="Logo" />
          <div className="text-3xl font-bold tracking-wider italic">GOPUSHKAL</div>

          <div className="relative ml-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-yellow-400 transition-colors focus:outline-none flex flex-col justify-center items-center gap-1.5"
            >
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
              <div className="w-6 h-1 bg-black rounded-full"></div>
            </button>

            {isMenuOpen && (
              <div className="absolute top-12 left-0 mt-2 w-48 bg-[#111111] border-2 border-yellow-400 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
                <Link href="/Profile" className="px-5 py-3 text-yellow-400 font-bold bg-gray-900 border-l-4 border-yellow-400">
                  Profile Anda
                </Link>
                <Link href="/AboutUs" className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black font-semibold transition-colors">
                  About Us
                </Link>
                <div className="border-t border-gray-700 my-1"></div>
                <button onClick={handleLogout} className="px-5 py-3 text-red-500 text-left hover:bg-red-500 hover:text-white font-bold transition-colors">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-6 justify-between items-center font-semibold">
          <Link href="/Dashboard" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Dashboard</Link>
          <Link href="/Kalkulator" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKM</Link>
          <Link href="/Statistik" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">Statistik</Link>
          <Link href="/Aktivitas" className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:opacity-80">KKL</Link>
        </div>
      </section>

      {/* ISI HALAMAN PROFILE */}
      <div className="w-full max-w-5xl px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wide mb-10 text-center">Pengaturan Profile</h1>
        
        {/* Layout Grid Berdampingan */}
        <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-center">
          {/* Bagian Kiri: Profile Card */}
          <div className="w-full md:w-3/5">
           <ProfileCard user={user} onUpdate={fetchUserData} />
          </div>

          {/* Bagian Kanan: Action Buttons */}
          <div className="w-full md:w-2/5">
            <ActionButtons user={user} onUpdate={fetchUserData} />
          </div>
        </div>
      </div>
    </div>
  );
}