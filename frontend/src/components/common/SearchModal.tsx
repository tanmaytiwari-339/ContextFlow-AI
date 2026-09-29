import React, { useState, useEffect } from 'react';
import { Search, X, FileText, User, ArrowRight, Sparkles } from 'lucide-react';
import { INITIAL_EMPLOYEES } from '../../data/mockData';
import { DocumentItem, EmployeeItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoc: (doc: DocumentItem) => void;
  onSelectEmployee: (emp: EmployeeItem) => void;
  documents: DocumentItem[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoc,
  onSelectEmployee,
  documents,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDocs = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.category.toLowerCase().includes(query.toLowerCase()) ||
      d.department.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredEmps = INITIAL_EMPLOYEES.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.empId.toLowerCase().includes(query.toLowerCase()) ||
      e.department.toLowerCase().includes(query.toLowerCase()) ||
      e.position.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-blue-600 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, people, policies, summaries..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Documents Section */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Documents
            </span>
            <div className="mt-2 space-y-1">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onSelectDoc(doc);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                        doc.type === 'PDF' ? 'bg-red-500' : doc.type === 'DOCX' ? 'bg-blue-600' : 'bg-emerald-600'
                      }`}>
                        {doc.type}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                          {doc.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {doc.category} · {doc.department}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 flex items-center gap-1 font-medium transition-opacity">
                      Open <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 px-2 py-1">No documents matched</p>
              )}
            </div>
          </div>

          {/* Employees Section */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Employees & Teams
            </span>
            <div className="mt-2 space-y-1">
              {filteredEmps.length > 0 ? (
                filteredEmps.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => {
                      onSelectEmployee(emp);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">
                        {emp.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {emp.name} <span className="text-[10px] text-slate-400 font-normal">({emp.empId})</span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {emp.position} · {emp.department}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                      Profile <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 px-2 py-1">No employees found</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with arrows, press ESC to close</span>
          <span className="flex items-center gap-1 text-blue-600 font-medium">
            <Sparkles className="w-3 h-3" /> ContextFlow AI Search
          </span>
        </div>
      </div>
    </div>
  );
};
