'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, Bot, User, AlertCircle, RefreshCw } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTED_PROMPTS = [
  'What is EVM and how does it work?',
  'What is VVPAT?',
  'What happens if my name is missing from the voter list?',
  'What is the difference between Lok Sabha and Assembly elections?',
  'How does vote counting happen?',
  'What documents can I use to vote if I don\'t have a voter ID?',
  'What is NOTA?',
  'What is the Model Code of Conduct?',
  'How do I register as a voter in India?',
  'What is the indelible ink used for?',
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m the AI Election Navigator — your guide to understanding Indian elections. I can help you learn about voter registration, EVM & VVPAT, polling day, counting, and more.\n\nI\'m strictly non-partisan — I only explain the election process, not political opinions. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setError('');

    const userMessage: Message = { role: 'user', content: text.trim() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setMessages(prev => prev.slice(0, -1)); // Remove the user message on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Chat reset. How can I help you understand Indian elections?',
    }]);
    setError('');
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-4">
            AI ASSISTANT
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Ask About Indian Elections</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Powered by AI, grounded in ECI knowledge. Non-partisan. Educational only.
          </p>
        </div>

        {/* Suggested prompts */}
        <div className="mb-6">
          <p className="text-slate-500 text-xs font-semibold mb-3">SUGGESTED QUESTIONS</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                disabled={loading}
                className="px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat container */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-slide-up`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                    : 'bg-gradient-to-br from-orange-500 to-rose-500'
                }`}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                </div>
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'assistant'
                      ? 'bg-slate-800 text-slate-200 rounded-tl-sm'
                      : 'bg-blue-600 text-white rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5 items-center">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/20 border border-red-500/20 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Non-partisan badge */}
          <div className="px-6 py-2 bg-slate-900/40 border-t border-slate-700/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-slate-500 text-xs">Non-partisan · Process education only · Not official ECI advice</span>
            <button
              onClick={resetChat}
              className="ml-auto text-slate-500 hover:text-slate-300 transition-colors"
              title="Reset chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50">
            <div className="flex gap-3">
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about voter registration, EVM, polling day..."
                disabled={loading}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-60"
              />
              <button
                id="chat-send"
                type="submit"
                disabled={!input.trim() || loading}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-all flex items-center gap-2 font-semibold text-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Disclaimer */}
        <p className="text-slate-600 text-xs text-center mt-4">
          AI responses are educational only. Always verify critical information at{' '}
          <a href="https://eci.gov.in" className="text-blue-500 hover:underline">eci.gov.in</a>
        </p>
      </div>
      <Footer />
    </main>
  );
}
