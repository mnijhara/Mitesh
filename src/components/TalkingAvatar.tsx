import React, { useState, useEffect } from 'react';
// @ts-ignore
import miteshDefaultUrl from '../assets/images/mitesh_portrait_1780235159973.png';

interface TalkingAvatarProps {
  isSpeaking: boolean;
  isRecording: boolean;
}

export default function TalkingAvatar({
  isSpeaking,
  isRecording
}: TalkingAvatarProps) {
  const [talkingAmplitude, setTalkingAmplitude] = useState(0);

  // Sync vocal frequency animation with talking intervals
  useEffect(() => {
    let animId: number;
    if (isSpeaking) {
      const runWave = () => {
        // Generate pseudo-vocals amplitude
        setTalkingAmplitude(0.3 + Math.random() * 0.7);
        animId = requestAnimationFrame(runWave);
      };
      runWave();
    } else {
      setTalkingAmplitude(0);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isSpeaking]);

  return (
    <div className="flex flex-col items-center">
      
      {/* Absolute Glow Ring Container */}
      <div className="relative w-56 h-56 flex items-center justify-center select-none">
        
        {/* Background Rotating Aura */}
        <div 
          className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
            isSpeaking 
              ? 'border-emerald-500/40 animate-spin scale-110' 
              : isRecording 
                ? 'border-red-500/40 animate-spin scale-110' 
                : 'border-white/5 scale-100'
          }`}
          style={{ animationDuration: '40s' }}
        />

        {/* Pulsating Speech Ring */}
        <div 
          className={`absolute inset-2 rounded-full border transition-all duration-300 ${
            isSpeaking 
              ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105' 
              : isRecording 
                ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] scale-105' 
                : 'border-white/10 scale-100'
          }`}
          style={{
            transform: isSpeaking ? `scale(${1 + talkingAmplitude * 0.08})` : 'scale(1)'
          }}
        />

        {/* Portal Window with Mitesh's Authentic Portrait */}
        <div className="w-44 h-44 rounded-full border-2 border-white/20 bg-[#111112] shadow-2xl relative overflow-hidden flex items-center justify-center">
          <div className="w-full h-full relative">
            <img 
              src={miteshDefaultUrl} 
              alt="Mitesh Nijhara Digital Twin" 
              className="w-full h-full object-cover transition-transform duration-300"
              style={{
                transform: isSpeaking 
                  ? `scale(${1.02 + talkingAmplitude * 0.03}) translateY(${talkingAmplitude * 1.5}px)` 
                  : 'scale(1.02)',
                filter: isSpeaking ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)'
              }}
              referrerPolicy="no-referrer"
            />
            
            {/* Dynamic speaking mesh/badge overlay */}
            {isSpeaking && (
              <div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/80 border border-emerald-500/40 px-2 py-0.5 rounded-full animate-bounce shadow-md"
                style={{ animationDuration: '0.8s' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-400 uppercase">Twin Speaking</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cybernetic telemetry caption */}
      <div className="mt-2 text-center pointer-events-none">
        <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20">
          MN-01 Active Identity Verified
        </span>
      </div>

    </div>
  );
}
