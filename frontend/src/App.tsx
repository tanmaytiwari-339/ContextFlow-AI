import React, { useEffect, useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { SearchModal } from './components/common/SearchModal';
import { LandingPage } from './components/landing/LandingPage';
import { EmployeeDashboard } from './components/employee/EmployeeDashboard';
import { EmployeeDocuments } from './components/employee/EmployeeDocuments';
import { KnowledgeChat } from './components/employee/KnowledgeChat';
import { DocumentDetail } from './components/employee/DocumentDetail';
import { EmployeeProfile } from './components/employee/EmployeeProfile';
import { EmployeeActivity } from './components/employee/EmployeeActivity';
import { AdminPage } from './components/admin/AdminPage';
import { INITIAL_DOCUMENTS, INITIAL_EMPLOYEES } from './data/mockData';
import { EmployeeView, DocumentItem, EmployeeItem } from './types';
import api from './api/axios';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPortal, setCurrentPortal] = useState<'employee' | 'admin'>('employee');

  const [currentUser, setCurrentUser] = useState<EmployeeItem>(
    INITIAL_EMPLOYEES.find((e) => e.empId === 'EMP1005') || INITIAL_EMPLOYEES[0]
  );

  const [activeEmployeeView, setActiveEmployeeView] =
    useState<EmployeeView>('dashboard');

  const [documents, setDocuments] =
    useState<DocumentItem[]>(INITIAL_DOCUMENTS);

  const [selectedDocId, setSelectedDocId] = useState<string>('doc-1');

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch documents from backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/api/documents');

        const backendDocuments = response.data;

        const mappedDocuments: DocumentItem[] = backendDocuments.map(
          (doc: any) => ({
            id: String(doc.id),
            name: doc.fileName,

            type: doc.fileName.toLowerCase().endsWith('.pdf')
              ? 'PDF'
              : doc.fileName.toLowerCase().endsWith('.docx')
              ? 'DOCX'
              : doc.fileName.toLowerCase().endsWith('.doc')
              ? 'DOC'
              : doc.fileName.toLowerCase().endsWith('.xlsx')
              ? 'XLSX'
              : 'OTHER',

            category: 'General',
            department: 'Organization',
            uploadedBy: 'Admin',
            uploadDate: 'Recently',

            status:
              doc.status === 'UPLOADED'
                ? 'Ready'
                : 'Processing',

            summary: doc.summary,
            hasSummary: doc.hasSummary,
            accessScope: 'Authorized Employees',

            fileSize: `${(doc.fileSize / 1024 / 1024).toFixed(2)} MB`,
          })
        );

        setDocuments(mappedDocuments);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
      }
    };

    if (isAuthenticated && currentPortal === 'employee') {
      fetchDocuments();
    }
  }, [isAuthenticated, currentPortal]);

  const selectedDocument =
    documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleOpenDocDetail = (docId: string) => {
    setSelectedDocId(docId);
    setActiveEmployeeView('document-detail');
  };

  const handleLogin = (
    user: EmployeeItem,
    portal: 'employee' | 'admin' = 'employee'
  ) => {
    setCurrentUser(user);
    setCurrentPortal(portal);
    setIsAuthenticated(true);
    setActiveEmployeeView('dashboard');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPortal('employee');
  };

  // If user is not yet logged in
  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  // If user logged in as Admin
  if (currentPortal === 'admin') {
    return (
      <AdminPage
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />
    );
  }

  // Employee workspace
  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? 'dark bg-slate-900 text-slate-100'
          : 'bg-[#F4F7FB] text-slate-800'
      }`}
    >
      {/* Top Navbar */}
      <Header
        currentUser={currentUser}
        activeEmployeeView={activeEmployeeView}
        setActiveEmployeeView={setActiveEmployeeView}
        onOpenSearch={() => setIsSearchOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onSignOut={handleSignOut}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main App Container */}
      <div className="flex relative overflow-x-hidden min-h-[calc(100vh-4rem)]">

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-2xs z-20 lg:hidden transition-opacity"
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar */}
        <Sidebar
          activeEmployeeView={activeEmployeeView}
          setActiveEmployeeView={(view) => {
            setActiveEmployeeView(view);

            if (window.innerWidth < 1024) {
              setIsSidebarOpen(false);
            }
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-7 overflow-y-auto max-w-7xl mx-auto w-full transition-all duration-300">

          {/* Dashboard */}
          {activeEmployeeView === 'dashboard' && (
            <EmployeeDashboard
              currentUser={currentUser}
              documents={documents}
              onNavigateToDocs={() =>
                setActiveEmployeeView('documents')
              }
              onNavigateToChat={() =>
                setActiveEmployeeView('knowledge-chat')
              }
              onNavigateToDocDetail={handleOpenDocDetail}
              onNavigateToActivity={() =>
                setActiveEmployeeView('activity')
              }
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}

          {/* Documents */}
          {activeEmployeeView === 'documents' && (
            <EmployeeDocuments
              documents={documents}
              currentUser={currentUser}
              onOpenDocDetail={handleOpenDocDetail}
              onNavigateHome={() =>
                setActiveEmployeeView('dashboard')
              }
              onUploadDocument={(newDoc) => {
                setDocuments((prev) => [newDoc, ...prev]);
              }}
            />
          )}

          {/* Document Detail */}
          {activeEmployeeView === 'document-detail' && (
            <DocumentDetail
              document={selectedDocument}
              onBackToDocs={() =>
                setActiveEmployeeView('documents')
              }
              onNavigateToChatWithQuery={(q) => {
                setActiveEmployeeView('knowledge-chat');
              }}
            />
          )}

          {/* Knowledge Chat */}
          {activeEmployeeView === 'knowledge-chat' && (
            <KnowledgeChat
              onOpenDocDetail={handleOpenDocDetail}
            />
          )}

          {/* Activity */}
          {activeEmployeeView === 'activity' && (
            <EmployeeActivity
              onNavigateToDoc={handleOpenDocDetail}
            />
          )}

          {/* Profile */}
          {activeEmployeeView === 'profile' && (
            <EmployeeProfile
              currentUser={currentUser}
            />
          )}

        </main>
      </div>

      {/* Global Search Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        onSelectDoc={(doc) => {
          setSelectedDocId(doc.id);
          setActiveEmployeeView('document-detail');
        }}
        onSelectEmployee={() => {
          setActiveEmployeeView('profile');
        }}
      />
    </div>
  );
}

export default App;

