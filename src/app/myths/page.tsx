'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { electionContent } from '@/lib/electionContent';
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function MythsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const myths = electionContent.myth_fact;

  const toggle = (i: number) => setExpanded(prev => prev === i ? null : i);

  const categories = Array.from(new Set(myths.map(m => m.category)));

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-4">
            MYTHS & FACTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Common Misconceptions About Indian Elections
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Clearing up misinformation about the election process — from EVM security to voting privacy.
          </p>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Myths list */}
        <div className="space-y-4">
          {myths.map((item, i) => (
            <div
              key={i}
              id={`myth-${i + 1}`}
              className="rounded-xl border border-slate-700/50 overflow-hidden"
            >
              {/* Myth section */}
              <button
                onClick={() => toggle(i)}
                className="w-full p-5 flex items-start gap-4 text-left bg-slate-800/50 hover:bg-slate-800 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-red-400 uppercase">Myth</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 text-xs">{item.category}</span>
                  </div>
                  <p className="text-white font-medium leading-relaxed">&ldquo;{item.myth}&rdquo;</p>
                </div>
                <div className="flex-shrink-0 text-slate-400">
                  {expanded === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Fact section */}
              {expanded === i && (
                <div className="p-5 border-t border-slate-700/40 bg-green-900/10">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-green-400 uppercase mb-2">The Fact</div>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.fact}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30 text-center">
          <h3 className="text-white font-bold mb-2">Have more questions?</h3>
          <p className="text-slate-400 text-sm mb-4">
            Ask the AI assistant any question about the Indian election process.
          </p>
          <a
            href="/assistant"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all"
          >
            Go to AI Assistant
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
