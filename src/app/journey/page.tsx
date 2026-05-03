'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle2, Circle, ChevronRight, ArrowLeft, Info } from 'lucide-react';

const roles = {
  'first-time': {
    label: 'First-Time Voter',
    emoji: '🗳️',
    intro: "Welcome! This guide is designed specifically for voters participating in an Indian election for the first time.",
    steps: [
      { id: 'eligibility', title: 'Check Your Eligibility', detail: 'You must be an Indian citizen, 18+ years old, and a resident of the constituency where you wish to vote. There is no restriction on gender, caste, religion, or education for voter eligibility.' },
      { id: 'register', title: 'Register to Vote', detail: 'Visit voters.eci.gov.in or use the Voter Helpline App. Fill Form 6. You will need a recent photo, age proof, and address proof. The Electoral Registration Officer (ERO) will verify your application.' },
      { id: 'verify', title: 'Verify Your Name on the Electoral Roll', detail: 'After registration, verify your name appears on the voter list. Visit voters.eci.gov.in, search by name/EPIC number, or call the Voter Helpline at 1950.' },
      { id: 'booth', title: 'Know Your Polling Booth', detail: 'Your voter slip or the NVSP website will tell you your exact polling station. Note the address and plan your travel in advance.' },
      { id: 'documents', title: 'Carry Valid ID on Polling Day', detail: 'Your Voter ID (EPIC) is the primary document. Alternatives include Aadhaar, Passport, Driving License, PAN Card, or Bank Passbook with photo, among others approved by ECI.' },
      { id: 'cast', title: 'Cast Your Vote on EVM', detail: 'Inside the booth, the polling officer will mark your name and apply indelible ink on your left forefinger. You will then press the blue button on the EVM next to your chosen candidate. A VVPAT slip will confirm your vote for 7 seconds.' },
      { id: 'after', title: 'After Voting', detail: 'You are free to leave after casting your vote. The indelible ink on your finger shows you voted. Results are typically declared weeks after polling ends — follow official ECI sources for updates.' },
    ],
  },
  'registered': {
    label: 'Registered Voter',
    emoji: '✅',
    intro: "You\'re already registered! Here\'s a refresher on what to do before and on polling day.",
    steps: [
      { id: 'check-roll', title: 'Re-verify Your Name on Electoral Roll', detail: 'Electoral rolls are updated periodically. Verify your name is still listed — especially if you\'ve moved recently — at voters.eci.gov.in or by calling 1950.' },
      { id: 'update-address', title: 'Update Address if Moved', detail: 'If you\'ve changed address, file Form 8A (shifting within constituency) or Form 6 (new constituency). Update promptly so your registration stays valid.' },
      { id: 'find-booth', title: 'Find Your Updated Polling Booth', detail: 'Booths can change between elections due to delimitation. Always check your current polling booth on the NVSP portal before election day.' },
      { id: 'carry-id', title: 'Carry Valid ID', detail: 'Your Voter ID (EPIC) is primary. Approved alternatives include Aadhaar, Passport, Driving License, PAN, and others. Check ECI\'s current list before election day.' },
      { id: 'mcc', title: 'Know the Model Code of Conduct', detail: 'During the election period, the Model Code of Conduct is in force. As a voter, avoid accepting any gifts or inducements in exchange for your vote — this is illegal.' },
      { id: 'vote', title: 'Vote Independently and Confidently', detail: 'Your vote is completely secret. No one can know which button you pressed on the EVM. Vote based on your own free will.' },
    ],
  },
  'student': {
    label: 'Student / Learner',
    emoji: '📚',
    intro: "Learn how India\'s democracy works, from elections to governance — a great civic education resource.",
    steps: [
      { id: 'democracy', title: 'Understand India\'s Democratic Structure', detail: 'India is a representative democracy. Citizens elect representatives to the Lok Sabha (national), Vidhan Sabha (state), and local bodies. These elected members form governments and make laws.' },
      { id: 'eci', title: 'Role of the Election Commission of India', detail: 'ECI is a constitutional body that oversees free and fair elections. It announces schedules, enforces the Model Code of Conduct, manages EVMs, and ensures the integrity of the electoral process.' },
      { id: 'types', title: 'Types of Elections', detail: 'Lok Sabha (every 5 years, 543 seats), State Assembly elections (Vidhan Sabha, state-level governance), and local body elections (municipalities, panchayats for local governance).' },
      { id: 'register-now', title: 'Register to Vote When Eligible', detail: 'If you are 18+, register immediately! Every vote counts. Your participation shapes the future of your city, state, and country.' },
      { id: 'lifecycle', title: 'Study the Election Lifecycle', detail: 'From voter list revision to result declaration — each stage matters. Explore the Election Lifecycle module to understand every phase with visual explanations.' },
      { id: 'evm', title: 'Understand EVM & VVPAT Technology', detail: 'Electronic Voting Machines are secure, standalone devices not connected to the internet. VVPAT provides paper audit trail. Understanding the technology builds trust in the process.' },
      { id: 'awareness', title: 'Spread Civic Awareness', detail: 'Use this knowledge to educate others — family, neighbors, friends. An informed citizenry strengthens democracy.' },
    ],
  },
  'citizen': {
    label: 'General Citizen',
    emoji: '🇮🇳',
    intro: "Stay civically informed. Here are the key things every Indian citizen should know about elections.",
    steps: [
      { id: 'right', title: 'Your Right to Vote', detail: 'Voting is both a constitutional right (Article 326) and a civic responsibility. Every adult Indian citizen has the right to vote in their constituency\'s elections.' },
      { id: 'roll-check', title: 'Verify Your Registration', detail: 'Even if you registered years ago, verify your name is still on the current electoral roll. Visit voters.eci.gov.in or call 1950.' },
      { id: 'process', title: 'How Elections Work in India', detail: 'The Election Commission of India manages elections. Candidates are nominated, campaigns happen within MCC guidelines, voters cast votes on EVMs, and results are declared after counting.' },
      { id: 'mcc-citizen', title: 'The Model Code of Conduct', detail: 'During elections, political parties and candidates must follow the MCC — no hate speech, no vote-buying, no misuse of government resources. You can report violations at 1950.' },
      { id: 'report', title: 'Report Electoral Violations', detail: 'If you witness vote-buying, booth capturing, or MCC violations, report them to the ECI Helpline (1950), the cVIGIL app, or local election officials.' },
      { id: 'official', title: 'Use Official Information Sources', detail: 'For authoritative information, always refer to eci.gov.in and voters.eci.gov.in. Be cautious of misinformation during election season.' },
    ],
  },
};

function JourneyContent() {
  const searchParams = useSearchParams();
  const roleKey = searchParams.get('role') as keyof typeof roles;
  const [selectedRole, setSelectedRole] = useState<keyof typeof roles | null>(roleKey || null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const currentRole = selectedRole ? roles[selectedRole] : null;

  const toggleStep = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!selectedRole) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">Who are you?</h1>
          <p className="text-slate-400 text-lg">Choose your role to get a personalized civic education journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(Object.entries(roles) as [keyof typeof roles, typeof roles[keyof typeof roles]][]).map(([key, role]) => (
            <button
              key={key}
              id={`select-role-${key}`}
              onClick={() => setSelectedRole(key)}
              className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/40 hover:bg-slate-800 transition-all card-hover text-left group"
            >
              <div className="text-4xl mb-4">{role.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{role.label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{role.intro}</p>
              <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Get your guide <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const total = currentRole!.steps.length;
  const done = completed.size;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => { setSelectedRole(null); setCompleted(new Set()); }}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="text-slate-400 text-sm">{currentRole!.emoji} {currentRole!.label}</div>
          <h1 className="text-2xl font-black text-white">Your Civic Journey</h1>
        </div>
      </div>

      {/* Intro */}
      <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8 flex gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-300 text-sm leading-relaxed">{currentRole!.intro}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>{done} of {total} completed</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {currentRole!.steps.map((step, i) => {
          const isDone = completed.has(step.id);
          return (
            <div
              key={step.id}
              className={`p-5 rounded-xl border transition-all ${isDone ? 'bg-green-500/5 border-green-500/20' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}`}
            >
              <div className="flex items-start gap-4">
                <button
                  id={`step-${step.id}`}
                  onClick={() => toggleStep(step.id)}
                  className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110"
                  aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                >
                  {isDone
                    ? <CheckCircle2 className="w-6 h-6 text-green-400" />
                    : <Circle className="w-6 h-6 text-slate-500" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-slate-500">STEP {i + 1}</span>
                    <h3 className={`font-bold ${isDone ? 'text-green-300 line-through opacity-70' : 'text-white'}`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {done === total && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-green-900/40 to-blue-900/40 border border-green-500/20 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-white mb-2">You&apos;re all set!</h3>
          <p className="text-slate-400 text-sm mb-4">Explore more to deepen your civic knowledge.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/simulator" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all">
              Try Polling Simulator
            </Link>
            <Link href="/assistant" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition-all">
              Ask AI Assistant
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <Navbar />
      <Suspense fallback={<div className="text-center text-slate-400 mt-20">Loading...</div>}>
        <JourneyContent />
      </Suspense>
      <Footer />
    </main>
  );
}
