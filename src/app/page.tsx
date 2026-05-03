import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Vote, BookOpen, PlayCircle, BarChart2, MessageSquare,
  AlertCircle, ChevronRight, Users, Shield, Zap, Globe
} from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'First-Time Voter Guide',
    desc: 'Step-by-step checklist for new voters: eligibility, registration, and what to expect.',
    href: '/journey?role=first-time',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: 'Election Lifecycle',
    desc: 'Visual timeline of every stage: from voter rolls to result declaration.',
    href: '/lifecycle',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: <PlayCircle className="w-6 h-6" />,
    title: 'Polling Day Simulator',
    desc: 'Walk through polling day step by step — booths, EVM, VVPAT and more.',
    href: '/simulator',
    color: 'from-green-600/20 to-green-500/10 border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: <Vote className="w-6 h-6" />,
    title: 'Counting & Results',
    desc: 'Understand how votes are counted and results are declared after polling.',
    href: '/counting',
    color: 'from-purple-600/20 to-purple-500/10 border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'AI Assistant',
    desc: 'Ask anything about Indian elections. Grounded, neutral, and informative answers.',
    href: '/assistant',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: 'Myths vs Facts',
    desc: 'Bust common misconceptions about EVMs, voting secrecy, and the election process.',
    href: '/myths',
    color: 'from-rose-600/20 to-rose-500/10 border-rose-500/20',
    iconColor: 'text-rose-400',
  },
];

const roles = [
  { id: 'first-time', label: '🗳️ First-Time Voter', desc: 'Just turned 18? Start here.' },
  { id: 'registered', label: '✅ Registered Voter', desc: 'Refresh your knowledge.' },
  { id: 'student', label: '📚 Student / Learner', desc: 'Learn how democracy works.' },
  { id: 'citizen', label: '🇮🇳 General Citizen', desc: 'Stay civically informed.' },
];

const stats = [
  { label: 'Eligible Voters', value: '97 Cr+', icon: <Users className="w-5 h-5" /> },
  { label: 'Polling Stations', value: '10.5 Lakh', icon: <Vote className="w-5 h-5" /> },
  { label: 'Lok Sabha Seats', value: '543', icon: <Shield className="w-5 h-5" /> },
  { label: 'Languages', value: '22+', icon: <Globe className="w-5 h-5" /> },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            AI-Powered Civic Education for India
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Understand Your{' '}
            <span className="bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
              Vote
            </span>
            <br />Like Never Before
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI-guided platform that explains Indian elections — from voter registration to result declaration — in simple, neutral, and accessible language.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/journey"
              id="hero-start-journey"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              Start My Journey <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/assistant"
              id="hero-ask-ai"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              Ask the AI
            </Link>
          </div>

          {/* Non-partisan note */}
          <p className="mt-8 text-slate-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            100% non-partisan · No party recommendations · Educational only
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                {s.icon}
              </div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Role selection */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Who are you?</h2>
            <p className="text-slate-400">Get a personalized journey based on your profile.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <Link
                key={role.id}
                href={`/journey?role=${role.id}`}
                id={`role-${role.id}`}
                className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/40 hover:bg-slate-800 transition-all card-hover text-center"
              >
                <div className="text-3xl mb-3">{role.label.split(' ')[0]}</div>
                <h3 className="text-white font-semibold mb-1">{role.label.split(' ').slice(1).join(' ')}</h3>
                <p className="text-slate-400 text-sm">{role.desc}</p>
                <div className="mt-4 text-blue-400 text-sm font-medium flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Everything you need to know</h2>
            <p className="text-slate-400">Explore guided modules on every aspect of Indian elections.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${f.color} border transition-all card-hover`}
              >
                <div className={`${f.iconColor} mb-4`}>{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                  Explore <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-900/50 to-slate-900 border border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-orange-500/5" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🇮🇳</div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                An informed voter is a empowered citizen
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Democracy works best when citizens understand how it functions. Start your civic education journey today.
              </p>
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-1"
              >
                Begin Your Journey <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
