'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Globe, Sparkles } from 'lucide-react';

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
}

const LANGUAGES = [
  { code: 'en-IN', name: 'English (India)', label: 'English' },
  { code: 'hi-IN', name: 'हिन्दी (Hindi)', label: 'Hindi' },
  { code: 'sat-IN', name: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)', label: 'Santhali' },
  { code: 'gon-IN', name: 'गोंडी (Gondi)', label: 'Gondi' },
  { code: 'or-IN', name: 'ଓଡ଼ିଆ (Odia)', label: 'Odia' },
];

const PRESET_QUERIES = [
  { text: 'Check eligibility for NFST Fellowship', reply: 'NFST requires Master degree with 55% marks and annual income under 6 Lakhs. PVTG candidates receive direct priority.' },
  { text: 'What is the stipend for Overseas Scholarship (NOS)?', reply: 'NOS provides up to 1.5 Lakhs rupees per month for top 500 QS ranked international universities.' },
  { text: 'How do I resolve a document deficiency?', reply: 'Visit your applicant dashboard, check Deficiencies, and upload fresh attested certificate within the 7-day cure period.' },
  { text: 'How to fetch certificates from DigiLocker?', reply: 'In the application wizard, click Fetch from DigiLocker to auto-verify your Caste and Academic records instantly.' }
];

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onCommand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-IN');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSpeechSupported(false);
      }
    }
  }, []);

  const handleStartListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setResponse('Web Speech API not supported in this browser. You can click on the preset questions below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Listening... Speak now in your selected language.');
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(`"${text}"`);
        handleProcessQuery(text);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setTranscript('Could not capture audio. Please try again or tap a preset question.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      setTranscript('Microphone access blocked or unavailable.');
    }
  };

  const handleProcessQuery = (query: string) => {
    const qLower = query.toLowerCase();
    let reply = 'Here is what MoTA Portal provides: ST students can apply for 5 statutory schemes with AI verification and Direct Benefit Transfer.';

    if (qLower.includes('nfst') || qLower.includes('fellowship') || qLower.includes('phd')) {
      reply = PRESET_QUERIES[0].reply;
    } else if (qLower.includes('nos') || qLower.includes('overseas') || qLower.includes('abroad')) {
      reply = PRESET_QUERIES[1].reply;
    } else if (qLower.includes('deficiency') || qLower.includes('reject') || qLower.includes('cure')) {
      reply = PRESET_QUERIES[2].reply;
    } else if (qLower.includes('digilocker') || qLower.includes('apaar') || qLower.includes('document')) {
      reply = PRESET_QUERIES[3].reply;
    }

    setResponse(reply);
    speakText(reply);
    if (onCommand) onCommand(query);
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLang.startsWith('en') ? 'en-IN' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Voice & Tribal Dialect Assistant"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 border-2 border-white/80"
        title="Voice & Tribal Dialect Assistant (Bhashini AI)"
      >
        <Mic className="h-5 w-5 animate-pulse" />
        <span className="text-xs font-bold hidden sm:inline">Voice Assistant / ᱥᱟᱱᱛᱟᱲᱤ</span>
      </button>

      {/* Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-800/80 flex items-center justify-center border border-blue-400/30">
                  <Sparkles className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight flex items-center gap-2">
                    Bhashini Voice & Dialect Assistant
                    <span className="text-[10px] bg-amber-400 text-blue-950 font-extrabold px-1.5 py-0.5 rounded">AI</span>
                  </h3>
                  <p className="text-xs text-blue-200">Multilingual Voice Support for Tribal Scholars</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                  setIsOpen(false);
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Language Selector */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-blue-600" /> Dialect:
              </span>
              <div className="flex gap-1.5 overflow-x-auto">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLang(l.code)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                      selectedLang === l.code
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Area */}
            <div className="p-6 space-y-4 max-h-[350px] overflow-y-auto">
              {transcript && (
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-[10px] font-mono uppercase text-slate-400">You asked</span>
                  <div className="bg-blue-50 text-blue-900 border border-blue-200 p-3 rounded-xl rounded-tr-none text-sm max-w-[85%] font-medium">
                    {transcript}
                  </div>
                </div>
              )}

              {response && (
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-mono uppercase text-green-600 font-bold flex items-center gap-1">
                    <Volume2 className="h-3 w-3" /> Voice Guidance
                  </span>
                  <div className="bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-xl rounded-tl-none text-sm leading-relaxed max-w-[90%]">
                    {response}
                  </div>
                </div>
              )}

              {/* Preset Voice Questions */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Frequently Asked Tribal Voice Queries:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {PRESET_QUERIES.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTranscript(`"${q.text}"`);
                        setResponse(q.reply);
                        speakText(q.reply);
                      }}
                      className="text-left p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs text-slate-700 transition-colors flex items-center justify-between"
                    >
                      <span>💬 {q.text}</span>
                      <Volume2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mic Trigger Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {isListening ? 'Listening to speech...' : 'Tap the microphone to speak'}
              </span>
              <button
                onClick={handleStartListening}
                className={`p-3.5 rounded-full shadow-md text-white transition-all ${
                  isListening
                    ? 'bg-red-600 animate-bounce'
                    : 'bg-blue-700 hover:bg-blue-800 hover:scale-105'
                }`}
                title="Start Voice Recognition"
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
