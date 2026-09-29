import React from 'react';
import {
  FileText,
  MessageSquare,
  Sparkles,
  Search,
  Clock,
  ChevronRight,
  Shield,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { DocumentItem, EmployeeItem } from '../../types';

interface EmployeeDashboardProps {
  currentUser?: EmployeeItem;
  documents: DocumentItem[];
  onNavigateToDocs: () => void;
  onNavigateToChat: () => void;
  onNavigateToDocDetail: (docId: string) => void;
  onNavigateToActivity: () => void;
  onOpenSearch: () => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  currentUser,
  documents,
  onNavigateToDocs,
  onNavigateToChat,
  onNavigateToDocDetail,
  onNavigateToActivity,
  onOpenSearch,
}) => {
  const stats = [
    {
      label: 'Accessible Documents',
      value: String(documents.length),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/80',
    },
    {
      label: 'AI Chats',
      value: '18',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50/80',
    },
    {
      label: 'AI Summaries',
      value: String(documents.filter((doc) => doc.hasSummary).length),
      icon: Sparkles,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/80',
    },
    {
      label: 'Recent Searches',
      value: '7',
      icon: Search,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50/80',
    },
  ];

  const recentDocs = documents.slice(0, 5).map((doc) => ({
    id: doc.id,
    name: doc.name,
    type: doc.type,
    category: doc.category,
    dept: doc.department,
    time: doc.uploadDate,
    color:
      doc.type === 'PDF'
        ? 'bg-red-500'
        : doc.type === 'DOCX' || doc.type === 'DOC'
        ? 'bg-blue-600'
        : doc.type === 'XLSX'
        ? 'bg-emerald-600'
        : 'bg-slate-500',
  }));

  const recentSummaries = documents
    .filter((doc) => doc.hasSummary)
    .slice(0, 3)
    .map((doc) => ({
      id: doc.id,
      name: doc.name,
      snippet: doc.summary || 'No summary available.',
      time: doc.uploadDate,
    }));

  const recentChats = [
    { title: 'What is our work-from-home policy?', time: '2 hours ago' },
    { title: 'Leave encashment rules', time: '1 day ago' },
    { title: 'Performance review process', time: '2 days ago' },
    { title: 'How to apply for maternity leave?', time: '3 days ago' },
    { title: 'IT security guidelines', time: '4 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Greeting Banner with 3D Documents Background Image */}
      <div 
        className="relative overflow-hidden rounded-2xl border border-blue-200/80 shadow-2xs p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between min-h-[170px] md:min-h-[190px] bg-cover bg-no-repeat bg-right"
        style={{ backgroundImage: `url('/dashboard-banner.svg')` }}
      >
        {/* Soft frosted glass scrim behind greeting text on the left for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none md:w-3/5" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/90 border border-blue-200 text-[11px] font-bold text-blue-700 mb-2">
            <span>Good Morning</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2 drop-shadow-2xs">
            {currentUser?.name || 'Tanmay Tiwari'} <span className="animate-wiggle">👋</span>
          </h1>
          <p className="text-xs font-semibold text-slate-700 mt-1">
            {currentUser?.department || 'Engineering'} Department <span className="text-slate-400">·</span> {currentUser?.position || 'Software Developer'}
          </p>
          <p className="text-xs italic text-slate-500 mt-2 font-serif">
            “Knowledge empowers better decisions.”
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-shadow"
            >
              <div className={`w-11 h-11 rounded-xl ${s.bgColor} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-black text-slate-900 tabular-nums">
                  {s.value}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Documents & Summaries */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recently Accessed Documents */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Recently Accessed Documents
                  </h3>
                  <button
                    onClick={onNavigateToDocs}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                  >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-3 divide-y divide-slate-50">
                  {recentDocs.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => onNavigateToDocDetail(doc.id)}
                      className="py-2.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-xl cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-md ${doc.color} text-white flex items-center justify-center text-[9px] font-bold shrink-0 shadow-2xs`}
                        >
                          {doc.type}
                        </div>
                        <div className="max-w-[170px] sm:max-w-xs">
                          <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600">
                            {doc.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {doc.category} <span className="text-slate-300">·</span> {doc.dept}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] text-slate-400 font-medium">
                          {doc.time}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Knowledge Chat Card */}
            <div className="bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-indigo-50/70 rounded-2xl p-6 border border-blue-100/90 shadow-2xs flex flex-col justify-between items-center text-center relative overflow-hidden">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  AI Knowledge Chat
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Ask anything about your authorized documents using AI.
                </p>
              </div>

              {/* Graphic in center */}
              <div className="my-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 flex items-center justify-center text-white">
                  <MessageSquare className="w-9 h-9" />
                </div>
                {/* Floating sparkles */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-amber-500">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={onNavigateToChat}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Knowledge Chat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-slate-400" />
                  <span>Answers are generated from documents you are authorized to access.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Recent Summaries Section */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Recent Summaries
              </h3>
              <button
                onClick={onNavigateToDocs}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-50">
              {recentSummaries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateToDocDetail(item.id)}
                  className="py-3 px-2 rounded-xl hover:bg-slate-50/80 cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {item.snippet}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-4">
                    <span className="text-[11px] text-slate-400">{item.time}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Chats, Quick Actions & Quote Card */}
        <div className="space-y-6">
          {/* Recent Chats Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Recent Chats</h3>
              <button
                onClick={onNavigateToChat}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-50">
              {recentChats.map((c, i) => (
                <div
                  key={i}
                  onClick={onNavigateToChat}
                  className="py-2.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 truncate max-w-[180px]">
                      {c.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {c.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions 2x2 */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider px-1">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onNavigateToDocs}
                className="p-3.5 bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-2xs transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                  Browse Documents
                </span>
              </button>

              <button
                onClick={onNavigateToChat}
                className="p-3.5 bg-white hover:bg-purple-50/50 border border-slate-200/80 hover:border-purple-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-2xs transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700">
                  New Chat
                </span>
              </button>

              <button
                onClick={onOpenSearch}
                className="p-3.5 bg-white hover:bg-sky-50/50 border border-slate-200/80 hover:border-sky-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-2xs transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Search className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700">
                  Search Documents
                </span>
              </button>

              <button
                onClick={onNavigateToActivity}
                className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-2xs transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700">
                  View My Activity
                </span>
              </button>
            </div>
          </div>

          {/* Inspirational Card: Mountain Landscape from Image 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-100/90 via-purple-100/70 to-indigo-200/90 p-6 border border-indigo-200 text-center shadow-2xs min-h-[160px] flex flex-col justify-center items-center">
            {/* Mountain vector silhouette */}
            <svg
              className="absolute bottom-0 inset-x-0 w-full h-24 text-indigo-400/40 pointer-events-none"
              viewBox="0 0 400 120"
              fill="currentColor"
              preserveAspectRatio="none"
            >
              <path d="M0,120 L0,80 L70,30 L150,90 L230,20 L320,75 L400,35 L400,120 Z" />
              <path
                d="M0,120 L0,95 L90,55 L180,105 L260,45 L350,85 L400,60 L400,120 Z"
                fill="currentColor"
                opacity="0.6"
              />
            </svg>

            <div className="relative z-10 space-y-2">
              <p className="text-sm font-bold text-slate-800 italic leading-snug">
                “A more informed team builds a stronger tomorrow.”
              </p>
              <p className="text-[11px] font-semibold text-indigo-700 tracking-wider">
                ContextFlow AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
