import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Mic } from 'lucide-react';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import TTSButton from '../../components/common/TTSButton';
import { initialSustainabilityContext } from '../../constants/coachData';
import { generateSustainabilityAdvice } from '../../services/aiCoachService';

export default function AICoach() {
  const [messages, setMessages] = useState(initialSustainabilityContext);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: isSpeechSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    resetTranscript();
    setIsTyping(true);

    // Process offline generative scenario
    const advice = await generateSustainabilityAdvice(input);
    setIsTyping(false);
    setMessages(prev => [...prev, advice]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-brand-primary" /> AI Sustainability Coach
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">Ask me anything about reducing your carbon footprint.</p>
        </div>
      </div>

      <div className="flex-1 glass-card p-0 overflow-hidden flex flex-col border border-slate-200/50 dark:border-slate-700/50">
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700 ml-3' : 'bg-brand-primary/10 mr-3'
                }`}>
                  {msg.role === 'user' ? <User size={20} className="text-slate-600 dark:text-slate-300" /> : <Bot size={20} className="text-brand-primary" />}
                </div>
                <div className={`p-4 rounded-2xl relative group ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-sm shadow-sm'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.role === 'assistant' && (
                    <TTSButton 
                      text={msg.text} 
                      sectionId={`ai-coach-msg-${msg.id}`}
                      className="absolute -right-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100" 
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <span className="sr-only">AI is typing a response...</span>
              <div className="flex flex-row max-w-[80%]" aria-hidden="true">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-primary/10 mr-3 flex items-center justify-center">
                  <Bot size={20} className="text-brand-primary" />
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-sm shadow-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-brand-primary/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-brand-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for advice..."
              className="w-full pl-4 pr-24 py-4 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-slate-900 dark:text-white"
            />
            <div className="absolute right-2 flex space-x-1">
              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                    isListening 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                      : 'text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10'
                  }`}
                  aria-label={isListening ? "Stop voice input" : "Start voice input"}
                >
                  <Mic size={20} />
                </button>
              )}
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="p-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <div className="text-center mt-2 text-xs text-slate-500 dark:text-slate-400">
            Powered by Google Gemini API
          </div>
        </div>

      </div>
    </div>
  );
}