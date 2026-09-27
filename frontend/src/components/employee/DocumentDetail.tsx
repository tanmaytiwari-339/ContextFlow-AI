import React, { useState } from 'react';
import {
  FileText,
  RotateCw,
  Lightbulb,
  CheckCircle2,
  MessageSquare,
  Shield,
  Download,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronLeft,
  Calendar,
  Layers,
  Sparkles,
  Check,
  Lock,
  Hash
} from 'lucide-react';
import { DocumentItem } from '../../types';

type MotionProps<T> = React.HTMLAttributes<T> & {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  layoutId?: string;
};

const motion = {
  div: ({ initial, animate, exit, transition, layoutId, ...props }: MotionProps<HTMLDivElement>) => <div {...props} />,
  span: ({ initial, animate, exit, transition, layoutId, ...props }: MotionProps<HTMLSpanElement>) => <span {...props} />,
};

const AnimatePresence: React.FC<{ children: React.ReactNode; mode?: string }> = ({ children }) => <>{children}</>;

interface DocumentDetailProps {
  document: DocumentItem;
  onBackToDocs: () => void;
  onNavigateToChatWithQuery: (q: string) => void;
}

export const DocumentDetail: React.FC<DocumentDetailProps> = ({
  document,
  onBackToDocs,
  onNavigateToChatWithQuery,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'view' | 'details' | 'related'>('summary');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      showToast('AI summary regenerated with newest semantic embeddings.');
    }, 850);
  };

  const promptQuestions = [
    'How many days of annual leave are allowed?',
    'What is the maternity leave policy?',
    'How to apply for leave?',
    'Can leave be encashed?'
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-8 z-50 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={onBackToDocs}
          className="hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Documents</span>
        </button>
        <span>&gt;</span>
        <span className="text-slate-900 font-bold truncate max-w-sm">{document.name}</span>
      </div>

      {/* Document Overview Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0 ${
              document.type === 'PDF'
                ? 'bg-red-500'
                : document.type === 'XLSX'
                ? 'bg-emerald-600'
                : 'bg-blue-600'
            }`}
          >
            {document.type}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                {document.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ready
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {document.category} <span className="text-slate-300">·</span> {document.department} Department
            </p>

            <p className="text-xs text-slate-600 max-w-2xl pt-1">
              {document.description || "Company's official leave policy covering types of leave, eligibility, application process and general guidelines."}
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400 shrink-0 self-start md:self-auto space-y-1">
          <p>Uploaded on {document.uploadDate}</p>
          <p className="font-semibold text-slate-600">by {document.uploadedBy} Department</p>
          <div className="flex items-center justify-end gap-1 text-[11px] text-blue-600 font-mono">
            <Hash className="w-3 h-3" />
            <span>ID: {document.id}</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-5 border-b border-slate-200 px-2 text-xs font-bold text-slate-500 overflow-x-auto">
        <button
          onClick={() => setActiveTab('summary')}
          className={`pb-3 relative transition-colors cursor-pointer shrink-0 ${
            activeTab === 'summary' ? 'text-blue-600' : 'hover:text-slate-800'
          }`}
        >
          Summary
          {activeTab === 'summary' && (
            <motion.span layoutId="docTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('view')}
          className={`pb-3 relative transition-colors cursor-pointer shrink-0 ${
            activeTab === 'view' ? 'text-blue-600' : 'hover:text-slate-800'
          }`}
        >
          Document View
          {activeTab === 'view' && (
            <motion.span layoutId="docTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('details')}
          className={`pb-3 relative transition-colors cursor-pointer shrink-0 ${
            activeTab === 'details' ? 'text-blue-600' : 'hover:text-slate-800'
          }`}
        >
          Details & Audit
          {activeTab === 'details' && (
            <motion.span layoutId="docTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('related')}
          className={`pb-3 relative transition-colors cursor-pointer shrink-0 ${
            activeTab === 'related' ? 'text-blue-600' : 'hover:text-slate-800'
          }`}
        >
          Related Documents
          {activeTab === 'related' && (
            <motion.span layoutId="docTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Main Grid: Left Tab Content & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'summary' && (
              <motion.div
                key="tab-summary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                {/* AI Generated Summary Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          AI Generated Summary
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Synthesized key insights from semantic embeddings
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                      <span>Regenerate Summary</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {document.summaryText || "This document outlines the company's leave policy, including types of leave, eligibility criteria, application process, approval workflow, and important guidelines. It covers annual leave, sick leave, maternity and paternity leave, and special leave. Employees must apply for leave through the HR portal and get manager approval."}
                  </p>

                  {/* Key Takeaways Box */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <Lightbulb className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        Key Policy Takeaways
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-700">
                      {(document.keyTakeaways || [
                        'Employees are entitled to 20 days of annual leave per calendar year.',
                        'Sick leave requires medical certification for absences exceeding 3 consecutive days.',
                        'Parental leave options include 26 weeks maternity and 2 weeks paternity entitlements.',
                        'All leave requests must be logged through the internal portal with at least 48 hours notice.',
                        'Unutilized leave balance can be carried forward up to 10 days into the subsequent year.'
                      ]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Ask About This Document Box */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Ask About This Document
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Interactive queries grounded in this specific document
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateToChatWithQuery(`Tell me more about ${document.name}`)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open in Knowledge Chat</span>
                      <span>&rarr;</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {promptQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigateToChatWithQuery(q)}
                        className="text-xs bg-blue-50/70 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1.5 rounded-full border border-blue-200/60 transition-colors cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'view' && (
              <motion.div
                key="tab-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Preview: {document.name} (Page 1 of {document.pages || 14})
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">100% Zoom · High-DPI</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-8 min-h-[420px] flex flex-col items-center justify-center border border-dashed border-slate-200 text-center">
                  <FileText className="w-12 h-12 text-blue-500 mb-3" />
                  <h4 className="text-sm font-bold text-slate-800">Enterprise Document Viewer</h4>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Grounded PDF render engine with live semantic highlighter, citation markers, and export support.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => showToast('Full screen reader triggered.')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Expand Full Viewport
                    </button>
                    <button
                      onClick={() => showToast(`Downloading ${document.name}...`)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Document</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="tab-details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4"
              >
                <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Cryptographic Metadata & Classification</span>
                  <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    STATUS: AUDITED
                  </span>
                </h3>
                <dl className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <dt className="text-slate-400 font-medium">Document ID</dt>
                    <dd className="font-semibold text-slate-800 font-mono mt-0.5">{document.id}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">SHA-256 Checksum</dt>
                    <dd className="font-semibold text-slate-800 font-mono mt-0.5 truncate">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Compliance Classification</dt>
                    <dd className="font-semibold text-slate-800 mt-0.5">Corporate Internal · Tier-2 Protected</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Encryption Standard</dt>
                    <dd className="font-semibold text-slate-800 mt-0.5">AES-256-GCM Envelope Encryption</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Access Scope Policy</dt>
                    <dd className="font-semibold text-blue-600 mt-0.5">{document.accessScope}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Next Audit Review</dt>
                    <dd className="font-semibold text-slate-800 mt-0.5">Annual (Aug 2026)</dd>
                  </div>
                </dl>
              </motion.div>
            )}

            {activeTab === 'related' && (
              <motion.div
                key="tab-related"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4"
              >
                <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Related Corporate Documents
                </h3>
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">PDF</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Remote Work & Hybrid Schedule Policy.pdf</p>
                        <p className="text-[10px] text-slate-400">HR Department · 1.4 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Opening Remote Work Policy...')}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      View
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">DOC</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Global Employee Handbook 2025.docx</p>
                        <p className="text-[10px] text-slate-400">HR Department · 2.9 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Opening Employee Handbook...')}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section: Document Information & Actions (1 col) */}
        <div className="space-y-5">
          {/* Document Information Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3.5">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="text-blue-600">ℹ️</span> Document Specifications
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Document Name</span>
                <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                  {document.name}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Type</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  {document.category}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Department</span>
                <span className="font-semibold text-slate-800">{document.department} Department</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Upload Date</span>
                <span className="font-semibold text-slate-800">{document.uploadDate}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Uploaded By</span>
                <span className="font-semibold text-slate-800">{document.uploadedBy} Department</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Ready
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Pages</span>
                <span className="font-semibold text-slate-800 tabular-nums">{document.pages || 14}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">File Size</span>
                <span className="font-semibold text-slate-800 tabular-nums">{document.fileSize || '2.4 MB'}</span>
              </div>
            </div>
          </div>

          {/* Actions List Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 mb-1">Actions</h3>

            <button
              onClick={() => showToast(`Downloading ${document.name}...`)}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download File</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Internal link copied to clipboard.');
              }}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Share (Internal)</span>
            </button>

            <button
              onClick={() => onNavigateToChatWithQuery(`Summarize ${document.name}`)}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
              <span>Ask About This Document</span>
            </button>

            <button
              onClick={() => {
                setIsFavorited(!isFavorited);
                showToast(!isFavorited ? 'Added to your favorites' : 'Removed from favorites');
              }}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
              <span>{isFavorited ? 'Saved in Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>

          {/* Access Controlled Box */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
            <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Access Controlled</p>
              <p className="text-[11px] text-blue-700/90 mt-0.5">
                You can access this document because it is shared with your department scope ({document.accessScope}).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
