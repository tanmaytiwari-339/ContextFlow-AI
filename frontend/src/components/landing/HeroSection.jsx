import { Link } from "react-router-dom";
import heroDark from "../../assets/images/hero-dark.png";
import heroLight from "../../assets/images/hero-light.png";

export default function HeroSection({ lightMode }) {
  return (
    <section className="relative flex flex-col lg:flex-row items-start justify-between px-10 lg:px-20 pt-4 pb-12 min-h-[75vh]">

      {/* Floating Elements */}
      <div
        className={`absolute top-32 left-[45%] w-10 h-10 rounded-xl backdrop-blur-sm ${
          lightMode
            ? "bg-blue-300/40"
            : "bg-blue-500/20"
        }`}
      />

      <div
        className={`absolute top-60 left-[55%] w-14 h-14 rounded-xl backdrop-blur-sm ${
          lightMode
            ? "bg-cyan-300/40"
            : "bg-blue-500/20"
        }`}
      />

      <div
        className={`absolute top-24 right-60 w-20 h-20 rounded-2xl backdrop-blur-sm ${
          lightMode
            ? "bg-purple-300/40"
            : "bg-blue-500/20"
        }`}
      />

      {/* Left Content */}
      <div className="flex-1 z-10 mt-2">

        <p
          className={`uppercase tracking-[6px] text-sm mb-4 font-semibold ${
            lightMode
              ? "text-blue-600"
              : "text-cyan-400"
          }`}
        >
          AI-Powered Knowledge Management
        </p>

        <h1
          className={`font-black leading-[0.92] text-6xl md:text-7xl lg:text-8xl ${
            lightMode
              ? "text-[#0B1E5B]"
              : "text-white"
          }`}
        >
          Your
          <br />
          Knowledge
          <br />
          Finds Its
          <br />

          <span
            className={`bg-gradient-to-r ${
              lightMode
                ? "from-blue-600 via-cyan-500 to-purple-600"
                : "from-cyan-500 via-blue-500 to-purple-500"
            } bg-clip-text text-transparent`}
          >
            Flow
          </span>
        </h1>

        <p
          className={`mt-5 text-lg max-w-xl leading-relaxed ${
            lightMode
              ? "text-slate-700"
              : "text-gray-300"
          }`}
        >
          Upload, summarize and explore documents using AI-powered
          knowledge management built for modern teams.
        </p>

        {/* Buttons */}
        <div className="flex gap-5 mt-7 flex-wrap">

          <Link
            to="/login"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300"
          >
            Login →
          </Link>

          <Link
            to="/register"
            className={`px-10 py-4 rounded-full transition-all duration-300 ${
              lightMode
                ? "border border-slate-200 bg-white/90 backdrop-blur-xl text-slate-800 hover:bg-white shadow-lg"
                : "border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10"
            }`}
          >
            Create Account
          </Link>

        </div>

      </div>

      {/* Right Illustration */}
      <div className="flex-1 flex justify-center items-center relative mt-6 lg:mt-0">

        {/* Main Glow */}
        <div
          className={`absolute w-[700px] h-[700px] rounded-full blur-[150px] ${
            lightMode
              ? "bg-blue-300/25"
              : "bg-blue-600/20"
          }`}
        />

        {/* Orbit Rings */}
        <div
          className={`absolute w-[550px] h-[550px] rounded-full ${
            lightMode
              ? "border border-blue-400/20"
              : "border border-cyan-500/10"
          }`}
        />

        <div
          className={`absolute w-[700px] h-[700px] rounded-full ${
            lightMode
              ? "border border-blue-300/20"
              : "border border-blue-500/10"
          }`}
        />

        <div
          className={`absolute w-[850px] h-[850px] rounded-full ${
            lightMode
              ? "border border-purple-300/20"
              : "border border-purple-500/10"
          }`}
        />

        {/* Hero Image */}
        <img
          src={lightMode ? heroLight : heroDark}
          alt="ContextFlow AI"
          className={`relative z-10 w-full max-w-4xl transition-all duration-500 ${
            lightMode
              ? "brightness-95 contrast-110 drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]"
              : "drop-shadow-[0_0_80px_rgba(59,130,246,0.8)]"
          }`}
        />

      </div>

    </section>
  );
}