import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Users,
  UploadCloud,
  Sparkles,
  Search,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#020B3F] text-white w-full">

      {/* Top Feature Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="flex flex-wrap justify-center items-center gap-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-5">

          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-cyan-400" />
            <span className="text-sm md:text-base">
              Secure & Private
            </span>
          </div>

          <div className="hidden md:block h-6 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <FileText size={22} className="text-cyan-400" />
            <span className="text-sm md:text-base">
              Works with all formats
            </span>
          </div>

          <div className="hidden md:block h-6 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <Users size={22} className="text-purple-400" />
            <span className="text-sm md:text-base">
              Built for Teams
            </span>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          {/* Upload */}
          <Link
            to="/upload"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-all duration-300">
              <UploadCloud size={40} className="text-cyan-400" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Upload Documents
            </h3>

            <p className="text-gray-400 text-base leading-relaxed">
              Easily upload and organize your files in one place.
            </p>
          </Link>

          {/* AI Summary */}
          <Link
            to="/summaries"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-[0_0_40px_rgba(168,85,247,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] transition-all duration-300">
              <Sparkles size={40} className="text-purple-400" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Get AI Summaries
            </h3>

            <p className="text-gray-400 text-base leading-relaxed">
              Instantly extract key insights and summaries.
            </p>
          </Link>

          {/* Search */}
          <Link
            to="/search"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 shadow-[0_0_40px_rgba(34,211,238,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-all duration-300">
              <Search size={40} className="text-cyan-400" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Search Across
            </h3>

            <p className="text-gray-400 text-base leading-relaxed">
              Find information across all your files.
            </p>
          </Link>

          {/* Chat */}
          <Link
            to="/chat"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-purple-500/10 shadow-[0_0_40px_rgba(139,92,246,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all duration-300">
              <MessageCircle size={40} className="text-violet-400" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Chat With Knowledge
            </h3>

            <p className="text-gray-400 text-base leading-relaxed">
              Ask questions and get answers from your documents.
            </p>
          </Link>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-400 text-sm">
              © 2026 ContextFlow AI. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition">
                Privacy
              </Link>

              <Link to="/terms" className="hover:text-white transition">
                Terms
              </Link>

              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />
    </footer>
  );
}