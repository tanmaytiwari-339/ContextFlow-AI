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

export default function Footer({ lightMode }) {
  return (
    <footer
      className={`relative overflow-hidden w-full transition-all duration-500 ${
        lightMode
          ? "bg-white/20 backdrop-blur-xl text-slate-800 border-t border-slate-200/60"
          : "bg-[#020B3F] text-white"
      }`}
    >
      {/* Top Feature Bar */}
<div className="max-w-7xl mx-auto px-6 pt-8">
  <div
    className={`flex flex-wrap justify-center items-center gap-6 rounded-full px-8 py-5 backdrop-blur-xl ${
      lightMode
        ? "bg-white/80 border border-slate-200 shadow-xl"
        : "bg-[#0A1460]/80 border border-cyan-500/20 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
    }`}
  >
    <div className="flex items-center gap-3">
      <ShieldCheck size={22} className="text-cyan-400" />
      <span className="text-sm md:text-base font-medium">
        Secure & Private
      </span>
    </div>

    <div
      className={`hidden md:block h-6 w-px ${
        lightMode ? "bg-slate-300" : "bg-white/10"
      }`}
    />

    <div className="flex items-center gap-3">
      <FileText size={22} className="text-cyan-400" />
      <span className="text-sm md:text-base font-medium">
        Works with all formats
      </span>
    </div>

    <div
      className={`hidden md:block h-6 w-px ${
        lightMode ? "bg-slate-300" : "bg-white/10"
      }`}
    />

    <div className="flex items-center gap-3">
      <Users size={22} className="text-purple-400" />
      <span className="text-sm md:text-base font-medium">
        Built for Teams
      </span>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">

          {/* Upload */}
          <Link
            to="/upload"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 shadow-[0_0_40px_rgba(59,130,246,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-300">
              <UploadCloud size={40} className="text-cyan-500" />
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                lightMode ? "text-slate-900" : "text-white"
              }`}
            >
              Upload Documents
            </h3>

            <p
              className={`leading-relaxed ${
                lightMode ? "text-slate-700" : "text-gray-400"
              }`}
            >
              Easily upload and organize PDFs, DOCX, PPT and Excel files.
            </p>
          </Link>

          {/* AI Summary */}
          <Link
            to="/summaries"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-[0_0_40px_rgba(168,85,247,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] transition-all duration-300">
              <Sparkles size={40} className="text-purple-500" />
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                lightMode ? "text-slate-900" : "text-white"
              }`}
            >
              AI Summaries
            </h3>

            <p
              className={`leading-relaxed ${
                lightMode ? "text-slate-700" : "text-gray-400"
              }`}
            >
              Instantly generate concise summaries and key insights.
            </p>
          </Link>

          {/* Search */}
          <Link
            to="/search"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 shadow-[0_0_40px_rgba(34,211,238,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] transition-all duration-300">
              <Search size={40} className="text-cyan-500" />
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                lightMode ? "text-slate-900" : "text-white"
              }`}
            >
              Smart Search
            </h3>

            <p
              className={`leading-relaxed ${
                lightMode ? "text-slate-700" : "text-gray-400"
              }`}
            >
              Find information instantly across all your documents.
            </p>
          </Link>

          {/* Chat */}
          <Link
            to="/chat"
            className="group block hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-5 rounded-3xl flex items-center justify-center border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-purple-500/10 shadow-[0_0_40px_rgba(139,92,246,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] transition-all duration-300">
              <MessageCircle size={40} className="text-violet-500" />
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                lightMode ? "text-slate-900" : "text-white"
              }`}
            >
              Knowledge Chat
            </h3>

            <p
              className={`leading-relaxed ${
                lightMode ? "text-slate-700" : "text-gray-400"
              }`}
            >
              Chat with your documents and get contextual answers.
            </p>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-14 pt-6 border-t ${
            lightMode ? "border-slate-200" : "border-white/10"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p
              className={`text-sm ${
                lightMode ? "text-slate-600" : "text-gray-400"
              }`}
            >
              © 2026 ContextFlow AI. All rights reserved.
            </p>

            <div
              className={`flex gap-6 text-sm ${
                lightMode ? "text-slate-600" : "text-gray-400"
              }`}
            >
              <Link
                to="/privacy"
                className={`transition ${
                  lightMode
                    ? "hover:text-blue-700"
                    : "hover:text-white"
                }`}
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className={`transition ${
                  lightMode
                    ? "hover:text-blue-700"
                    : "hover:text-white"
                }`}
              >
                Terms
              </Link>

              <Link
                to="/contact"
                className={`transition ${
                  lightMode
                    ? "hover:text-blue-700"
                    : "hover:text-white"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Glows */}
      <div
        className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[120px] ${
          lightMode
            ? "bg-blue-300/20"
            : "bg-blue-500/20"
        }`}
      />

      <div
        className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] ${
          lightMode
            ? "bg-purple-300/20"
            : "bg-purple-500/20"
        }`}
      />
    </footer>
  );
}