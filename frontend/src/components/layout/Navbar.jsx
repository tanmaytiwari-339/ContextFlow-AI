import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "../../assets/images/logo.png"; // adjust filename if needed

export default function Navbar() {
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
            <h1 className="text-white text-3xl font-bold leading-none">
              ContextFlow AI
            </h1>

            <p className="text-cyan-400 text-xs tracking-[4px] mt-1">
              KNOWLEDGE MANAGEMENT
            </p>
          </div>
        </Link>

        {/* Right Side Navigation */}
        <div className="hidden lg:flex items-center gap-10 ml-auto mr-6">

          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowFeatures(true)}
            onMouseLeave={() => setShowFeatures(false)}
          >
            <button className="flex items-center gap-1 text-white text-xl font-medium hover:text-cyan-400 transition">
              Features
              <ChevronDown size={18} />
            </button>

            {showFeatures && (
             <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 rounded-2xl border border-white/10 bg-[#09175f]/95 backdrop-blur-2xl p-5 shadow-2xl transition-all duration-300">

                <h3 className="text-cyan-400 font-semibold mb-5">
                  Platform Features
                </h3>

                <div className="space-y-4">

                  <div>
                    <h4 className="text-white font-medium">
                      Upload Documents
                    </h4>

                    <p className="text-gray-400 text-sm">
                      Upload PDFs, Word, PowerPoint and Excel files.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium">
                      AI Summaries
                    </h4>

                    <p className="text-gray-400 text-sm">
                      Generate concise summaries instantly.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium">
                      Smart Search
                    </h4>

                    <p className="text-gray-400 text-sm">
                      Search across all uploaded documents.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium">
                      Knowledge Chat
                    </h4>

                    <p className="text-gray-400 text-sm">
                      Ask questions directly from your documents.
                    </p>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowAbout(true)}
            onMouseLeave={() => setShowAbout(false)}
          >
            <button className="flex items-center gap-1 text-white text-xl font-medium hover:text-cyan-400 transition">
              About
              <ChevronDown size={18} />
            </button>

            {showAbout && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 rounded-2xl border border-white/10 bg-[#09175f]/95 backdrop-blur-2xl p-5 shadow-2xl transition-all duration-300">
                <h3 className="text-cyan-400 font-semibold mb-5">
                  About ContextFlow AI
                </h3>

                <p className="text-white text-sm">
                 ContextFlow AI is an intelligent document management
                  platform that transforms static files into searchable,
                  interactive knowledge. Upload documents, generate
                  AI-powered summaries, search information instantly,
                  and chat with your knowledge base.
                </p>

                 <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-cyan-400 text-sm">
                    Built for students, researchers and enterprise teams.
                  </p>
                </div>

              </div>
            )}
          </div>

          {/* Login */}
          <Link
            to="/login"
            className="text-white text-xl font-medium hover:text-cyan-400 transition"
          >
            Login
          </Link>
        </div>

        {/* Get Started Button */}
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