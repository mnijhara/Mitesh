export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  timestamp: number;
  isSpeaking?: boolean;
  isAudioFallback?: boolean;
}

export interface PersonaPerspective {
  title: string;
  category: string;
  content: string;
  iconName: string;
}

export interface ProfileDetails {
  name: string;
  title: string;
  subTitle: string;
  domain: string;
  techCapability: string;
  keyDistinction: string;
  biography: string;
  linkedinUrl: string;
  perspectives: PersonaPerspective[];
}

export interface QuickPrompt {
  id: string;
  label: string;
  prompt: string;
  category: 'Strategy' | 'Tech' | 'Leadership';
}
