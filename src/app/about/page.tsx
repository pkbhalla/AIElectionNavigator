import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, AlertCircle, ExternalLink, Check, X } from 'lucide-react';

const canDo = [
  'Explain the Indian election process step by step',
  'Describe voter registration and eligibility',
  'Explain how EVM and VVPAT work',
  'Walk through polling day procedures',
  'Explain how counting and results work',
  'Clarify differences between Lok Sabha, Assembly, and local elections',
  'Bust common election process myths',
  'Answer civic education questions in clear language',
];

const cannotDo = [
  'Recommend which party or candidate to vote for',
  'Predict election outcomes',
  'Provide state-specific legal or regulatory advice',
  'Confirm if your specific name is on the voter roll',
  'Give official instructions binding on any election',
  'Replace official ECI guidance or legal counsel',
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">About AI Election Navigator</h1>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            A civic education tool designed to help Indian citizens understand how elections work — transparently, neutrally, and accessibly.
          </p>
        </div>

        {/* What it is */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/40 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">What is this app?</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            AI Election Navigator India is a civic technology platform powered by AI that helps voters, students, and citizens understand the Indian electoral system. It covers the full election lifecycle — from voter registration to result declaration — using interactive guides, simulations, and an AI assistant.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            The app is built with one guiding principle: <strong className="text-white">non-partisanship</strong>. It never recommends parties, candidates, or political opinions. It only educates about the process, rights, and responsibilities of voters under the Election Commission of India framework.
          </p>
        </div>

        {/* Can / Cannot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="p-6 rounded-2xl bg-green-900/10 border border-green-500/20">
            <h3 className="text-green-300 font-bold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5" /> What this app CAN do
            </h3>
            <ul className="space-y-2">
              {canDo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-red-900/10 border border-red-500/20">
            <h3 className="text-red-300 font-bold mb-4 flex items-center gap-2">
              <X className="w-5 h-5" /> What this app CANNOT do
            </h3>
            <ul className="space-y-2">
              {cannotDo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI notice */}
        <div className="p-5 rounded-xl bg-amber-900/10 border border-amber-500/20 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-amber-300 font-semibold mb-1">About the AI Assistant</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The AI assistant uses a large language model with a structured system prompt to ensure it only discusses Indian election processes. It is grounded in ECI public knowledge but is not an official ECI product. Always verify important information at official sources.
            </p>
          </div>
        </div>

        {/* Official sources */}
        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30">
          <h2 className="text-white font-bold mb-4">Official Sources</h2>
          <p className="text-slate-400 text-sm mb-5">
            For legally binding, authoritative, and state-specific information, always refer to these official sources:
          </p>
          <div className="space-y-3">
            {[
              ['Election Commission of India', 'https://eci.gov.in', 'Official ECI website'],
              ['National Voters Service Portal', 'https://voters.eci.gov.in', 'Voter registration and electoral roll'],
              ['Voter Helpline', 'tel:1950', 'Call 1950 for voter assistance'],
              ['Know Your Candidate', 'https://affidavit.eci.gov.in', 'Candidate affidavits and disclosures'],
            ].map(([name, url, desc]) => (
              <a
                key={url}
                href={url}
                target={url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-700/40 hover:border-blue-500/30 transition-all group"
              >
                <div>
                  <div className="text-white text-sm font-semibold group-hover:text-blue-300 transition-colors">{name}</div>
                  <div className="text-slate-500 text-xs">{desc}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Tech */}
        <div className="mt-6 p-5 rounded-xl bg-slate-800/30 border border-slate-700/20 text-center">
          <p className="text-slate-500 text-xs">
            Built with Next.js 14, TypeScript, Tailwind CSS, and Gemini AI. Deployable on Google Cloud Run.
            <br />
            Non-partisan · Educational · Open Source
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
