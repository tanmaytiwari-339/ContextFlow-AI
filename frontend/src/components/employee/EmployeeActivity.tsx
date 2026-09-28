import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
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
    const [activities, setActivities] = useState<any[]>([]);
    useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await api.get('/api/profile/my-activity');
          setActivities(response.data);
        } catch (error) {
          console.error('Failed to load activities:', error);
        }
      };

      fetchActivities();
    }, []);
  
  const getActivityUI = (activity: any) => {
    switch (activity.action) {
      case 'DOCUMENT_UPLOADED':
        return {
          title: activity.description,
          category: 'Documents',
          timestamp: new Date(activity.createdAt).toLocaleString(),
          icon: FileText,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        };

      case 'DOCUMENT_DOWNLOADED':
        return {
          title: activity.description,
          category: 'Documents',
          timestamp: new Date(activity.createdAt).toLocaleString(),
          icon: Download,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50'
        };

      case 'CHAT_USED':
        return {
          title: activity.description,
          category: 'AI Assistant',
          timestamp: new Date(activity.createdAt).toLocaleString(),
          icon: MessageSquare,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        };

      case 'SEARCHED':
        return {
          title: activity.description,
          category: 'Search',
          timestamp: new Date(activity.createdAt).toLocaleString(),
          icon: Search,
          color: 'text-sky-600',
          bgColor: 'bg-sky-50'
        };

      case 'DOCUMENT_VIEWED':
        return {
          title: activity.description,
          category: 'Documents',
          timestamp: new Date(activity.createdAt).toLocaleString(),
          icon: FileText,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        };

      case 'DOCUMENT_DELETED':
        return {
          title: activity.description,
          category: 'Documents',
          timestamp: new Date(activity.createdAt).toLocaleString(),
          icon: FileText,
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        };

      default:
        return {
          title: activity.description,
          category: 'Activity',
          timestamp: new Date(activity.createdAt).toLocaleString(),
          icon: Clock,
          color: 'text-slate-600',
          bgColor: 'bg-slate-50'
        };
    }
  };
  

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
          {activities.map((activity, idx) => {
            const act = getActivityUI(activity);
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex items-center justify-between group"
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
