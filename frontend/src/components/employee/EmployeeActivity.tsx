import React from 'react';
import {
  Clock,
  FileText,
  MessageSquare,
  Search,
  Download,
  Calendar,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
// import { Docs3DBannerGraphic } from '../common/Illustrations';

export const EmployeeActivity: React.FC<{ onNavigateToDoc: (id: string) => void }> = ({ onNavigateToDoc }) => {
  const activities = [
    {
      type: 'view',
      title: 'Viewed Company Leave Policy.pdf',
      docId: 'doc-1',
      category: 'HR Policies',
      timestamp: 'Today, 10:24 AM',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'chat',
      title: 'Knowledge Chat: "What is our work-from-home policy?"',
      category: 'AI Assistant',
      timestamp: 'Today, 09:15 AM',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      type: 'search',
      title: 'Searched for "Maternity leave and health insurance"',
      category: 'Search',
      timestamp: 'Yesterday, 04:32 PM',
      icon: Search,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50'
    },
    {
      type: 'download',
      title: 'Downloaded Engineering Guidelines.docx',
      docId: 'doc-2',
      category: 'Engineering',
      timestamp: 'Sep 10, 2025, 02:15 PM',
      icon: Download,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      type: 'view',
      title: 'Viewed Remote Work Policy.pdf',
      docId: 'doc-4',
      category: 'Policy',
      timestamp: 'Sep 08, 2025, 11:30 AM',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/50 to-indigo-50/80 border border-blue-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-2xs">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            My Activity
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Track your document access history, search logs, and AI conversations.
          </p>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Recent Interactions
          </h3>
          <span className="text-xs font-semibold text-slate-400">
            Showing last 30 days
          </span>
        </div>

        <div className="space-y-3">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                onClick={() => act.docId && onNavigateToDoc(act.docId)}
                className={`p-4 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex items-center justify-between group ${
                  act.docId ? 'cursor-pointer' : ''
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl ${act.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${act.color}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                      {act.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {act.category} · {act.timestamp}
                    </p>
                  </div>
                </div>

                {act.docId && (
                  <span className="text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    View Doc <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
