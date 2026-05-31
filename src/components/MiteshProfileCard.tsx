import React from 'react';
import { Award, Linkedin, Cpu, Brain, Network, Users } from 'lucide-react';
import { ProfileDetails } from '../types';

interface MiteshProfileCardProps {
  profile: ProfileDetails | null;
  onSelectPrompt: (promptText: string) => void;
}

export default function MiteshProfileCard({ profile, onSelectPrompt }: MiteshProfileCardProps) {
  if (!profile) {
    return (
      <div className="bg-white/5 rounded-xl border border-white/10 p-6 animate-pulse space-y-4">
        <div className="h-5 bg-white/10 rounded w-1/3"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
        <div className="h-20 bg-white/10 rounded"></div>
      </div>
    );
  }

  return (
    <div id="mitesh-profile-card" className="bg-[#111112]/80 text-[#E0E0E0] rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Absolute Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Main Intro */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Digital Twin Active: MN-01
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            
            <h1 className="text-3xl font-bold font-display tracking-tight text-white mt-3">
              {profile.name}
            </h1>
            <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider mt-1">
              {profile.title}
            </p>
          </div>

          {/* Award Badge */}
          <div className="self-start sm:self-center bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider leading-none mb-0.5">Distinction</p>
              <p className="text-xs font-serif italic text-white leading-tight">CHRO Choice Award Recipient</p>
            </div>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-white/70 text-sm leading-relaxed mt-5">
          {profile.biography}
        </p>

        {/* Technical vs. Human Integration Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <Cpu className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">Technical Capability</h4>
            </div>
            <p className="text-xs text-white/65 leading-relaxed">
              Actively automates candidate sourcing systems, deploys local offline LLMs, and maps AI interfaces to eliminate administrative constraints.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <Brain className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">HR Strategic Design</h4>
            </div>
            <p className="text-xs text-white/65 leading-relaxed">
              Structures corporate transitions with active structural empathy, proactive transparency, and clear execution data metric frameworks.
            </p>
          </div>
        </div>

        {/* CTA Elements */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase tracking-wider text-xs px-5 py-3 rounded-xl transition duration-200 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
          </a>
          
          <button
            onClick={() => onSelectPrompt("Tell me about your candidate sourcing custom scripts and HR tech stack")}
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 hover:text-white text-white/85 font-mono uppercase tracking-wider text-[11px] px-5 py-3 rounded-xl transition border border-white/10"
          >
            Ask About My Sourcing Automation
          </button>
        </div>
      </div>
    </div>
  );
}
