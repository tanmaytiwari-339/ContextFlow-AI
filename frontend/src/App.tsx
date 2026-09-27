import React, { useState } from 'react';
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
import { INITIAL_DOCUMENTS, INITIAL_EMPLOYEES } from './data/mockData';
import { EmployeeView, DocumentItem, EmployeeItem } from './types';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<EmployeeItem>(INITIAL_EMPLOYEES[0]);
  const [activeEmployeeView, setActiveEmployeeView] = useState<EmployeeView>('dashboard');
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-1');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const selectedDocument = documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleOpenDocDetail = (docId: string) => {
    setSelectedDocId(docId);
    setActiveEmployeeView('document-detail');
  };

  const handleLogin = (employee: EmployeeItem) => {
    setCurrentUser(employee);
    setIsAuthenticated(true);
    setActiveEmployeeView('dashboard');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  // If user is not yet logged in, display the SaaS landing page with login details
  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  // Once authenticated, navigate directly to their personal employee dashboard & workspace
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-[#F4F7FB] text-slate-800'}`}>
      {/* Top Navbar */}
      <Header
        currentUser={currentUser}
        activeEmployeeView={activeEmployeeView}
        setActiveEmployeeView={setActiveEmployeeView}
        onOpenSearch={() => setIsSearchOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onSignOut={handleSignOut}
      />

      {/* Main App Container */}
      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar
          activeEmployeeView={activeEmployeeView}
          setActiveEmployeeView={setActiveEmployeeView}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-7 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeEmployeeView === 'dashboard' && (
            <EmployeeDashboard
              currentUser={currentUser}
              onNavigateToDocs={() => setActiveEmployeeView('documents')}
              onNavigateToChat={() => setActiveEmployeeView('knowledge-chat')}
              onNavigateToDocDetail={handleOpenDocDetail}
              onNavigateToActivity={() => setActiveEmployeeView('activity')}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}

          {activeEmployeeView === 'documents' && (
            <EmployeeDocuments
              documents={documents}
              onOpenDocDetail={handleOpenDocDetail}
              onNavigateHome={() => setActiveEmployeeView('dashboard')}
            />
          )}

          {activeEmployeeView === 'document-detail' && (
            <DocumentDetail
              document={selectedDocument}
              onBackToDocs={() => setActiveEmployeeView('documents')}
              onNavigateToChatWithQuery={(q) => {
                setActiveEmployeeView('knowledge-chat');
              }}
            />
          )}

          {activeEmployeeView === 'knowledge-chat' && (
            <KnowledgeChat onOpenDocDetail={handleOpenDocDetail} />
          )}

          {activeEmployeeView === 'activity' && (
            <EmployeeActivity onNavigateToDoc={handleOpenDocDetail} />
          )}

          {activeEmployeeView === 'profile' && <EmployeeProfile currentUser={currentUser} />}
        </main>
      </div>

      {/* Global Search Dialog (Ctrl + K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
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
