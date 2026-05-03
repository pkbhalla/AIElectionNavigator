'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Vote } from 'lucide-react';

const navLinks = [
  { href: '/journey', label: 'My Journey' },
  { href: '/lifecycle', label: 'Election Lifecycle' },
  { href: '/simulator', label: 'Polling Simulator' },
  { href: '/counting', label: 'Counting & Results' },
  { href: '/assistant', label: 'AI Assistant' },
  { href: '/myths', label: 'Myths & Facts' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-700/50">
      <div className="tricolor-bar" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-sm sm:text-base leading-tight">
              AI Election<br className="hidden sm:block" /><span className="text-orange-400">Navigator</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/journey"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass border-t border-slate-700/50 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/journey"
            onClick={() => setOpen(false)}
            className="block mt-3 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold text-center transition-all"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
