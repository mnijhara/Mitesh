import React from 'react';
import { SearchCode, Cpu, Users, ArrowRight } from 'lucide-react';
import { PersonaPerspective } from '../types';

interface MiteshPerspectivesProps {
  perspectives: PersonaPerspective[];
  onSelectPerspective: (promptText: string) => void;
}

export default function MiteshPerspectives({ perspectives, onSelectPerspective }: MiteshPerspectivesProps) {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'SearchCode':
        return <SearchCode className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-400" />;
      default:
        return <Users className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getTopicPrompt = (title: string) => {
    switch(title) {
      case 'Senior Leadership Acquisition':
        return "How do you align senior leadership acquisition with culture evolution rather than simple cultural fit?";
      case 'Tech & AI Automation':
        return "What is your thesis on balancing AI automation with human intervention in HR execution?";
      case 'Empathy-Driven Change Management':
        return "Can you elaborate on your concept of structural empathy in managing large-scale organizational transition?";
      default:
        return `Let's discuss your strategic view on ${title}.`;
    }
  };

  return (
    <div id="mitesh-perspectives-container" className="space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-white/10 mb-2">
        <h3 className="font-bold font-display text-white/95 tracking-tight text-base uppercase tracking-wider">Professional Philosophy</h3>
        <span className="text-[10px] font-mono text-emerald-400/70">SELECT TO INITIATE DISCUSSION</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {perspectives.map((p, idx) => {
          const prompt = getTopicPrompt(p.title);
          return (
            <button
              key={idx}
              onClick={() => onSelectPerspective(prompt)}
              className="text-left bg-[#111112]/40 border border-white/10 p-5 rounded-xl hover:border-emerald-500/40 hover:bg-[#111112]/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] transition duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition">
                  {getIcon(p.iconName)}
                </div>
                <h4 className="font-bold text-white/90 group-hover:text-emerald-400 transition leading-snug">
                  {p.title}
                </h4>
                <p className="text-xs text-white/50 mt-2 line-clamp-3 leading-relaxed">
                  {p.content}
                </p>
              </div>
              
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mt-4 pt-3 border-t border-white/5 w-full">
                <span>Discuss Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition duration-200" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
