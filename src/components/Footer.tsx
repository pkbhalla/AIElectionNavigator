'use client';
import Link from 'next/link';
import { Vote, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 border-t border-slate-700/50 mt-20">
      <div className="tricolor-bar" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">AI Election Navigator</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A civic education tool to help Indian citizens understand the election process. Non-partisan. Educational only.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Learn</h3>
            <ul className="space-y-2">
              {[
                ['Election Lifecycle', '/lifecycle'],
                ['Polling Day Simulator', '/simulator'],
                ['EVM & VVPAT', '/simulator#evm'],
                ['Counting & Results', '/counting'],
                ['Myths & Facts', '/myths'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Journey */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Your Journey</h3>
            <ul className="space-y-2">
              {[
                ['First-Time Voter', '/journey?role=first-time'],
                ['Registered Voter', '/journey?role=registered'],
                ['Student / Learner', '/journey?role=student'],
                ['AI Assistant', '/assistant'],
                ['About This App', '/about'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Official Resources</h3>
            <ul className="space-y-2">
              {[
                ['Election Commission of India', 'https://eci.gov.in'],
                ['NVSP Voter Portal', 'https://voters.eci.gov.in'],
                ['Voter Helpline 1950', 'tel:1950'],
                ['Know Your Candidate', 'https://affidavit.eci.gov.in'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1"
                  >
                    {label} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            This app provides general civic education only. For official information, always refer to the{' '}
            <a href="https://eci.gov.in" className="text-blue-400 hover:text-blue-300 underline">Election Commission of India</a>.
          </p>
          <p className="text-slate-600 text-xs">
            Non-partisan · Educational · AI-powered
          </p>
        </div>
      </div>
    </footer>
  );
}
