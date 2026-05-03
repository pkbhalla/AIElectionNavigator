import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { electionContent } from '@/lib/electionContent';

const countingSteps = [
  {
    icon: '🔐',
    title: 'EVMs in Strong Rooms',
    desc: 'After polling, EVMs are transported to designated strong rooms under heavy security. They remain there until counting day, monitored 24/7 by security forces. Candidates and agents can observe the strong rooms.',
  },
  {
    icon: '📅',
    title: 'Counting Day Announcement',
    desc: 'The Election Commission announces the counting date well in advance. Counting typically begins at 8 AM and may continue until all votes are tallied. All major elections nationwide count on the same day.',
  },
  {
    icon: '🏛️',
    title: 'Counting Centres',
    desc: 'Counting happens at designated counting halls — usually government buildings. Each table has a Counting Assistant, a Counting Supervisor, and observers. Candidates and their counting agents are present.',
  },
  {
    icon: '🔢',
    title: 'Round-by-Round Counting',
    desc: 'Votes are counted in rounds. Each round counts the votes from a set of EVMs. After each round, a partial tally is announced. Rounds continue until all EVMs are counted. Running totals are tracked throughout.',
  },
  {
    icon: '📊',
    title: 'Tabulation of Results',
    desc: 'After all rounds, the Returning Officer tabulates the total votes for each candidate. These totals are compiled for the constituency and verified.',
  },
  {
    icon: '🏆',
    title: 'Winner Declaration',
    desc: 'The candidate with the most votes wins (First Past The Post system — no need for a majority). The Returning Officer declares the winner and issues Form 20. The official result is published.',
  },
];

const { counting } = electionContent;

export default function CountingPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-semibold mb-4">
            COUNTING & RESULTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            What Happens After Polling?
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Understand how votes are counted, how results are tallied, and how winners are officially declared in Indian elections.
          </p>
        </div>

        {/* Key insight */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/20 mb-10">
          <div className="flex gap-4">
            <div className="text-4xl">🗳️</div>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">The FPTP System</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{counting.detailed}</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {countingSteps.map((step, i) => (
            <div
              key={step.title}
              id={`counting-step-${i + 1}`}
              className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1">STEP {i + 1}</div>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {counting.faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/40">
                <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                  <span className="text-blue-400 font-mono text-sm mt-0.5">Q</span> {faq.q}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EVM info */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-900/20 border border-blue-500/20">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">🔒 EVM Security & Transparency</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{electionContent.evm_vvpat.detailed}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {electionContent.evm_vvpat.faqs.map((faq) => (
              <div key={faq.q} className="p-4 rounded-xl bg-slate-900/50">
                <h4 className="text-blue-300 text-xs font-semibold mb-1">{faq.q}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
