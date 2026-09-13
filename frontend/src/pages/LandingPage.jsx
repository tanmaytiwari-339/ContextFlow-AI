import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/HeroSection";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-700 ease-in-out ${
        darkMode ? "bg-[#010835]" : "bg-[#EEF5FF]"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {darkMode ? (
          <>
            <div className="absolute inset-0 bg-[#010835]" />

            <div className="absolute inset-0 bg-gradient-to-br from-[#010835] via-[#00175E] to-[#010835]" />

            <div className="absolute top-[-300px] left-[20%] w-[1000px] h-[1000px] bg-blue-700/15 blur-[200px] rounded-full" />

            <div className="absolute bottom-[-250px] right-[10%] w-[800px] h-[800px] bg-purple-700/15 blur-[200px] rounded-full" />

            <div className="absolute top-[20%] left-[40%] w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#EEF5FF]" />

            <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] via-[#EDF5FF] to-[#E1EEFF]" />

            <div className="absolute top-[-200px] left-[15%] w-[900px] h-[900px] bg-blue-300/20 blur-[180px] rounded-full" />

            <div className="absolute bottom-[-250px] right-[5%] w-[800px] h-[800px] bg-cyan-300/20 blur-[180px] rounded-full" />

            <div className="absolute top-[15%] right-[20%] w-[600px] h-[600px] bg-purple-300/10 blur-[150px] rounded-full" />
          </>
        )}
      </div>

      <div className="relative z-10">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* IMPORTANT FIX */}
        <HeroSection lightMode={!darkMode} />


        <Footer lightMode={!darkMode} />
      </div>
    </div>
  );
}