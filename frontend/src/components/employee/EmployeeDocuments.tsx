import React, { useState, useRef } from 'react';
import {
  Search,
  Plus,
  Eye,
  Download,
  FileText,
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  Sparkles,
  ArrowUpDown,
  X,
  LayoutGrid,
  List,
  Box,
  ExternalLink,
  MessageSquare,
  Check,
  UploadCloud,
  Upload,
  Trash2,
  AlertCircle,
  FileUp,
  Paperclip,
  Lock,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
//import { ThreeDocumentVault } from '../common/ThreeDocumentVault';
import { DocumentItem, EmployeeItem, DocType } from '../../types';

interface EmployeeDocumentsProps {
  documents: DocumentItem[];
  currentUser?: EmployeeItem;
  onOpenDocDetail: (docId: string) => void;
  onNavigateHome: () => void;
  onUploadDocument?: (newDoc: DocumentItem) => void;
}

export const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({
  documents,
  currentUser,
  onOpenDocDetail,
  onNavigateHome,
  onUploadDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'company' | 'personal'>('all');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'vault'>('table');

  // Employee Personal Document Upload Section
  const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadDocType, setUploadDocType] = useState<DocType>('PDF');
  const [uploadDept, setUploadDept] = useState(currentUser?.department || 'General');
  const [uploadCategory, setUploadCategory] = useState('Personal Notes');
  const [summaryStyle, setSummaryStyle] = useState<'executive' | 'detailed' | 'actions'>('executive');
  const [uploadDescription, setUploadDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [quickInspectDoc, setQuickInspectDoc] = useState<DocumentItem | null>(null);
  const [summaryModalDoc, setSummaryModalDoc] = useState<DocumentItem | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const capitalized = cleanName
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    setUploadFileName(capitalized);

    const ext = file.name.split('.').pop()?.toUpperCase() || '';
    if (ext === 'PDF') setUploadDocType('PDF');
    else if (['DOC', 'DOCX'].includes(ext)) setUploadDocType('DOCX');
    else if (['XLS', 'XLSX', 'CSV'].includes(ext)) setUploadDocType('XLSX');
    else if (['PPT', 'PPTX'].includes(ext)) setUploadDocType('PPTX');
    else setUploadDocType('OTHER');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    setIsUploading(true);
    setUploadProgress(25);

    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(progressTimer);
      setUploadProgress(100);

      const newDocId = `doc-${Date.now()}`;
      const formattedDate = new Date().toISOString().split('T')[0];
      const sizeInMB = uploadedFile
        ? (uploadedFile.size / (1024 * 1024)).toFixed(1) + ' MB'
        : '2.1 MB';

      const cleanDocTitle = uploadFileName.trim();
      const uploaderName = currentUser?.name || 'You';
      const uploaderId = currentUser?.empId || 'EMP1005';
      const userDept = currentUser?.department || uploadDept || 'General';

      const generatedSummary =
        summaryStyle === 'actions'
          ? `Action-oriented breakdown for "${cleanDocTitle}". Prepared exclusively for ${uploaderName}. Identifies direct personal takeaways, execution milestones, and key checkpoints. Stored strictly in your personal workspace.`
          : summaryStyle === 'detailed'
          ? `Comprehensive personal study summary of "${cleanDocTitle}". Analyzes core concepts, contextual foundations, and key definitions for your individual reference. Completely private to your account.`
          : `Executive summary for "${cleanDocTitle}". Synthesizes the primary objectives, core insights, and critical points of this personal document for ${uploaderName}. Stored with strict zero-leak privacy—accessible only to you.`;

      const keyTakeaways = [
        `Strictly private to ${uploaderName} (${uploaderId}) — zero visibility to other employees or public search.`,
        `Automatically processed and summarized with AI for personal study and quick recall.`,
        `Extracted high-priority concepts from ${sizeInMB} (${uploadDocType} format) categorized as ${uploadCategory}.`,
        `Ready for on-demand review, copyable summary export, and personal Q&A.`
      ];

      const newDoc: DocumentItem = {
        id: newDocId,
        name: cleanDocTitle,
        type: uploadDocType,
        category: uploadCategory,
        department: userDept,
        uploadedBy: uploaderName,
        uploaderEmpId: uploaderId,
        isPersonal: true,
        uploadDate: formattedDate,
        status: 'Ready',
        accessScope: 'Personal Only',
        description:
          uploadDescription.trim() ||
          `Personal ${uploadCategory.toLowerCase()} document uploaded by ${uploaderName}. Private to your account.`,
        pages: Math.floor(Math.random() * 8) + 2,
        fileSize: sizeInMB,
        summaryText: generatedSummary,
        keyTakeaways: keyTakeaways,
        docCategory: uploadCategory
      };

      if (onUploadDocument) {
        onUploadDocument(newDoc);
      }

      setTimeout(() => {
        setIsUploading(false);
        setIsUploadSectionOpen(false);
        setUploadedFile(null);
        setUploadFileName('');
        setUploadDescription('');
        setUploadProgress(0);
        showToast(`Personal document "${newDoc.name}" uploaded & summarized!`);
        setSummaryModalDoc(newDoc);
      }, 350);
    }, 850);
  };

  // Filter docs with strict personal privacy enforcement
  const filtered = documents.filter((doc) => {
    // If a document is personal, ONLY show it if it belongs to the logged-in employee!
    const isPersonal = doc.accessScope === 'Personal Only' || doc.isPersonal;
    if (isPersonal) {
      const isMine =
        (currentUser?.empId && doc.uploaderEmpId === currentUser.empId) ||
        (currentUser?.name && doc.uploadedBy === currentUser.name);
      if (!isMine) {
        return false;
      }
    }

    // Filter by Scope tab
    if (scopeFilter === 'personal' && !isPersonal) return false;
    if (scopeFilter === 'company' && isPersonal) return false;

    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === 'All' ||
      (selectedType === 'PDF' && doc.type === 'PDF') ||
      (selectedType === 'Word' && (doc.type === 'DOC' || doc.type === 'DOCX')) ||
      (selectedType === 'Excel' && doc.type === 'XLSX') ||
      (selectedType === 'Other' && !['PDF', 'DOC', 'DOCX', 'XLSX'].includes(doc.type));
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    return matchesSearch && matchesType && matchesDept;
  });

  const myPersonalDocsCount = documents.filter(
    (d) =>
      (d.accessScope === 'Personal Only' || d.isPersonal) &&
      ((currentUser?.empId && d.uploaderEmpId === currentUser.empId) ||
        (currentUser?.name && d.uploadedBy === currentUser.name))
  ).length;

  const toggleSelectAll = () => {
    if (selectedDocs.length === filtered.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filtered.map((d) => d.id));
    }
  };

  const toggleDoc = (id: string) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter((item) => item !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedDept('All');
  };

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

      {/* Breadcrumb & Header with 3D Documents Background Image */}
      <div 
        className="relative overflow-hidden rounded-2xl border border-blue-200/80 shadow-2xs p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between min-h-[170px] md:min-h-[190px] bg-cover bg-no-repeat bg-right"
        style={{ backgroundImage: `url('/dashboard-banner.svg')` }}
      >
        {/* Soft frosted glass scrim behind text on the left for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none md:w-3/5" />

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
            <button onClick={onNavigateHome} className="hover:text-blue-600 transition-colors">
              Home
            </button>
            <span>&gt;</span>
            <span className="text-slate-800 font-bold">Documents</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight drop-shadow-2xs">
            Company Documents
          </h1>
          <p className="text-xs font-semibold text-slate-600 mt-1.5 max-w-md">
            Browse, inspect, and query authorized enterprise documents, policy guidelines, and handbooks.
          </p>
        </div>
      </div>

      {/* Scope Segment Tabs: All, Company Policies, My Personal Documents */}
      <div className="flex items-center gap-2 select-none overflow-x-auto pb-0.5">
        <button
          type="button"
          onClick={() => setScopeFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            scopeFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>All Documents</span>
        </button>

        <button
          type="button"
          onClick={() => setScopeFilter('company')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            scopeFilter === 'company'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Company Policies & Handbooks</span>
        </button>

        <button
          type="button"
          onClick={() => setScopeFilter('personal')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            scopeFilter === 'personal'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>My Personal Documents</span>
          {myPersonalDocsCount > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                scopeFilter === 'personal' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {myPersonalDocsCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[240px] max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by name, content or keyword..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Dropdowns & Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="PDF">PDF Files</option>
            <option value="Word">Word Documents</option>
            <option value="Excel">Excel Sheets</option>
            <option value="Other">Other Formats</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Admin">Admin</option>
            <option value="IT">IT</option>
            <option value="Product">Product</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              title="Grid Cards"
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>

            <button
              onClick={() => setViewMode('vault')}
              title="3D Spatial Vault"
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'vault'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span className="inline font-bold">3D Vault</span>
            </button>
          </div>

          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Clear
          </button>

          <button
            onClick={() => setIsUploadSectionOpen(!isUploadSectionOpen)}
            className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{isUploadSectionOpen ? 'Close Upload' : 'Upload Personal Document'}</span>
          </button>
        </div>
      </div>

      {/* Upload Document Section (Personal Employee Upload & Summarize) */}
      <AnimatePresence>
        {isUploadSectionOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-amber-200/90 shadow-md space-y-5">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      Upload & Summarize Personal Document
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        Private to You Only
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload your personal notes, drafts, reports, or learning files for instant AI summarization. Personal documents are strictly private to your account and will not be visible to other employees.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsUploadSectionOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Privacy Guarantee Banner (Explaining no access scope is required) */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-xl flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-amber-900">Personal & Private Use Only</p>
                  <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                    No access scope needed. This document is saved strictly for your personal use ({currentUser?.name || 'You'}), will only be shown to you, and is automatically summarized with AI upon upload.
                  </p>
                </div>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* Drag & Drop File Zone */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                    accept=".pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.txt,.csv"
                    className="hidden"
                  />

                  {!uploadedFile ? (
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                        dragActive
                          ? 'border-amber-500 bg-amber-50/80 scale-[1.005]'
                          : 'border-slate-300 hover:border-amber-400 bg-slate-50/60 hover:bg-amber-50/20'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs mx-auto flex items-center justify-center text-amber-600 mb-2">
                        <UploadCloud className="w-6 h-6 animate-pulse" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        Drag and drop your personal file here, or{' '}
                        <span className="text-blue-600 underline font-extrabold">browse files</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Supports PDF, Word (DOCX/DOC), Excel (XLSX), PowerPoint (PPTX), and TXT up to 50MB
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {uploadDocType}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{uploadedFile.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for private AI summarization
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs font-semibold text-blue-600 hover:underline px-2 py-1 cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Metadata Fields Grid (NO access scope selector) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Document Title / Name *
                    </label>
                    <input
                      type="text"
                      value={uploadFileName}
                      onChange={(e) => setUploadFileName(e.target.value)}
                      placeholder="e.g. My Q3 Engineering Notes & Study Guide"
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500 focus:bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Format / Type
                    </label>
                    <select
                      value={uploadDocType}
                      onChange={(e) => setUploadDocType(e.target.value as DocType)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500 focus:bg-white font-medium cursor-pointer"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="DOCX">Word Document (.docx)</option>
                      <option value="XLSX">Excel Spreadsheet (.xlsx)</option>
                      <option value="PPTX">Presentation (.pptx)</option>
                      <option value="OTHER">Other Format</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Personal Category
                    </label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500 focus:bg-white font-medium cursor-pointer"
                    >
                      <option value="Personal Notes">Personal Notes</option>
                      <option value="Study Material">Study Material</option>
                      <option value="Research & Drafts">Research & Drafts</option>
                      <option value="Report">Personal Report</option>
                      <option value="Contract / Agreement">Personal Contract / Agreement</option>
                      <option value="Reference Guide">Reference Guide</option>
                      <option value="Other">Other Document</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      AI Summary Focus
                    </label>
                    <select
                      value={summaryStyle}
                      onChange={(e) => setSummaryStyle(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500 focus:bg-white font-medium cursor-pointer"
                    >
                      <option value="executive">Executive Summary (High Level Overview)</option>
                      <option value="detailed">Comprehensive Breakdown (Detailed Sections)</option>
                      <option value="actions">Key Action Items & Checkpoints</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Owner & Privacy Status
                    </label>
                    <div className="px-3 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{currentUser?.name || 'Current Employee'}</span>
                      </span>
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                        Visible to You Only
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Personal Notes / Context (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Add personal notes or context to guide the AI summary..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500 focus:bg-white font-medium"
                  />
                </div>

                {/* Progress Bar when uploading */}
                {isUploading && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                        Extracting content & generating private AI summary...
                      </span>
                      <span className="font-mono">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-amber-200/70 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-600 h-full rounded-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit / Cancel Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Private document · Never shared with coworkers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => setIsUploadSectionOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading || !uploadFileName.trim()}
                      className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Summarizing...' : 'Upload & Summarize Document'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5 Stat Cards with animated hover */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3 cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 tabular-nums">{filtered.length}</p>
            <p className="text-[11px] font-medium text-slate-500">Accessible Files</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3 cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 text-xs font-bold">
            PDF
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 tabular-nums">
              {filtered.filter((d) => d.type === 'PDF').length}
            </p>
            <p className="text-[11px] font-medium text-slate-500">PDF Policies</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3 cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold">
            DOC
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 tabular-nums">
              {filtered.filter((d) => d.type === 'DOCX' || d.type === 'DOC').length}
            </p>
            <p className="text-[11px] font-medium text-slate-500">Word Guides</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3 cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
            XLS
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 tabular-nums">
              {filtered.filter((d) => d.type === 'XLSX').length}
            </p>
            <p className="text-[11px] font-medium text-slate-500">Sheets & Data</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3 cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 text-xs font-bold">
            PPT
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 tabular-nums">
              {filtered.filter((d) => !['PDF', 'DOC', 'DOCX', 'XLSX'].includes(d.type)).length}
            </p>
            <p className="text-[11px] font-medium text-slate-500">Other Assets</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area based on View Mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'vault' ? (
          <motion.div
            key="vault"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* <ThreeDocumentVault
              documents={filtered}
              onOpenDocDetail={onOpenDocDetail}
              className="h-[540px]"
            /> */}
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: Math.min(idx * 0.03, 0.3) }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs ${
                        doc.type === 'PDF'
                          ? 'bg-red-500'
                          : doc.type === 'XLSX'
                          ? 'bg-emerald-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {doc.type}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {(doc.isPersonal || doc.accessScope === 'Personal Only') ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Lock className="w-2.5 h-2.5 text-amber-600" />
                          Private
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Ready
                        </span>
                      )}
                      <button
                        onClick={() => setQuickInspectDoc(doc)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => onOpenDocDetail(doc.id)}
                    className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {doc.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {doc.description || `${doc.category} document for authorized employee access.`}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium border border-purple-100">
                      {doc.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                      {doc.department}
                    </span>
                    <span className="text-slate-400 ml-auto font-mono text-[10px]">
                      {doc.fileSize}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400">Uploaded {doc.uploadDate}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (doc.summaryText) {
                          setSummaryModalDoc(doc);
                        } else {
                          onOpenDocDetail(doc.id);
                        }
                      }}
                      className="px-2 py-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      title="View AI Summary"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Summary</span>
                    </button>
                    <button
                      onClick={() => showToast(`Starting download for ${doc.name}`)}
                      className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      title="Download File"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenDocDetail(doc.id)}
                      className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>Read</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-10">
                      <button onClick={toggleSelectAll} className="flex items-center text-slate-400 hover:text-slate-600">
                        {selectedDocs.length > 0 && selectedDocs.length === filtered.length ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="py-3.5 px-4">Document Name</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4 flex items-center gap-1 cursor-pointer">
                      <span>Upload Date</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filtered.slice(0, 10).map((doc) => {
                    const isSelected = selectedDocs.includes(doc.id);
                    return (
                      <tr
                        key={doc.id}
                        className={`hover:bg-blue-50/40 transition-colors ${
                          isSelected ? 'bg-blue-50/60' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <button onClick={() => toggleDoc(doc.id)} className="text-slate-400 hover:text-slate-600">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${
                                doc.type === 'PDF'
                                  ? 'bg-red-500'
                                  : doc.type === 'DOCX' || doc.type === 'DOC'
                                  ? 'bg-blue-600'
                                  : doc.type === 'XLSX'
                                  ? 'bg-emerald-600'
                                  : 'bg-amber-500'
                              }`}
                            >
                              {doc.type}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p
                                  onClick={() => onOpenDocDetail(doc.id)}
                                  className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                                >
                                  {doc.name}
                                </p>
                                {(doc.isPersonal || doc.accessScope === 'Personal Only') && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                                    <Lock className="w-2.5 h-2.5 text-amber-600" />
                                    Private
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1 max-w-sm">
                                {doc.description || `${doc.category} document for employee review`}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                            {doc.category === 'HR Policies' ? 'Policy' : doc.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600">{doc.department}</td>

                        <td className="py-3.5 px-4 text-slate-500 tabular-nums">
                          {doc.uploadDate}
                        </td>

                        <td className="py-3.5 px-4">
                          {doc.status === 'Ready' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Ready
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              Processing
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => onOpenDocDetail(doc.id)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              title="View Document"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => showToast(`Downloading ${doc.name}...`)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              title="Download"
                            >
                              <Download className="w-3.5 h-3.5 text-blue-600" />
                              <span>Download</span>
                            </button>

                            <button
                              onClick={() => {
                                if (doc.summaryText) {
                                  setSummaryModalDoc(doc);
                                } else {
                                  onOpenDocDetail(doc.id);
                                }
                              }}
                              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                                doc.isPersonal || doc.accessScope === 'Personal Only'
                                  ? 'text-amber-700 hover:text-amber-800 hover:bg-amber-50 font-bold'
                                  : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                              }`}
                              title="View AI Summary"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <span>Summary</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
              <p>
                Showing 1 to {Math.min(10, filtered.length)} of {filtered.length} documents
              </p>

              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50">
                  &lt;
                </button>
                <button className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold">
                  1
                </button>
                <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600">
                  2
                </button>
                <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600">
                  3
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600">
                  &gt;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Inspection Modal */}
      <AnimatePresence>
        {quickInspectDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative"
            >
              <button
                onClick={() => setQuickInspectDoc(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-md ${
                    quickInspectDoc.type === 'PDF'
                      ? 'bg-red-500'
                      : quickInspectDoc.type === 'XLSX'
                      ? 'bg-emerald-600'
                      : 'bg-blue-600'
                  }`}
                >
                  {quickInspectDoc.type}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{quickInspectDoc.name}</h3>
                  <p className="text-xs text-slate-500">
                    {quickInspectDoc.department} Department · {quickInspectDoc.category}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 mb-4 text-xs">
                <p className="text-slate-700 leading-relaxed">
                  {quickInspectDoc.description || 'Enterprise document authorized for your team.'}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                  <div>
                    <span className="text-slate-400">File Size: </span>
                    <strong className="text-slate-700">{quickInspectDoc.fileSize}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Pages: </span>
                    <strong className="text-slate-700">{quickInspectDoc.pages} pages</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setQuickInspectDoc(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = quickInspectDoc.id;
                    setQuickInspectDoc(null);
                    onOpenDocDetail(id);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Open Full Detail & 3D Viewer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Document Summary Modal */}
      <AnimatePresence>
        {summaryModalDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSummaryModalDoc(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Lock className="w-3 h-3 text-amber-600" />
                      Personal & Private Document
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {summaryModalDoc.fileSize || '1.8 MB'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {summaryModalDoc.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Uploaded on {summaryModalDoc.uploadDate} · Visible only to {summaryModalDoc.uploadedBy}
                  </p>
                </div>
              </div>

              {/* Summary Body */}
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    AI Executive Summary
                  </h4>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {summaryModalDoc.summaryText ||
                      `Personal summary for ${summaryModalDoc.name}. This document has been processed and indexed into your private workspace.`}
                  </p>
                </div>

                {summaryModalDoc.keyTakeaways && summaryModalDoc.keyTakeaways.length > 0 && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Key Takeaways & Insights
                    </h4>
                    <ul className="space-y-2">
                      {summaryModalDoc.keyTakeaways.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                          <span className="leading-relaxed font-normal">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2 p-2.5 bg-slate-100/70 rounded-xl text-[11px] text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    Privacy scope: <strong>Shown to you only</strong>. Excluded from company-wide searches and coworker directories.
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const textToCopy = `${summaryModalDoc.name}\n\nSummary:\n${summaryModalDoc.summaryText || ''}\n\nKey Takeaways:\n${summaryModalDoc.keyTakeaways?.join('\n') || ''}`;
                    navigator.clipboard.writeText(textToCopy);
                    setCopiedSummary(true);
                    setTimeout(() => setCopiedSummary(false), 2000);
                  }}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSummaryModalDoc(null)}
                    className="px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const id = summaryModalDoc.id;
                      setSummaryModalDoc(null);
                      onOpenDocDetail(id);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open Full Document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
