import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  FileText,
  Lock,
  ArrowRight,
  Database,
  Layers,
  CheckCircle2,
  Cpu,
  FileCheck,
  Building2,
  Activity,
  ArrowUp,
  BarChart2,
  Terminal,
  Server,
  KeyRound,
  FileSpreadsheet,
  Check
} from 'lucide-react';

interface AppleStyleShowcaseProps {
  onScrollToLogin: () => void;
}

// Reusable scroll reveal section
const ScrollSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-16 scale-[0.98]'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const AppleStyleShowcase: React.FC<AppleStyleShowcaseProps> = ({ onScrollToLogin }) => {
  // State for interactive prompt demo
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showFloatingLogin, setShowFloatingLogin] = useState(false);

  // State for RBAC role simulator
  const [activeRole, setActiveRole] = useState<'engineer' | 'finance' | 'hr' | 'exec'>('engineer');

  // Interactive sample queries
  const queries = [
    {
      question: "What is our international travel policy and approval threshold?",
      docSource: "Global Travel & Expense Policy 2026 · §4.2",
      confidence: "99.8%",
      answer:
        "International business travel requires VP-level signoff 14 days in advance. Economy class is standard for flights under 6 hours; premium economy or business tier applies for transatlantic itineraries exceeding 6 hours with a $120/day per diem.",
      citations: ["Travel_Policy_v4.pdf", "Executive_Expense_Caps.xlsx"],
      latency: "164ms"
    },
    {
      question: "How do we handle proprietary customer data in secondary staging environments?",
      docSource: "Information Security Standard · §12.B",
      confidence: "99.4%",
      answer:
        "Customer PII must be sanitized using synthetic masking seeds before entering non-production staging. Direct database replicas are strictly prohibited and trigger automated security revocation.",
      citations: ["Data_Sanitization_Standard.pdf", "SOC2_Compliance_Matrix.docx"],
      latency: "182ms"
    },
    {
      question: "What are the remote workstation stipend and annual hardware refresh cycle?",
      docSource: "People & Workplace Handbook · Sec 8",
      confidence: "99.9%",
      answer:
        "Full-time distributed employees receive a one-time $1,200 home office grant upon onboarding, followed by an annual $400 ergonomic equipment stipend and a 24-month laptop refresh cycle.",
      citations: ["Remote_Work_Charter.pdf", "IT_Asset_Lifecycle.pdf"],
      latency: "142ms"
    }
  ];

  // Role details for RBAC demo
  const roleData = {
    engineer: {
      title: "Senior Staff Engineer",
      clearance: "Engineering & Architecture",
      allowed: [
        "Core Microservices Architecture Spec (v3.2)",
        "API Security & Token Minting Protocols",
        "Disaster Recovery Runbook 2026",
        "Company Onboarding & Benefits"
      ],
      denied: [
        "Q3 Executive Salary & Bonus Matrix",
        "Confidential M&A Pipeline Briefing",
        "Employee Performance Reviews (HR)"
      ]
    },
    finance: {
      title: "Finance & Accounting Lead",
      clearance: "Financial Operations & Audit",
      allowed: [
        "Q3 Financial Forecast & Runway Report",
        "Corporate Travel & Expense Authorizations",
        "Vendor Procurement & Master Service Agreements",
        "Company Onboarding & Benefits"
      ],
      denied: [
        "Kubernetes Infrastructure Private Keys",
        "Internal Source Code Commits",
        "Engineering Cryptographic Whitepaper"
      ]
    },
    hr: {
      title: "People & Talent Director",
      clearance: "HR & Workplace Confidential",
      allowed: [
        "Global Compensation & Benefits Guide",
        "Workplace Equity & Escalation Protocols",
        "Healthcare & Parental Leave Policy 2026",
        "Company Onboarding & Benefits"
      ],
      denied: [
        "Production Database Schema Dumps",
        "Cloud Infrastructure Billing Access",
        "Hardware Firmware Source Trees"
      ]
    },
    exec: {
      title: "Chief Operating Officer",
      clearance: "Executive Root Scoping",
      allowed: [
        "Company Strategic OKRs & Board Deck",
        "Q3 Financial Forecast & Runway Report",
        "Core Architecture & IP Protection Guidelines",
        "Global Enterprise Security Policies"
      ],
      denied: []
    }
  };

  // Monitor scroll to display floating "Back to Sign In" button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowFloatingLogin(scrollPos > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectQuery = (index: number) => {
    if (index === activeQueryIndex) return;
    setIsTyping(true);
    setTimeout(() => {
      setActiveQueryIndex(index);
      setIsTyping(false);
    }, 280);
  };

  const currentQ = queries[activeQueryIndex];
  const currentRoleInfo = roleData[activeRole];

  return (
    <div className="w-full relative text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      
      {/* Scroll Down Teaser Bar */}
      <div className="w-full py-8 text-center flex flex-col items-center justify-center gap-2 text-slate-400 select-none">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
          Scroll to explore capabilities
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1.5 shadow-2xs">
          <div className="w-1.5 h-2 bg-blue-600 rounded-full animate-bounce" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* CINEMATIC APPLE-STYLE INTRO HEADLINE                      */}
      {/* ========================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
        <ScrollSection>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold tracking-wide uppercase mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Engineered for Modern Enterprise</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Everything your company knows. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
              Instantly at your fingertips.
            </span>
          </h2>

          <p className="mt-7 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            ContextFlow AI synthesizes thousands of internal policies, engineering briefs, and financial sheets into precise, zero-leak enterprise intelligence.
          </p>
        </ScrollSection>
      </section>

      {/* ========================================================= */}
      {/* SHOWCASE 1: THE NEURAL REASONING ENGINE (INTERACTIVE)     */}
      {/* ========================================================= */}
      <section id="capabilities-showcase" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <ScrollSection>
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 lg:p-14 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Context Engine 4.0
              </span>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight mt-2 text-white">
                It doesn’t just search words. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  It understands your company.
                </span>
              </h3>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                Traditional search yields 20 irrelevant links. ContextFlow reads every document, models the relationships between policies, and drafts the exact verifiable answer.
              </p>
            </div>

            {/* Interactive Query Simulator */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Sample Interactive Queries */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  Select a live scenario to test synthesis:
                </span>

                {queries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuery(idx)}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      activeQueryIndex === idx
                        ? 'bg-blue-600/20 border-blue-500/80 text-white shadow-lg shadow-blue-900/30'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs sm:text-sm font-bold leading-snug">
                        "{q.question}"
                      </p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ${
                        activeQueryIndex === idx ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {q.latency}
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>Source: {q.docSource}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Simulated Model Synthesis Output Card */}
              <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-xl">
                <div>
                  {/* Top Bar of Live Model Output */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono font-medium">Neural Retrieval Stream</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-mono">Confidence:</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold font-mono text-xs border border-emerald-500/30">
                        {currentQ.confidence}
                      </span>
                    </div>
                  </div>

                  {/* Prompt Output */}
                  <div className="mt-5 space-y-4">
                    <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Employee Query</span>
                      <p className="text-sm font-semibold text-slate-100 mt-1">"{currentQ.question}"</p>
                    </div>

                    <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-900/40">
                      <div className="flex items-center gap-2 mb-2 text-blue-300 text-xs font-bold">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span>Synthesized Executive Answer:</span>
                      </div>
                      <p className={`text-sm text-slate-200 leading-relaxed font-normal transition-opacity duration-300 ${
                        isTyping ? 'opacity-30' : 'opacity-100'
                      }`}>
                        {currentQ.answer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grounded Document Citations */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 font-bold block mb-2">
                    Verified Citations & Multi-Document References:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {currentQ.citations.map((cite, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-blue-300 font-mono"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{cite}</span>
                      </div>
                    ))}
                    <span className="text-[11px] text-slate-500 ml-auto font-mono">
                      Sub-200ms Vector Embedding
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollSection>
      </section>

      {/* ========================================================= */}
      {/* SHOWCASE 2: ZERO-LEAK ENTERPRISE RBAC SIMULATOR           */}
      {/* ========================================================= */}
      <section id="security-showcase" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
        <ScrollSection>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              Zero-Trust Architecture
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mt-2">
              Privacy engineered down to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                every single token.
              </span>
            </h3>
            <p className="mt-4 text-slate-600 text-base">
              ContextFlow AI evaluates dynamic role-based access policies before vector retrieval occurs. Sensitive payrolls, private keys, and executive discussions never enter unauthorized contexts.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Interactive Role Switcher Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Live Boundary Enforcement Simulator</h4>
                  <p className="text-xs text-slate-500">Switch employee persona to see dynamic scoping in action</p>
                </div>
              </div>

              {/* Persona Selector Buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl select-none">
                <button
                  type="button"
                  onClick={() => setActiveRole('engineer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeRole === 'engineer'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Engineer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('finance')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeRole === 'finance'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Finance
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('hr')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeRole === 'hr'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  People & HR
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('exec')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeRole === 'exec'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Executive
                </button>
              </div>
            </div>

            {/* Scoping Output Canvas */}
            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Authorized Clearance Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Accessible Knowledge Boundaries ({currentRoleInfo.title})</span>
                  </div>

                  <ul className="space-y-3">
                    {currentRoleInfo.allowed.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-800 font-medium bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                        <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-700 font-medium">
                  <span>Dynamic vector filtering applied</span>
                  <span className="font-bold">Status: Cleared</span>
                </div>
              </div>

              {/* Redacted & Scoped Out Box */}
              <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-800 text-xs font-bold mb-4">
                    <Lock className="w-4 h-4 text-red-600" />
                    <span>Redacted & Blocked from Vector Memory</span>
                  </div>

                  {currentRoleInfo.denied.length > 0 ? (
                    <ul className="space-y-3">
                      {currentRoleInfo.denied.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-500 font-medium bg-white/70 p-2.5 rounded-xl border border-red-100 line-through decoration-red-400">
                          <Lock className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-500 bg-white/80 rounded-xl border border-slate-200">
                      <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-bold text-slate-700">Root Executive Clearance</p>
                      <p className="text-[11px] text-slate-500 mt-1">Full enterprise observability across all internal scopes.</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-red-200/60 flex items-center justify-between text-[11px] text-red-700 font-medium">
                  <span>Pre-inference cryptographic barrier</span>
                  <span className="font-bold">Zero Leakage</span>
                </div>
              </div>

            </div>
          </div>
        </ScrollSection>
      </section>

      {/* ========================================================= */}
      {/* SHOWCASE 3: APPLE-STYLE 3-COLUMN FEATURE BENTO GRID       */}
      {/* ========================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollSection>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Comprehensive Intelligence
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mt-2">
              Built for every department, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                every document format.
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Multi-Modal PDF, Sheets & OCR */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Multi-Modal File Ingestion
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Scanned documents, 60-tab financial spreadsheets, PowerPoint decks, and legal briefs. Our neural parser extracts tables, graphs, and fine print seamlessly.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
                <span>PDF · DOCX · XLSX · PPTX · OCR</span>
              </div>
            </div>

            {/* Bento Card 2: Proactive Policy Conflict Detection */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Proactive Conflict Detection
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  When different departments publish contradicting procedures (e.g. travel expense guidelines vs reimbursement policy), ContextFlow automatically flags the discrepancy.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-indigo-600">
                <span>Automatic Semantic Discrepancy Scans</span>
              </div>
            </div>

            {/* Bento Card 3: 3D Spatial Knowledge Graph */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  3D Spatial Document Vault
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Explore corporate files spatially in 3D. See real-time vector clusters, document relationships, and instant keyword cross-references directly in the workspace.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-sky-600">
                <span>WebGL Vector Visualizer Included</span>
              </div>
            </div>

          </div>
        </ScrollSection>
      </section>

      {/* ========================================================= */}
      {/* SHOWCASE 4: PERFORMANCE & SPEED METRICS STRIP             */}
      {/* ========================================================= */}
      <section id="specs-showcase" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <ScrollSection>
          <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-2xl border border-indigo-900/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              
              <div className="p-4">
                <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                  &lt; 180ms
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-bold mt-2">Median Retrieval Latency</p>
                <p className="text-[11px] text-slate-400 mt-1">Instant embedding searches</p>
              </div>

              <div className="p-4">
                <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  99.9%
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-bold mt-2">Uptime & Availability</p>
                <p className="text-[11px] text-slate-400 mt-1">Fault-tolerant enterprise cluster</p>
              </div>

              <div className="p-4">
                <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
                  0%
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-bold mt-2">External Model Training</p>
                <p className="text-[11px] text-slate-400 mt-1">Private enterprise data isolation</p>
              </div>

              <div className="p-4">
                <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
                  256-Bit
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-bold mt-2">At-Rest & In-Flight Cipher</p>
                <p className="text-[11px] text-slate-400 mt-1">Cryptographic hardware security</p>
              </div>

            </div>
          </div>
        </ScrollSection>
      </section>

      {/* ========================================================= */}
      {/* FINAL CALL TO ACTION: READY TO SIGN IN                    */}
      {/* ========================================================= */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ScrollSection>
          <div className="p-10 sm:p-14 bg-white rounded-3xl border border-slate-200/90 shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-500/25">
              <KeyRound className="w-7 h-7" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Ready to access your workspace?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-3">
              Sign in with your enterprise credentials to explore verified documents, ask questions, and collaborate with ContextFlow AI.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onScrollToLogin}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollSection>
      </section>

      {/* ========================================================= */}
      {/* FLOATING QUICK JUMP TO LOGIN (APPEARS ON SCROLL)           */}
      {/* ========================================================= */}
      {showFloatingLogin && (
        <div className="fixed bottom-6 right-6 z-40 animate-fadeIn">
          <button
            type="button"
            onClick={onScrollToLogin}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-2xl border border-slate-700 backdrop-blur-md transition-all hover:scale-105 cursor-pointer group"
          >
            <span>Sign In</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}

    </div>
  );
};
