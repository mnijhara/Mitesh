import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Linkedin, 
  Cpu, 
  Brain, 
  Radio, 
  Settings, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Clock, 
  MessageSquare, 
  RefreshCw,
  Sparkles,
  Link2
} from 'lucide-react';
import { ProfileDetails, Message } from './types';
import MiteshProfileCard from './components/MiteshProfileCard';
import VoiceSettings from './components/VoiceSettings';
import MiteshPerspectives from './components/MiteshPerspectives';
import AcousticWave from './components/AcousticWave';
import TalkingAvatar from './components/TalkingAvatar';

export default function App() {
  const [profile, setProfile] = useState<ProfileDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  // Custom Voice states
  const [voiceName, setVoiceName] = useState('Fenrir');
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  // Time & telemetry states
  const [syncTime, setSyncTime] = useState('');

  // Audio references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Load profile details and pre-fill warm welcome
  useEffect(() => {
    fetch('/api/mitesh/profile')
      .then(res => res.json())
      .then((data: ProfileDetails) => {
        setProfile(data);
        // Preload warm digital twin greeting
        setMessages([
          {
            id: 'welcome',
            role: 'assistant',
            content: "I am Mitesh Nijhara's digital audio twin. Ask me about senior leadership mapping, dynamic HR technology workflows, or how I orchestrate automated candidates sourcing pipelines. Tap the microphone below or select any topic on the right side to start talking with me directly.",
            timestamp: Date.now(),
            isSpeaking: false
          }
        ]);
      })
      .catch(err => {
        console.error('Failed to load Mitesh profile:', err);
      });

    // Clock sync ticks
    const updateTime = () => {
      const now = new Date();
      const stringified = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      const dateString = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.');
      setSyncTime(`Synchronized: ${dateString} // ${stringified} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        // Pause current twin speaking if user starts talking
        stopCurrentSpeech();
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text) {
          submitChatMessage(text);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('SpeechRecognition API not supported in this browser.');
    }
  }, [voiceName, autoSpeak]);

  // Scroll to bottom of message transcripts
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle manual / base64 audio cleanup
  const stopCurrentSpeech = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Speak response text using Base64 play or local TTS Synthesis fallback
  const speakText = async (text: string, base64Audio?: string) => {
    stopCurrentSpeech();

    if (base64Audio) {
      try {
        setIsSpeaking(true);
        const audioUrl = `data:audio/mp3;base64,${base64Audio}`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
        };
        audio.onerror = () => {
          console.warn('Base64 audio failed. Falling back to local browser TTS.');
          speakWithBrowserFallback(text);
        };
        await audio.play();
        return;
      } catch (err) {
        console.error('Error playing base64 audio stream:', err);
      }
    }

    // Secondary local fallback SpeechSynthesis
    speakWithBrowserFallback(text);
  };

  const speakWithBrowserFallback = (text: string) => {
    if (!window.speechSynthesis) {
      setIsFallback(false);
      return;
    }

    setIsFallback(true);
    setIsSpeaking(true);

    const cleanText = text
      .replace(/https?:\/\/[^\s]+/g, 'the official LinkedIn link')
      .replace(/[*_`#]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 0.95; // Grounded tone parameters

    // Attempt to locate a professional English male voice
    const voices = window.speechSynthesis.getVoices();
    const optimalVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('natural'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (optimalVoice) {
      utterance.voice = optimalVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    submitChatMessage(inputValue.trim());
    setInputValue('');
  };

  // Post context to digital backend
  const submitChatMessage = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;

    // Append User Message Node
    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userPrompt,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    stopCurrentSpeech();

    try {
      // Map existing messages format to basic thread context
      const chatHistory = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          content: m.content
        }))
        .slice(-6); // Limit token depth context

      const response = await fetch('/api/mitesh/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userPrompt,
          history: chatHistory,
          generateVoice: autoSpeak,
          voiceName: voiceName
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }

      const outcome = await response.json();

      const miteshMessage: Message = {
        id: `mit-${Date.now()}`,
        role: 'assistant',
        content: outcome.response,
        timestamp: Date.now(),
        // Keep tag if synthesized audio bytes are returned
        isAudioFallback: !!outcome.fallbackActive
      };

      setMessages(prev => [...prev, miteshMessage]);

      if (autoSpeak) {
        // Automatically play synthesized content
        await speakText(outcome.response, outcome.audioBase64);
      }

    } catch (err: any) {
      console.error('Failed to communicate with Mitesh Twin server:', err);
      
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I am currently optimizing my network routing interfaces. Please feel free to ask again in a moment, or reach out to the real me on LinkedIn at https://www.linkedin.com/in/mitesh-nijhara for direct corporate advisory.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle voice capture API
  const handleMicrophoneClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      } else {
        alert('Voice synthesis recording requires browser permissions or does not support SpeechRecognition in this browser. Please use standard text input.');
      }
    }
  };

  // Replay message speaking
  const handleReplayClick = async (msg: Message) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/mitesh/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg.content, voiceName })
      });
      const data = await response.json();
      setIsLoading(false);
      speakText(msg.content, data.audioBase64);
    } catch {
      setIsLoading(false);
      // Fallback speaker direct activation
      speakWithBrowserFallback(msg.content);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0B] text-[#E0E0E0] flex flex-col overflow-hidden">
      
      {/* Top Navigation / Status Telemetry Bar */}
      <nav className="px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-white/10 bg-[#070708] gap-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
          <span className="text-xs font-mono tracking-widest uppercase text-white/50">Digital Twin Active: MN-01</span>
          <span className="hidden md:inline text-white/20">|</span>
          <div className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
            SYSTEM ONLINE
          </div>
        </div>
        <div className="text-xs font-mono tracking-widest uppercase text-white/40 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-white/30" />
          {syncTime || 'Synchronizing with CHRO cloud...'}
        </div>
      </nav>

      {/* Main Grid Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto lg:overflow-hidden h-full">
        
        {/* Left Sidebar: Identity Dashboard (3 cols) */}
        <aside className="col-span-12 lg:col-span-3 border-r border-white/10 p-6 flex flex-col justify-between bg-[#080809] lg:overflow-y-auto space-y-6">
          <MiteshProfileCard 
            profile={profile} 
            onSelectPrompt={(text) => submitChatMessage(text)} 
          />

          {/* Credentials Badge */}
          <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Strategic HR Focus
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['CHRO Choice Award 🏆', 'Sourcing Automation', 'LLM Local Testnets', 'Empathy Transition', 'Data Auditing', 'Talent Mapping'].map((label, idx) => (
                <span key={idx} className="text-[10px] font-mono bg-white/5 border border-white/5 px-2 py-1 rounded text-white/80">
                  {label}
                </span>
              ))}
            </div>
            
            <p className="text-[11px] text-white/40 leading-relaxed pt-2 border-t border-white/5 italic">
              "We must transition human bandwidth away from operational friction, prioritizing cultural assessment."
            </p>
          </div>
        </aside>

        {/* Center Canvas: Interactive Dialogue Hub & Visualizer (6 cols) */}
        <main className="col-span-12 lg:col-span-6 flex flex-col justify-between bg-[#0A0A0B] lg:overflow-hidden border-b lg:border-b-0 border-white/10">
          
          {/* Wave visualizer banner */}
          <div className="p-6 border-b border-white/10 bg-white/[0.01] flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-radial-at-t from-emerald-500/5 to-transparent pointer-events-none" />
            
            {/* Visualizer Frame */}
            <div className="mb-4 mt-2">
              <TalkingAvatar
                isSpeaking={isSpeaking}
                isRecording={isRecording}
              />
            </div>

            <div className="text-center">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/30">
                Voice Synthesis Processing // Standard Frequency
              </span>
              <p className="text-sm font-serif italic text-white/80 max-w-md mt-1 leading-relaxed">
                {isSpeaking 
                  ? '"Speaking synthesized insights from my professional index..."' 
                  : isRecording 
                    ? '"Listening to voice input signature..."' 
                    : '"Select a philosophy card or ask a custom question."'}
              </p>
            </div>
          </div>

          {/* Dialog Log Timeline */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[380px] min-h-[250px]">
            {messages.map((msg, index) => (
              <div 
                key={msg.id || index} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`relative p-4 rounded-xl max-w-[85%] text-sm leading-relaxed transition-all ${
                    msg.role === 'user' 
                      ? 'bg-emerald-950/40 border border-emerald-500/30 text-white rounded-tr-none' 
                      : 'bg-[#111112] border border-white/10 text-white/90 rounded-tl-none'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="absolute top-2 right-2 flex items-center space-x-1.5 opacity-60 hover:opacity-100 transition">
                      <button 
                        onClick={() => handleReplayClick(msg)}
                        title="Play Speech"
                        className="p-1 rounded bg-white/5 hover:bg-emerald-500/20 text-white/80 hover:text-emerald-300 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  
                  <p className="whitespace-pre-line text-sm pr-6">
                    {msg.content}
                  </p>
                  
                  <span className="block text-[9px] font-mono text-white/30 text-right mt-1.5 uppercase">
                    {msg.role === 'user' ? 'Visitor' : 'Mitesh DT-01'} // {new Date(msg.timestamp).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false})}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center space-x-2 text-white/40 italic text-xs pl-2 font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>twin pipeline compiling strategic parameters...</span>
              </div>
            )}
            
            <div ref={transcriptEndRef} />
          </div>

          {/* Floating Command Interface / Prompt inputs */}
          <div className="p-4 border-t border-white/10 bg-[#070708]">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              
              {/* Mic Speak activator */}
              <button
                type="button"
                onClick={handleMicrophoneClick}
                className={`p-3 rounded-lg border transition duration-200 outline-none flex items-center justify-center shrink-0 ${
                  isRecording 
                    ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' 
                    : 'bg-white/5 border-white/10 hover:border-emerald-500/30 text-white/70 hover:text-emerald-400'
                }`}
                title={isRecording ? "Stop voice capture" : "Speak using Microphone"}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                placeholder={isRecording ? "Listening to signature... Speak clearly" : "Inquire about automation strategy, assessment, local LLMs..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-[#111112] border border-white/10 hover:border-white/20 focus:border-emerald-500/60 transition duration-200 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 outline-none font-sans"
              />

              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`p-3 rounded-lg transition duration-200 flex items-center justify-center shrink-0 ${
                  inputValue.trim() 
                    ? 'bg-emerald-600 border border-emerald-500 text-white hover:bg-emerald-500 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            
            <div className="flex justify-between items-center mt-2.5 px-1">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                Voice Assistive Processing Core v4.1
              </span>
              <button 
                type="button"
                className="text-[9.5px] font-mono text-emerald-400/80 hover:text-emerald-300 transition uppercase tracking-wider"
                onClick={() => setMessages(prev => prev.slice(0, 1))}
              >
                Clear Context Thread
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Settings & Calibration dashboard (3 cols) */}
        <aside className="col-span-12 lg:col-span-3 p-6 space-y-6 flex flex-col justify-between bg-[#080809] lg:overflow-y-auto">
          
          {/* Setup Calibration Card */}
          <VoiceSettings
            voiceName={voiceName}
            setVoiceName={setVoiceName}
            autoSpeak={autoSpeak}
            setAutoSpeak={setAutoSpeak}
            isFallback={isFallback}
          />

          {/* Voice Real-Time Waves widget */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-2">
              <Radio className="w-3.5 h-3.5" />
              Acoustic Telemetry
            </h4>
            <AcousticWave isPlaying={isSpeaking} isRecording={isRecording} />
          </div>

          {/* Bottom Policy Callout */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl text-[11px] text-white/40 leading-relaxed space-y-2">
            <span className="font-semibold text-white/70 block font-mono">MITESH'S INTERVIEW PROTOCOL</span>
            <p>
              Sensitive data or booking live interviews are restricted to my official network dashboard to maintain structured transparency.
            </p>
            <a 
              href="https://www.linkedin.com/in/mitesh-nijhara" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400/90 hover:text-emerald-300 font-semibold font-mono flex items-center gap-1.5 mt-2 transition"
            >
              <span>Verify LinkedIn Identity</span>
              <Link2 className="w-3.5 h-3.5" />
            </a>
          </div>

        </aside>

      </div>

      {/* Philosophy Hub stretching at bottom or collapsible */}
      <footer className="col-span-12 bg-[#070708] border-t border-white/10 p-6">
        {profile && (
          <MiteshPerspectives 
            perspectives={profile.perspectives} 
            onSelectPerspective={(promptText) => submitChatMessage(promptText)} 
          />
        )}
      </footer>

      {/* System Status Footer */}
      <footer className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center bg-[#050506] text-xs font-mono text-white/40 gap-3 z-10">
        <div className="flex space-x-6">
          <div className="flex flex-col">
            <span className="text-[8px] text-white/30 uppercase tracking-tighter">Core LLM Model</span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">gemini-3.5-flash & tts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-white/30 uppercase tracking-tighter">Identity Target</span>
            <span className="text-[10px] text-white/70 uppercase">Mitesh Nijhara</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-white/30 uppercase tracking-tighter">Tone Protocol</span>
            <span className="text-[10px] text-white/70 uppercase font-mono">Grounded // Authentic</span>
          </div>
        </div>
        <div className="text-[10px] italic text-right text-emerald-400/90">
          "Building the future of talent architecture through AI." — MN
        </div>
      </footer>

    </div>
  );
}
