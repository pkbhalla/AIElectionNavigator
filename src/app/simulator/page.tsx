'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 'arrive',
    title: 'Arriving at the Polling Station',
    emoji: '🚶',
    description: 'On polling day, go to your assigned polling station (booth). Check your voter slip or NVSP website for the exact address.',
    tips: [
      'Polling is usually open from 7 AM to 6 PM (timings may vary by constituency).',
      'Carry your Voter ID (EPIC) or any approved alternative document.',
      'Look for the queue at your booth — queues are usually organised by Part Number.',
    ],
    visual: 'bg-gradient-to-br from-blue-900/40 to-slate-900',
    badge: 'Step 1 of 7',
  },
  {
    id: 'queue',
    title: 'Joining the Queue & Identity Verification',
    emoji: '🪪',
    description: 'Join the queue at your booth. A polling officer will verify your identity and check your name against the electoral roll.',
    tips: [
      'The officer checks your name in the voter list using your EPIC number or serial number.',
      'Show your Voter ID or any 12 ECI-approved alternative documents.',
      'If your name is on the roll, you proceed. If not, you may be directed to the ERO.',
    ],
    visual: 'bg-gradient-to-br from-purple-900/40 to-slate-900',
    badge: 'Step 2 of 7',
  },
  {
    id: 'ink',
    title: 'Indelible Ink Application',
    emoji: '🖊️',
    description: 'Before entering the voting compartment, a polling officer applies indelible ink on your left forefinger.',
    tips: [
      'This prevents you from voting more than once — it is a crucial safeguard.',
      'The ink is specially formulated and cannot be washed off for several days.',
      'Your marked name in the register is also a record that you have voted.',
    ],
    visual: 'bg-gradient-to-br from-orange-900/40 to-slate-900',
    badge: 'Step 3 of 7',
  },
  {
    id: 'slip',
    title: 'Receiving Your Voter Slip',
    emoji: '📋',
    description: 'You receive a slip from the Presiding Officer which is handed to the officer at the voting compartment.',
    tips: [
      'The slip is your authorization to enter the voting compartment.',
      'There is no discussion about whom to vote for inside the polling station.',
      'Complete silence must be maintained inside the voting area.',
    ],
    visual: 'bg-gradient-to-br from-cyan-900/40 to-slate-900',
    badge: 'Step 4 of 7',
  },
  {
    id: 'evm',
    title: 'Casting Your Vote on the EVM',
    emoji: '🗳️',
    description: 'Inside the voting compartment, you see the Ballot Unit of the EVM. The polling officer enables the machine. Press the BLUE BUTTON next to your chosen candidate.',
    tips: [
      'The EVM ballot unit shows candidate names with party symbols and photos.',
      'Press firmly until you hear a beep — this confirms your vote is recorded.',
      'You cannot change your vote once cast.',
      'If you wish to reject all candidates, press the NOTA (None of the Above) button.',
    ],
    visual: 'bg-gradient-to-br from-green-900/40 to-slate-900',
    badge: 'Step 5 of 7',
  },
  {
    id: 'vvpat',
    title: 'VVPAT Confirmation',
    emoji: '🧾',
    description: 'After pressing the EVM button, a paper slip appears in the VVPAT (Voter Verifiable Paper Audit Trail) glass window for 7 seconds.',
    tips: [
      'The VVPAT slip shows the party symbol and candidate name you voted for.',
      'After 7 seconds, the slip automatically falls into a sealed compartment.',
      'This is your visual confirmation that your vote was recorded correctly.',
      'You CANNOT take the VVPAT slip home — it stays inside the machine.',
    ],
    visual: 'bg-gradient-to-br from-amber-900/40 to-slate-900',
    badge: 'Step 6 of 7',
  },
  {
    id: 'leave',
    title: 'Leaving After Voting',
    emoji: '✅',
    description: 'Once you have cast your vote and seen the VVPAT confirmation, leave the voting compartment. You have successfully completed your civic duty!',
    tips: [
      'Your vote is completely secret — no one, including polling staff, knows whom you voted for.',
      'The indelible ink on your finger confirms you have voted.',
      'Results are typically declared weeks after all polling phases end.',
      'Follow official ECI sources for results — avoid rumour-based updates.',
    ],
    visual: 'bg-gradient-to-br from-emerald-900/40 to-slate-900',
    badge: 'Step 7 of 7',
  },
];

export default function SimulatorPage() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const step = steps[current];
  const isLast = current === steps.length - 1;
  const isFirst = current === 0;

  const next = () => {
    setCompleted(prev => new Set(prev).add(current));
    if (!isLast) setCurrent(current + 1);
  };

  const prev = () => {
    if (!isFirst) setCurrent(current - 1);
  };

  const progress = ((current) / (steps.length - 1)) * 100;

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold mb-4">
            POLLING DAY SIMULATOR
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Walk Through Polling Day
          </h1>
          <p className="text-slate-400">An interactive step-by-step guide to what happens on election day in India.</p>
        </div>

        {/* Step tracker */}
        <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <button
              key={s.id}
              id={`sim-step-${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                completed.has(i) || i < current
                  ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                  : i === current
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800 border border-slate-700 text-slate-500'
              }`}
            >
              {completed.has(i) || i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Main step card */}
        <div className={`rounded-2xl ${step.visual} border border-white/5 p-8 mb-6 animate-fade-in`}>
          <div className="flex items-start gap-5">
            <div className="text-5xl">{step.emoji}</div>
            <div className="flex-1">
              <div className="text-xs font-mono text-slate-500 mb-1">{step.badge}</div>
              <h2 className="text-2xl font-black text-white mb-4">{step.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-6">{step.description}</p>

              <div className="space-y-3">
                {step.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            id="sim-prev"
            onClick={prev}
            disabled={isFirst}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>

          <span className="text-slate-500 text-sm">{current + 1} / {steps.length}</span>

          {isLast ? (
            <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600/20 border border-green-500/30 text-green-300 font-semibold">
              <CheckCircle2 className="w-5 h-5" /> Simulation Complete!
            </div>
          ) : (
            <button
              id="sim-next"
              onClick={next}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Completion card */}
        {isLast && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 text-center">
            <div className="text-4xl mb-3">🏅</div>
            <h3 className="text-xl font-bold text-white mb-2">You know how to vote!</h3>
            <p className="text-slate-400 text-sm mb-5">
              You have walked through the complete Indian polling day process. Now explore more.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/counting" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all">
                Learn About Counting
              </a>
              <a href="/myths" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition-all">
                Myths & Facts
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
