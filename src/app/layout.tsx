import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Election Navigator India – Understand Your Vote',
  description: 'An AI-powered civic education app helping Indian voters understand the election process, timelines, eligibility, and voting steps in an interactive, multilingual way.',
  keywords: 'Indian elections, voter guide, EVM, VVPAT, election commission, first-time voter, Lok Sabha, assembly elections',
  openGraph: {
    title: 'AI Election Navigator India',
    description: 'Your AI-powered guide to Indian elections',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
