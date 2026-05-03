'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { electionContent } from '@/lib/electionContent';
import { ChevronDown, ChevronUp } from 'lucide-react';

const phaseColors = {
  pre: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-500', label: 'Before Polling', text: 'text-blue-300' },
  during: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', dot: 'bg-orange-500', label: 'Polling Day', text: 'text-orange-300' },
  post: { bg: 'bg-green-500/10', border: 'border-green-500/20', dot: 'bg-green-500', label: 'After Polling', text: 'text-green-300' },
};

export default function LifecyclePage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const stages = electionContent.election_lifecycle;

  const toggle = (stage: string) => setExpanded(prev => prev === stage ? null : stage);

  const preStages = stages.filter(s => s.phase === 'pre');
  const duringStages = stages.filter(s => s.phase === 'during');
  const postStages = stages.filter(s => s.phase === 'post');

  const renderStages = (list: typeof stages, phase: keyof typeof phaseColors) => {
    const c = phaseColors[phase];
    return (
      <div className="space-y-3">
        {list.map((stage, i) => (
          <div key={stage.stage} className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden transition-all`}>
            <button
              id={`lifecycle-${stage.stage.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => toggle(stage.stage)}
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                {stage.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-slate-500">STAGE {i + 1}</span>
                </div>
                <h3 className="text-white font-semibold">{stage.stage}</h3>
              </div>
              {expanded === stage.stage
                ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
            </button>
            {expanded === stage.stage && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <p className="text-slate-300 leading-relaxed">{stage.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-4">
            ELECTION LIFECYCLE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            How Indian Elections Work
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Follow the complete journey of an Indian election — from voter list preparation to result declaration.
          </p>
        </div>

        {/* Phase legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {(Object.entries(phaseColors) as [keyof typeof phaseColors, typeof phaseColors[keyof typeof phaseColors]][]).map(([key, c]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${c.dot}`} />
              <span className={`text-sm font-medium ${c.text}`}>{c.label}</span>
            </div>
          ))}
        </div>

        {/* Three phases */}
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Before Polling
            </h2>
            {renderStages(preStages, 'pre')}
          </div>

          <div>
            <h2 className="text-lg font-bold text-orange-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> Polling Day
            </h2>
            {renderStages(duringStages, 'during')}
          </div>

          <div>
            <h2 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> After Polling
            </h2>
            {renderStages(postStages, 'post')}
          </div>
        </div>

        {/* Note */}
        <div className="mt-10 p-5 rounded-xl bg-slate-800/40 border border-slate-700/30 text-center">
          <p className="text-slate-400 text-sm">
            This is general guidance on the Indian election process. For official, legally binding information, always refer to the{' '}
            <a href="https://eci.gov.in" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Election Commission of India
            </a>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
