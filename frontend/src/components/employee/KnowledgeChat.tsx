import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Send,
  Paperclip,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Shield,
  ChevronRight,
  ExternalLink,
  Check,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { RECENT_CHATS, INITIAL_CHAT_MESSAGES, SUGGESTED_QUESTIONS } from '../../data/mockData';
import { ChatMessage, ChatThread } from '../../types';

interface KnowledgeChatProps {
  onOpenDocDetail: (docId: string) => void;
}

export const KnowledgeChat: React.FC<KnowledgeChatProps> = ({ onOpenDocDetail }) => {
  const [threads, setThreads] = useState<ChatThread[]>(RECENT_CHATS);
  const [activeThreadId, setActiveThreadId] = useState<string>('chat-1');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate responsive AI response
    setTimeout(() => {
      let reply: ChatMessage;
      const lower = query.toLowerCase();

      if (lower.includes('leave') || lower.includes('holiday')) {
        reply = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: "Based on the Company Leave Policy.pdf, employees receive 20 days of paid annual leave each calendar year. Requests must be logged 7 days in advance via the internal HR portal.",
          timestamp: 'Just now',
          keyPoints: [
            '20 days annual leave entitlement per year',
            'Requires line manager approval through the HR portal',
            'Up to 10 days of unused leave can be carried forward into the next year',
            'Sick leaves exceeding 3 days require a medical certificate'
          ],
          sources: [
            { id: 's-1', title: 'Company Leave Policy.pdf', docType: 'PDF', page: 'Page 3 – Annual Leave Rules' },
            { id: 's-2', title: 'Employee Handbook.docx', docType: 'DOC', page: 'Page 18 – Attendance & Time Off' }
          ]
        };
      } else if (lower.includes('maternity') || lower.includes('paternity')) {
        reply = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: "According to the Maternity Leave Policy.pdf, eligible female employees are entitled to 26 weeks of paid maternity leave, while male employees receive 2 weeks of paid paternity leave.",
          timestamp: 'Just now',
          keyPoints: [
            '26 weeks fully paid maternity leave',
            '2 weeks paid paternity leave',
            'Flexible return-to-work arrangements available upon request',
            'Health insurance coverage continues during the entire leave period'
          ],
          sources: [
            { id: 's-1', title: 'Maternity Leave Policy.pdf', docType: 'PDF', page: 'Page 2 – Parental Entitlements' }
          ]
        };
      } else {
        reply = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Here is the relevant information extracted from your authorized organizational documents regarding "${query}":`,
          timestamp: 'Just now',
          keyPoints: [
            'All enterprise guidelines are strictly enforced under company compliance frameworks',
            'For operational exceptions, contact your department lead or HR partner',
            'Documentation is verified and updated quarterly'
          ],
          sources: [
            { id: 's-1', title: 'Engineering Guidelines.docx', docType: 'DOC', page: 'Page 7 – Operational Protocols' },
            { id: 's-2', title: 'Remote Work Policy.pdf', docType: 'PDF', page: 'Page 4 – Governance' }
          ]
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const startNewChat = () => {
    const newThread: ChatThread = {
      id: `chat-${Date.now()}`,
      title: 'New Knowledge Conversation',
      timestamp: 'Just now',
      messagesCount: 0
    };
    setThreads([newThread, ...threads]);
    setActiveThreadId(newThread.id);
    setMessages([]);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            Knowledge Chat
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ask questions about your authorized documents. Get AI-powered answers with sources.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Shield className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Your answers are based only on documents you are authorized to access.</span>
        </div>
      </div>

      {/* Main 3-panel chat view matching Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[calc(100vh-14rem)] min-h-[580px]">
        {/* Left Column: Recent Chats (3 cols) */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-3.5 flex flex-col justify-between">
          <div className="space-y-3 overflow-hidden flex flex-col flex-1">
            {/* New Chat Button */}
            <button
              onClick={startNewChat}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Recent Chats
              </span>
              <div className="mt-1 space-y-1">
                {threads.map((t) => {
                  const isActive = activeThreadId === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveThreadId(t.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-start gap-2.5 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <MessageSquare className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <div className="overflow-hidden">
                        <p className="truncate">{t.title}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{t.timestamp}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Messages & Input (6 cols) */}
        <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between p-4 overflow-hidden">
          {/* Conversation history */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-2">
            {/* Date divider */}
            <div className="text-center my-1">
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Sep 10, 2025
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
                <MessageSquare className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-xs font-semibold">Start asking questions about your documents</p>
                <p className="text-[11px]">Answers cite exact sections and policy manuals</p>
              </div>
            ) : (
              messages.map((m) => {
                if (m.sender === 'user') {
                  return (
                    <div key={m.id} className="flex justify-end items-start gap-2">
                      <div className="flex flex-col items-end max-w-md">
                        <div className="bg-blue-50 border border-blue-100 text-blue-900 rounded-2xl rounded-tr-xs px-4 py-2.5 text-xs font-medium shadow-2xs">
                          {m.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">{m.timestamp}</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        TG
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl rounded-tl-xs p-4 space-y-3 text-xs text-slate-800 shadow-2xs">
                        <p className="leading-relaxed">{m.text}</p>

                        {m.keyPoints && m.keyPoints.length > 0 && (
                          <div className="pt-1">
                            <p className="font-bold text-slate-900 text-xs mb-1.5">
                              Key Points:
                            </p>
                            <ul className="space-y-1 text-slate-700">
                              {m.keyPoints.map((pt, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-blue-600 font-bold">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Reaction and copy controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-slate-400">
                          <span className="text-[10px]">{m.timestamp}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(m.text)}
                              className="p-1 hover:text-slate-600 rounded transition-colors"
                              title="Copy text"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => setLiked(liked === true ? null : true)}
                              className={`p-1 hover:text-slate-600 rounded transition-colors ${
                                liked === true ? 'text-blue-600' : ''
                              }`}
                              title="Good answer"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setLiked(liked === false ? null : false)}
                              className={`p-1 hover:text-slate-600 rounded transition-colors ${
                                liked === false ? 'text-red-500' : ''
                              }`}
                              title="Poor answer"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Sources Accordion Card */}
                      {m.sources && m.sources.length > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
                          <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            Sources ({m.sources.length})
                          </span>

                          <div className="space-y-1.5">
                            {m.sources.map((s) => (
                              <div
                                key={s.id}
                                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold text-white ${
                                      s.docType === 'PDF' ? 'bg-red-500' : 'bg-blue-600'
                                    }`}
                                  >
                                    {s.docType}
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-slate-800">
                                      {s.title}
                                    </p>
                                    <p className="text-[10px] text-slate-400">{s.page}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => onOpenDocDetail('doc-1')}
                                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50"
                                >
                                  <span>Open</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Query Input Bar */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-2xs"
            >
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask anything about your authorized documents..."
                className="flex-1 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-[10px] text-slate-400 text-center">
              🔒 Answers are generated from documents you are authorized to access.
            </p>
          </div>
        </div>

        {/* Right Column: Suggested Questions & Tips (3 cols) */}
        <div className="md:col-span-3 space-y-4 overflow-y-auto">
          {/* Suggested Questions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-3">
              <span className="text-blue-600">💡</span> Suggested Questions
            </h3>

            <div className="space-y-1.5">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-left p-2 rounded-xl text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-1">{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Tips for better answers */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-3">
              <span className="text-blue-600">ℹ️</span> Tips for better answers
            </h3>

            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Ask specific questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Mention the document type if needed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Use natural language</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>View sources to verify information</span>
              </li>
            </ul>
          </div>

          {/* Bottom Card */}
          <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 border border-blue-100 text-center">
            <p className="text-xs font-bold text-slate-800">
              From Documents to Decisions
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              ContextFlow AI cross-references policy manuals with complete zero-hallucination verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
