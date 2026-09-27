import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { DocumentItem } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';

interface EmployeeDocumentsProps {
  documents: DocumentItem[];
  onOpenDocDetail: (docId: string) => void;
  onNavigateHome: () => void;
}

export const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({
  documents,
  onOpenDocDetail,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'vault'>('table');
  const [isUploadRequestOpen, setIsUploadRequestOpen] = useState(false);
  const [requestDocName, setRequestDocName] = useState('');
  const [requestDept, setRequestDept] = useState('HR');
  const [requestReason, setRequestReason] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [quickInspectDoc, setQuickInspectDoc] = useState<DocumentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Filter docs
  const filtered = documents.filter((doc) => {
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
      { <AnimatePresence>
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
      </AnimatePresence> }

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
            onClick={() => setIsUploadRequestOpen(true)}
            className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Request</span>
          </button>
        </div>
      </div>

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
            <section className="min-h-[540px] rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">Document Vault</h2>
                <p className="text-xs text-slate-500">Browse your accessible documents.</p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => onOpenDocDetail(doc.id)}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50/40"
                  >
                    <FileText className="h-5 w-5 shrink-0 text-blue-600" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-900">{doc.name}</span>
                      <span className="block text-xs text-slate-500">{doc.department} · {doc.type}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
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
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Ready
                      </span>
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
                              <p
                                onClick={() => onOpenDocDetail(doc.id)}
                                className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                              >
                                {doc.name}
                              </p>
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
                              onClick={() => onOpenDocDetail(doc.id)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              title="Summary & 3D Viewer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
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

      {/* Upload Request Modal */}
      <AnimatePresence>
        {isUploadRequestOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Request Document Upload
                </h3>
                <button
                  onClick={() => {
                    setIsUploadRequestOpen(false);
                    setRequestSubmitted(false);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {requestSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Request Sent Successfully!</h4>
                  <p className="text-xs text-slate-500">
                    Your administrator will review the document request for {requestDocName}.
                  </p>
                  <button
                    onClick={() => {
                      setIsUploadRequestOpen(false);
                      setRequestSubmitted(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Document Name / Subject *
                    </label>
                    <input
                      type="text"
                      value={requestDocName}
                      onChange={(e) => setRequestDocName(e.target.value)}
                      placeholder="e.g. Travel Expense Policy 2025"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department
                    </label>
                    <select
                      value={requestDept}
                      onChange={(e) => setRequestDept(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Engineering">Engineering</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Reason for Request
                    </label>
                    <textarea
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      placeholder="Describe why you need access to this document..."
                      rows={3}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsUploadRequestOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (requestDocName.trim()) setRequestSubmitted(true);
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
