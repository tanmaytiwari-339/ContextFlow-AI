import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.png";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col lg:flex-row items-start justify-between px-10 lg:px-20 pt-4 pb-12 min-h-[75vh]">

      {/* Floating Elements */}
      <div className="absolute top-32 left-[45%] w-10 h-10 rounded-xl bg-blue-500/20 backdrop-blur-sm"></div>

      <div className="absolute top-60 left-[55%] w-14 h-14 rounded-xl bg-blue-500/20 backdrop-blur-sm"></div>

      <div className="absolute top-24 right-60 w-20 h-20 rounded-2xl bg-blue-500/20 backdrop-blur-sm"></div>

      {/* Left Content */}
      <div className="flex-1 z-10 mt-2">

        <p className="uppercase tracking-[6px] text-cyan-400 text-sm mb-4">
          AI-Powered Knowledge Management
        </p>

        <h1 className="text-white font-black leading-[0.92] text-6xl md:text-7xl lg:text-8xl">
          Your
          <br />
          Knowledge
          <br />
          Finds Its
          <br />
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Flow
          </span>
        </h1>

        <p className="text-gray-300 mt-5 text-lg max-w-xl leading-relaxed">
          Upload, summarize and explore documents using AI-powered
          knowledge management built for modern teams.
        </p>

        <div className="flex gap-5 mt-7 flex-wrap">

          <Link
            to="/login"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300"
          >
            Login →
          </Link>

          <Link
            to="/register"
            className="px-10 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300"
          >
            Create Account
          </Link>

        </div>

        <div className="flex flex-wrap gap-8 mt-10 text-gray-300 text-sm">

          {/* <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Secure & Private</span>
          </div>

          <div className="flex items-center gap-2">
            <span>📄</span>
            <span>Works with all formats</span>
          </div>

          <div className="flex items-center gap-2">
            <span>👥</span>
            <span>Built for Teams</span>
          </div> */}

        </div>

      </div>

      {/* Right Side Illustration */}
      <div className="flex-1 flex justify-center items-center relative mt-6 lg:mt-0">

        {/* Glow */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[150px]" />

        {/* Orbit Rings */}
        <div className="absolute w-[550px] h-[550px] border border-cyan-500/10 rounded-full"></div>

        <div className="absolute w-[700px] h-[700px] border border-blue-500/10 rounded-full"></div>

        <div className="absolute w-[850px] h-[850px] border border-purple-500/10 rounded-full"></div>

        <img
          src={heroImage}
          alt="ContextFlow AI"
          className="relative z-10 w-full max-w-4xl drop-shadow-[0_0_80px_rgba(59,130,246,0.8)]"
        />

      </div>

    </section>
  );
}