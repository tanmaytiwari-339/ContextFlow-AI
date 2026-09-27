import React, { useState } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  FileText
} from 'lucide-react';
import { BrandLogo } from '../common/Illustrations';
import { EmployeeItem } from '../../types';
import { INITIAL_EMPLOYEES } from '../../data/mockData';

interface LandingPageProps {
  onLogin: (employee: EmployeeItem) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('tanmay.tiwari@company.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successEmployee, setSuccessEmployee] = useState<EmployeeItem | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your corporate email or employee ID.');
      return;
    }

    setIsLoading(true);

    // Find matching employee by email or employee ID
    const matched = INITIAL_EMPLOYEES.find(
      (emp) =>
        emp.email.toLowerCase() === identifier.trim().toLowerCase() ||
        emp.empId.toLowerCase() === identifier.trim().toLowerCase()
    ) || INITIAL_EMPLOYEES[0];

    setTimeout(() => {
      setIsLoading(false);
      setSuccessEmployee(matched);
      setTimeout(() => {
        onLogin(matched);
      }, 400);
    }, 600);
  };

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between bg-[#F8FAFC] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      {/* Background Architectural Mesh & Subtle Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      {/* SaaS Navigation Header */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 text-[11px] text-slate-500 font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Workspace Portal · Online</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHelpModal(true)}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>IT Support</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>SOC2 Type II</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero & Login Details Section */}
      <main className="flex-1 z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 my-auto">
        
        {/* Left Column: SaaS Value Proposition */}
        <div 
          style={{ marginTop: '0px', paddingTop: '2px' }}
          className="flex-1 max-w-2xl text-left space-y-5 mt-0 pt-[2px]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ENTERPRISE KNOWLEDGE INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-black text-slate-900 leading-[1.15] tracking-tight">
            Turn company knowledge into instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">decisions.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            ContextFlow AI securely synthesizes enterprise policies, technical documentation, and strategic roadmaps. Sign in with your verified work credentials to enter your personalized dashboard.
          </p>

          {/* Interactive Feature Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 text-blue-600 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>&lt; 200ms</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Retrieval speed</p>
            </div>

            <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>24+ Docs</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Verified files</p>
            </div>

            <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero-Leak</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">RBAC scoping</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Work Credentials
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Hardware-Encrypted Vault
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Audit-Ready Logging
            </span>
          </div>

          {/* Unified Intelligence Callout Banner */}
          <div className="pt-1">
            <div className="flex items-center gap-3.5 p-3.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Unified Corporate Intelligence</p>
                <p className="text-[11px] text-slate-500">Access policies, chat with documents, and review team guidelines in one click.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated SaaS Login Details Card (Work Credentials Only) */}
        <div id="login-section" className="w-full max-w-md shrink-0">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 transition-all">
            
            {/* Top Card Icon & Title */}
            <div className="text-center pb-5 border-b border-slate-100">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Sign in to your Workspace
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your work credentials to access your personal dashboard
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Verification Alert */}
            {successEmployee && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-800 animate-fadeIn">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Welcome back, {successEmployee.name}!</p>
                  <p className="text-[11px] text-emerald-700">Connecting to your personal dashboard...</p>
                </div>
              </div>
            )}

            {/* Work Credentials Form */}
            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
              {/* Corporate Email or Employee ID Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Corporate Email or Employee ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. tanmay.tiwari@company.com or EMP1005"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(true)}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your corporate password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    Remember this device for 30 days
                  </span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !!successEmployee}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Work Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In with Work Credentials</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Card Security Footnote */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Protected by Enterprise 256-bit FIDO2 encryption
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* SaaS Minimal Footer */}
      <footer className="z-10 bg-white border-t border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ContextFlow AI</span>
            <span>· Enterprise Knowledge Intelligence</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowHelpModal(true)}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Support Desk
            </button>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
          <div className="text-[11px] text-slate-400">
            © 2026 ContextFlow AI Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Help / Password Reset Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Corporate Access Support</h4>
                <p className="text-xs text-slate-500">IT Helpdesk & Credential Verification</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p>
                <strong>Employee ID or Email:</strong> Use your assigned corporate ID (e.g., <code className="text-blue-600 font-mono">EMP1005</code>) or corporate email (<code className="text-blue-600 font-mono">tanmay.tiwari@company.com</code>).
              </p>
              <p>
                <strong>Password Assistance:</strong> Passwords can be reset through corporate IT by submitting a request to <span className="text-blue-600 underline">it-helpdesk@company.com</span>.
              </p>
              <p>
                <strong>Direct Sign-In:</strong> Click <strong>"Sign In with Work Credentials"</strong> to instantly enter your dashboard with your default credentials.
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
