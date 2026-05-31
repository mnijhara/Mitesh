import React, { useState } from 'react';
import { Award, Linkedin, Cpu, Brain, Briefcase, Calendar, HelpCircle } from 'lucide-react';
import { ProfileDetails } from '../types';

interface MiteshProfileCardProps {
  profile: ProfileDetails | null;
  onSelectPrompt: (promptText: string) => void;
}

export default function MiteshProfileCard({ profile, onSelectPrompt }: MiteshProfileCardProps) {
  const [activeTab, setActiveTab] = useState<'bio' | 'experience'>('bio');

  if (!profile) {
    return (
      <div className="bg-white/5 rounded-xl border border-white/10 p-6 animate-pulse space-y-4">
        <div className="h-5 bg-white/10 rounded w-1/3"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
        <div className="h-20 bg-white/10 rounded"></div>
      </div>
    );
  }

  const milestones = [
    {
      role: "Head of Human Resources",
      company: "Spocto (Yubi Group)",
      period: "May 2023 – Present",
      achievements: [
        "Built the entire people function for Yucollect from absolute zero, designing policies and custom HRIS structures.",
        "Launched Spocto's international MENA operations, driving cross-border leadership and organizational design.",
        "Leads the AI transformation charter across all 9 Yubi Group businesses to integrate advanced automated workflows."
      ],
      prompt: "Tell me about your role as Head of HR at Spocto (Yubi Group) and how you lead the AI Charter across the Yubi Group."
    },
    {
      role: "DVP – Human Resources",
      company: "BYJU'S",
      period: "Nov 2019 – May 2023",
      achievements: [
        "Strategically managed people operations for a massive, nationwide sales employee organization.",
        "Scaled recruiting velocity rapidly to support aggressive corporate growth targets.",
        "Successfully designed retention programs that dramatically cut early cohort attrition."
      ],
      prompt: "Can you elaborate on your experience as DVP of HR at BYJU'S and how you managed talent at that massive scale?"
    },
    {
      role: "Senior Manager – HR",
      company: "Cars24",
      period: "Apr 2018 – Oct 2019",
      achievements: [
        "Orchestrated full HR operations including analytics, talent acquisition, and automated payroll systems.",
        "Integrated custom HRIS metrics to track sourcing friction and eliminate administrative delays."
      ],
      prompt: "What were your core focus areas during your tenure as Senior HR Manager at Cars24?"
    },
    {
      role: "Manager – HR",
      company: "HCL Healthcare",
      period: "Oct 2016 – Apr 2018",
      achievements: [
        "Led full HRBP scope, aligning organizational design with structured corporate growth plans."
      ],
      prompt: "What did your core HRBP scope entail at HCL Healthcare?"
    },
    {
      role: "HR Representative",
      company: "FedEx",
      period: "Dec 2013 – Jan 2016",
      achievements: [
        "Delivered large-scale HR operations, workforce planning, and compliance in a high-density logistical environment."
      ],
      prompt: "What strategic HR principles did you learn during your time at FedEx?"
    }
  ];

  return (
    <div id="mitesh-profile-card" className="bg-[#111112]/80 text-[#E0E0E0] rounded-2xl border border-white/10 p-5 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Absolute Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Main Intro */}
      <div className="relative">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Digital Twin Active: MN-01
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider mt-0.5">
              {profile.title}
            </p>
          </div>

          {/* Award Badge */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-center gap-2.5">
            <div className="bg-amber-500/20 p-1.5 rounded-lg text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-amber-300 font-semibold uppercase tracking-wider leading-none mb-0.5">HR LEADERSHIP AWARD</p>
              <p className="text-[11px] font-serif italic text-white/90 leading-tight">Professional Leadership Distinction</p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/5 mt-5">
          <button
            onClick={() => setActiveTab('bio')}
            className={`flex-1 text-center py-1.5 rounded text-xs font-mono uppercase tracking-wider transition ${
              activeTab === 'bio'
                ? 'bg-emerald-600 font-semibold text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Core Profile
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex-1 text-center py-1.5 rounded text-xs font-mono uppercase tracking-wider transition ${
              activeTab === 'experience'
                ? 'bg-emerald-600 font-semibold text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Career History
          </button>
        </div>

        {/* Biography Content Tab */}
        {activeTab === 'bio' && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <p className="text-white/70 text-sm leading-relaxed">
              {profile.biography}
            </p>

            {/* Technical vs. Human Integration Callout */}
            <div className="grid grid-cols-1 gap-3 pt-3 border-t border-white/10">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <h4 className="text-[11px] font-bold uppercase tracking-wider font-mono">Digital Strategy</h4>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Actively automates recruitment analytics pipelines, launches local offline LLM testing, and streamlines HRIS delay friction directly in high-scale ecosystems.
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Brain className="w-3.5 h-3.5" />
                  <h4 className="text-[11px] font-bold uppercase tracking-wider font-mono">Strategic Leadership</h4>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Applies deep-level structural empathy, clear corporate communication matrices, and objective organizational analysis to successfully scale team frameworks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Experience Timeline Tab */}
        {activeTab === 'experience' && (
          <div className="mt-4 py-1.5 space-y-4 max-h-[350px] overflow-y-auto pr-1 animate-fade-in select-none">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative pl-5 border-l border-white/10 pb-1 last:pb-0 group">
                {/* Visual Connector Dot */}
                <span className="absolute left-0 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition duration-200 shadow-sm" />
                
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </p>
                <h4 className="font-bold text-white leading-snug text-sm mt-0.5">
                  {item.role}
                </h4>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  {item.company}
                </p>
                
                <ul className="list-disc pl-4 space-y-1 mt-2 mb-3 text-[11.5px] text-white/60 leading-relaxed">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx}>{ach}</li>
                  ))}
                </ul>

                {/* Question Trigger for this Job */}
                <button
                  type="button"
                  onClick={() => onSelectPrompt(item.prompt)}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80 hover:text-emerald-300 transition duration-150 uppercase tracking-wider bg-white/5 border border-white/5 hover:border-emerald-500/30 rounded px-2 py-1"
                >
                  <HelpCircle className="w-3 h-3" />
                  Ask Twin about this role
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CTA Elements */}
        <div className="flex flex-col gap-2 mt-5 pt-4 border-t border-white/10">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase tracking-wider text-[11px] py-2.5 rounded-xl transition duration-250 border border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
          >
            <Linkedin className="w-3.5 h-3.5" />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
