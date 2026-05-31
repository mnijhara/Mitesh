import React from 'react';
import { Volume2, VolumeX, Settings, Radio } from 'lucide-react';

interface VoiceSettingsProps {
  voiceName: string;
  setVoiceName: (name: string) => void;
  autoSpeak: boolean;
  setAutoSpeak: (val: boolean) => void;
  isFallback: boolean;
}

export default function VoiceSettings({
  voiceName,
  setVoiceName,
  autoSpeak,
  setAutoSpeak,
  isFallback
}: VoiceSettingsProps) {
  const voices = [
    { id: 'Fenrir', label: 'Fenrir (Grounded & Deep)', desc: 'Professional, baritone, recommended for executive strategies' },
    { id: 'Puck', label: 'Puck (Direct & Modern)', desc: 'Mid-range, standard, perfect for candidate sourcing details' },
    { id: 'Charon', label: 'Charon (Refined & Warm)', desc: 'Commanding, clear, optimal for change management dialogue' },
    { id: 'Zephyr', label: 'Zephyr (Acoustic Neutral)', desc: 'Balanced, light, suitable for quick casual queries' }
  ];

  return (
    <div id="voice-settings-card" className="bg-white/5 rounded-xl border border-white/10 p-5 shadow-xl text-[#E0E0E0]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <h3 className="font-semibold text-white/90 flex items-center gap-2">
          <Settings className="w-4 h-4 text-white/60" />
          Twin Voice Calibration
        </h3>
        {isFallback ? (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Browser TTS Active
          </span>
        ) : (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
            Gemini TTS Engine
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Toggle speak responses automatically */}
        <div className="flex items-center justify-between bg-white/[0.02] p-3 rounded-lg border border-white/5">
          <div>
            <p className="text-sm font-medium text-white/80">Autoplay Spoken Insights</p>
            <p className="text-xs text-white/40">Speak generated strategic output automatically</p>
          </div>
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              autoSpeak ? 'bg-emerald-500' : 'bg-white/10'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                autoSpeak ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Voice Profile Selector */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Selected Voice Model
          </label>
          <div className="grid grid-cols-1 gap-2">
            {voices.map((v) => (
              <button
                key={v.id}
                onClick={() => setVoiceName(v.id)}
                className={`text-left p-3 rounded-lg border transition ${
                  voiceName === v.id
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/5 hover:border-white/10 hover:bg-white/[0.04] text-white/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{v.label}</span>
                  {voiceName === v.id && (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <p className="text-xs text-white/40 mt-1">{v.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
