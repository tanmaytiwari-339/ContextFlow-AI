import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Sun, Moon } from "lucide-react";
import logo from "../../assets/images/logo.png";

export default function Navbar({ darkMode, setDarkMode }) {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="relative z-50 px-8 lg:px-12 pt-6">
      <nav className="flex items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logo}
            alt="ContextFlow AI"
            className="w-16 h-16 object-contain"
          />

          <div>
            <h1
              className={`text-3xl font-bold leading-none ${
                darkMode ? "text-white" : "text-[#0B1E5B]"
              }`}
            >
              ContextFlow AI
            </h1>

            <p className="text-cyan-500 text-xs tracking-[4px] mt-1">
              KNOWLEDGE MANAGEMENT
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-10 ml-auto mr-6">

          {/* Features */}
          <div
            className="relative"
            onMouseEnter={() => setShowFeatures(true)}
            onMouseLeave={() => setShowFeatures(false)}
          >
            <button
              className={`flex items-center gap-1 text-xl font-medium transition ${
                darkMode
                  ? "text-white hover:text-cyan-400"
                  : "text-[#0B1E5B] hover:text-blue-500"
              }`}
            >
              Features
              <ChevronDown size={18} />
            </button>

            {showFeatures && (
              <div
                className={`absolute top-12 left-1/2 -translate-x-1/2 w-80 rounded-2xl backdrop-blur-2xl p-5 shadow-2xl border ${
                  darkMode
                    ? "bg-[#09175f]/95 border-white/10"
                    : "bg-white/90 border-gray-200"
                }`}
              >
                <h3 className="text-cyan-500 font-semibold mb-5">
                  Platform Features
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-[#0B1E5B]"
                      }`}
                    >
                      Upload Documents
                    </h4>

                    <p className="text-gray-500 text-sm">
                      Upload PDFs, Word, PowerPoint and Excel files.
                    </p>
                  </div>

                  <div>
                    <h4
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-[#0B1E5B]"
                      }`}
                    >
                      AI Summaries
                    </h4>

                    <p className="text-gray-500 text-sm">
                      Generate concise summaries instantly.
                    </p>
                  </div>

                  <div>
                    <h4
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-[#0B1E5B]"
                      }`}
                    >
                      Smart Search
                    </h4>

                    <p className="text-gray-500 text-sm">
                      Search across all uploaded documents.
                    </p>
                  </div>

                  <div>
                    <h4
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-[#0B1E5B]"
                      }`}
                    >
                      Knowledge Chat
                    </h4>

                    <p className="text-gray-500 text-sm">
                      Ask questions directly from your documents.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <div
            className="relative"
            onMouseEnter={() => setShowAbout(true)}
            onMouseLeave={() => setShowAbout(false)}
          >
            <button
              className={`flex items-center gap-1 text-xl font-medium transition ${
                darkMode
                  ? "text-white hover:text-cyan-400"
                  : "text-[#0B1E5B] hover:text-blue-500"
              }`}
            >
              About
              <ChevronDown size={18} />
            </button>

            {showAbout && (
              <div
                className={`absolute top-12 left-1/2 -translate-x-1/2 w-80 rounded-2xl backdrop-blur-2xl p-5 shadow-2xl border ${
                  darkMode
                    ? "bg-[#09175f]/95 border-white/10"
                    : "bg-white/90 border-gray-200"
                }`}
              >
                <h3 className="text-cyan-500 font-semibold mb-5">
                  About ContextFlow AI
                </h3>

                <p
                  className={`text-sm ${
                    darkMode ? "text-white" : "text-[#0B1E5B]"
                  }`}
                >
                  ContextFlow AI transforms static documents into
                  intelligent, searchable knowledge. Upload files,
                  generate AI summaries, search instantly and chat
                  with your documents.
                </p>

                <div className="mt-4 border-t pt-4 border-gray-200">
                  <p className="text-cyan-500 text-sm">
                    Built for students, researchers and enterprise teams.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Login */}
          <Link
            to="/login"
            className={`text-xl font-medium transition ${
              darkMode
                ? "text-white hover:text-cyan-400"
                : "text-[#0B1E5B] hover:text-blue-500"
            }`}
          >
            Login
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-24 h-12 rounded-full border transition-all duration-300 ${
              darkMode
                ? "bg-white/10 border-white/20"
                : "bg-white border-gray-300 shadow-md"
            }`}
          >
            <div
              className={`absolute top-1 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 flex items-center justify-center text-white ${
                darkMode ? "left-12" : "left-1"
              }`}
            >
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </div>
          </button>
        </div>

        {/* Get Started */}
        <Link
          to="/register"
          className="hidden lg:flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_35px_rgba(99,102,241,0.45)]"
        >
          Get Started →
        </Link>

      </nav>
    </header>
  );
}