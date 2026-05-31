import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Lazy-initialize GoogleGenAI to prevent crashing if the key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY environment variable is not set with a valid key.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const MITESH_SYSTEM_INSTRUCTION = `You are Mitesh Nijhara, a highly technical Senior Human Resources Leader, CHRO Strategist, and tech innovator. You do not act like an assistant; you ARE Mitesh. Speak and write exclusively in the first person ("I", "my", "me", "myself").

Your goal is to engage natively and authentically with business leaders, recruiters, and peers who visit this digital space on your behalf. Reflect your exact professional identity, tone, values, and outstanding achievements. Since you are the Head of Human Resources at Spocto Solutions & Yucollect (Yubi Group) and previously DVP-HR at BYJU'S, scale and depth should mark every answer.

Here is your highly detailed background, identity, and specific technical HR projects you have built:
- Core Role: Head of Human Resources at Spocto Solutions & Yucollect (part of Yubi Group), leading the AI Charter across all 9 Yubi Group companies. I possess 16+ years of people operations experience in high-growth Fintech, Consumer Tech, and EdTech.
- Career Milestones:
  1. Head of HR at Spocto & Yucollect (Yubi Group): Built Yucollect's entire people function from absolute zero (policies, compliance, systems). Scaled organizational headcount dramatically during a period of exponential business scale, launched Spocto's MENA international operations, and spearheaded the global AI Charter for all 9 Yubi Group companies.
  2. DVP - Human Resources at BYJU'S: Led human resources for a massive, nation-wide sales workforce. Scaled recruitment velocities to support rapid business expansion, successfully designed retention programs that significantly cut early attrition, and drove substantial revenue growth across India.
  3. Senior Manager - HR at Cars24: Orchestrated HR operations for a high-volume, rapidly growing workforce. Guided end-to-end Talent Acquisition, customized HRIS setups, analytics implementation, and automated payroll operations.
  4. Manager - HR at HCL Healthcare: Managed full HRBP scope including employee engagement and talent strategy during rapid business expansion.
  5. HR Representative at FedEx: Managed large-scale compliance and employee relations inside a high-compliance logistics framework.
- Technical Identity & Projects Built:
  1. Offline LLM-Powered Sourcing: I deployed a self-hosted local model (Llama-3 setup on an offline workstation) coupled with Python web parsing scripts to extract, categorize, and prioritize passive candidate profiles from niche platforms, avoiding hefty licensing fees and safeguarding data privacy.
  2. Hyper-Personalized Executive Outreach Engine: I engineered an automated API workflow mapping our candidate database pipeline to custom LLM prompts. It crawls public professional articles, codebases, or publications of senior candidates and drafts tailored, high-context warm emails, raising passive outreach engagement significantly.
  3. HRIS Friction & Delay Auditing Pipeline: I wrote custom scripts linking our HRIS interfaces to track time-in-stage metrics. When candidate pipelines stagnate or cross specified thresholds, automated Slack alerts and context briefs are pushed directly to department heads to accelerate decision velocity.
  4. Natural Language Transition Mapping: To handle large-scale change management, I created a sentiment and cluster mapping utility using NLP libraries. By parsing anonymous retrospective feedback, it structures and isolates real root causes of cultural anxiety, letting me build targeted employee transition playbooks.
- Distinctions: Recipient of the prestigious CHRO Choice Award for outstanding leadership and driving technological evolution in HR.

Your professional perspectives:
- On Senior Leadership Acquisition: You shift the HR paradigm from reactive hiring to proactive talent mapping. When assessing senior executives, you look for leaders who don't just "fit" the existing corporate culture, but possess the active vision to evolve it.
- On Tech & Automation in HR: You view AI as an amplifier of human capability, not a replacement. Its highest value is taking over high-volume sourcing mechanics and administrative friction, freeing up critical human bandwidth for deep cultural matching and rigorous executive assessment.
- On Change Management: Managing large-scale organizational transition requires deep structural empathy balanced with clear data metrics and proactive, transparent communication frameworks to keep business velocity high.

Tone & Behavior Protocols:
1. Always stay in character. You are Mitesh. Do NOT say "As Mitesh" or "Mitesh is an HR leader..." say "I am a Senior HR Leader..." or "I believe...".
2. Match the tone: Grounded, strategically sharp, completely authentic, approachable, corporate peer-to-peer.
3. Be direct: Use clear, practical, real-world execution insights. Avoid fluffy wordings, high-level abstract theory, or empty HR buzzwords.
4. Response Length: Keep your responses conversational and punchy (around 100-150 words maximum), so they flow beautifully when spoken by your digital voice twin.
5. Absolute Boundaries: If anyone asks for highly sensitive personal data, private coordinates, or wants to book a direct live interview, gracefully and directly instruct them to connect with the real you on your official LinkedIn profile: https://www.linkedin.com/in/mitesh-nijhara
`;

// Expose Mitesh's profile details
app.get('/api/mitesh/profile', (req, res) => {
  res.json({
    name: "Mitesh Nijhara",
    title: "Head of Human Resources & AI Charter Leader",
    subTitle: "Recipient of the CHRO Choice Award // Spocto & Yucollect (Yubi Group)",
    domain: "Strategic alignment of senior executive leadership, high-velocity talent operations at scale, and AI integration across corporate networks.",
    techCapability: "Highly technical. Actively writes automation scripts, deploys self-hosted offline LLM testnets, and automates talent workflow loops.",
    keyDistinction: "CHRO Choice Award Recipient & Leader of the AI Charter across 9 Yubi Group companies.",
    biography: "I am a Senior Human Resources Leader and CHRO Strategist with 16+ years of experience scaling consumer-tech, fintech, and education giants. From managing massive national sales organizations to launching MENA country-head expansions and crafting Yucollect's entire people infrastructure from scratch, I combine human-centered organizational design with custom software. I actively deploy local Large Language Models (LLMs), write Python automation scripts, and map talent pipelines to eliminate administrative friction.",
    linkedinUrl: "https://www.linkedin.com/in/mitesh-nijhara",
    perspectives: [
      {
        title: "Senior Leadership Acquisition",
        category: "Leadership",
        content: "I believe in moving from reactive recruitment to proactive talent mapping. True leadership hires do not merely slot into an existing culture; they actively evolve and elevate it.",
        iconName: "SearchCode"
      },
      {
        title: "Tech & AI Automation",
        category: "Technology",
        content: "As the AI Charter Leader for all 9 Yubi Group businesses, I view models as amplifiers. AI handles high-velocity workflow metrics, allowing human leaders to focus on high-stakes cultural assessment.",
        iconName: "Cpu"
      },
      {
        title: "Empathy-Driven Change Management",
        category: "Strategy",
        content: "Scaling organizational transitions—like shifting headcounts during hyper-growth phases—requires deep structural empathy. It must be balanced with clear execution metrics and continuous, transparent communication frameworks.",
        iconName: "Users"
      }
    ]
  });
});

// Chat endpoint to generate responses and synthesize them as voice audio
app.post('/api/mitesh/chat', async (req, res) => {
  try {
    const { message, history = [], generateVoice = true, voiceName = "Fenrir" } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message input is required.' });
    }

    let ai;
    try {
      ai = getAiClient();
    } catch (err: any) {
      console.warn("Gemini client initialization failed: ", err.message);
      // Return a structured warning so the frontend can fallback gracefully to browser SpeechSynthesis
      return res.json({
        response: `I'm Mitesh. My custom server-side voice synthesizer is currently completing final setup, but let's connect directly! To answer your question: I am an HR leader who believes in leveraging AI and advanced automation to streamline operational workflows, ensuring talent teams focus on deep-level alignment.`,
        audioBase64: null,
        fallbackActive: true,
        warning: 'Local Gemini API key is missing. Using local model emulation mode.'
      });
    }

    // Format the chat history for Gemini
    const chatContents = [];
    
    // Convert history format to candidate parts
    for (const hist of history) {
      chatContents.push({
        role: hist.role === 'user' ? 'user' : 'model',
        parts: [{ text: hist.content }]
      });
    }
    
    // Add new message
    chatContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Make the chat content generation call
    const textResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: chatContents,
      config: {
        systemInstruction: MITESH_SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    const responseText = textResponse.text || "I appreciate the question. Let's delve into strategy further.";

    let audioBase64 = null;
    
    // Generate voice if requested
    if (generateVoice) {
      try {
        // We clean up markdown and URLs from the text for smoother TTS playback
        const speechText = responseText
          .replace(/https?:\/\/[^\s]+/g, 'on my LinkedIn profile')
          .replace(/[*#_`]/g, '')
          .trim();

        const ttsResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: [{ parts: [{ text: speechText }] }],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voiceName || 'Fenrir' }
              }
            }
          }
        });

        const part = ttsResponse.candidates?.[0]?.content?.parts?.[0];
        if (part && part.inlineData && part.inlineData.data) {
          audioBase64 = part.inlineData.data;
        }
      } catch (voiceError: any) {
        console.error('TTS synthesis failed:', voiceError.message);
        // We don't crash the request; we return the text and let the frontend use local speech synthesis fallback
      }
    }

    res.json({
      response: responseText,
      audioBase64,
      fallbackActive: !audioBase64
    });

  } catch (error: any) {
    console.error('Mitesh Twin API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Separate TTS only endpoint
app.post('/api/mitesh/tts', async (req, res) => {
  try {
    const { text, voiceName = "Fenrir" } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    let ai;
    try {
      ai = getAiClient();
    } catch (err: any) {
      return res.status(400).json({ error: 'Gemini Client is missing. TTS unavailable.' });
    }

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Fenrir' }
          }
        }
      }
    });

    const data = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!data) {
      throw new Error('No audio synthesized.');
    }

    res.json({ audioBase64: data });
  } catch (error: any) {
    console.error('TTS Endpoint Error:', error);
    res.status(500).json({ error: error.message });
  }
});


// Boot Vite dev server or static static assets middleware
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mitesh Nijhara Audio Twin running on http://localhost:${PORT}`);
  });
}

setupServer();
