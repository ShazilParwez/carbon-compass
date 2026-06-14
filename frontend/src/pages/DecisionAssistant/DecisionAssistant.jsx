import { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight, ThumbsUp, Scale, AlertCircle, Leaf, Mic, Volume2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import TTSButton from '../../components/common/TTSButton';

const suggestions = [
  "Should I travel by car, bus, train, or bicycle?",
  "Should I repair my current phone or buy a new one?",
  "Should I order food delivery or cook at home?"
];

export default function DecisionAssistant() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: isSpeechSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setQuery(transcript);
    }
  }, [transcript]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    resetTranscript();
    setIsAnalyzing(true);
    // Simulate AI API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(mockResults);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(mockResults);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-brand-primary/10 rounded-full mb-4">
          <Scale className="h-8 w-8 text-brand-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Smart Decision Assistant</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Weighing your options? Enter a decision you're trying to make and our AI will break down the environmental impact of each choice.
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Sparkles className="h-6 w-6 text-brand-primary/60 group-focus-within:text-brand-primary transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Should I take a flight or train from NY to DC?"
            className="block w-full pl-12 pr-40 py-5 text-lg border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 shadow-sm focus:ring-4 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-slate-900 dark:text-white placeholder-slate-400"
          />
          <div className="absolute right-2 top-2 bottom-2 flex items-center space-x-2">
            {isSpeechSupported && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  isListening 
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                    : 'text-slate-400 hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
              >
                <Mic size={24} />
              </button>
            )}
            <button 
              type="submit" 
              disabled={!query.trim() || isAnalyzing}
              className="px-6 h-full bg-brand-primary hover:bg-brand-secondary text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              aria-label="Analyze decision"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </form>

        {!results && !isAnalyzing && (
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 py-2 mr-2">Try asking:</span>
            {suggestions.map((suggestion, idx) => (
              <button 
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm bg-slate-100 hover:bg-brand-primary/10 dark:bg-slate-800 dark:hover:bg-brand-primary/20 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full transition-colors border border-slate-200 dark:border-slate-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-16 h-16 border-4 border-brand-light border-t-brand-primary rounded-full animate-spin mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">Consulting environmental data models...</p>
        </div>
      )}

      {/* Results Section */}
      {results && !isAnalyzing && (
        <div className="animate-fade-in space-y-8">
          
          {/* AI Explanation / Recommendation */}
          <div className="glass-card bg-brand-primary/5 dark:bg-brand-primary/10 border-brand-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Leaf className="h-32 w-32 text-brand-primary" />
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-sm mb-3">
                  <ThumbsUp size={18} />
                  AI Recommendation
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{results.recommendation.title}</h2>
              </div>
              <TTSButton 
                text={`${results.recommendation.title}. ${results.recommendation.explanation}`} 
                sectionId="decision-recommendation" 
              />
            </div>
            <div className="relative z-10 mt-2">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {results.recommendation.explanation}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Comparison Cards */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Option Breakdown</h3>
              {results.options.map((option, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${option.isRecommended ? 'border-brand-primary bg-white dark:bg-slate-800 shadow-md' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        {option.title}
                        {option.isRecommended && <span className="ml-3 text-xs bg-brand-primary text-white px-2 py-1 rounded-full font-medium">Recommended</span>}
                      </h4>
                      <p className="text-slate-500 text-sm mt-1">{option.impact}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${option.score >= 80 ? 'text-brand-primary' : option.score >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                        {option.score}<span className="text-sm font-normal text-slate-500">/100</span>
                      </div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Sustainability Score</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                      <span className="block text-slate-500 mb-1">CO₂ Emissions</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{option.co2} kg</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                      <span className="block text-slate-500 mb-1">Key Factor</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{option.factor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Comparison Chart */}
            <div className="glass-card flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Emissions Comparison (kg CO₂)</h3>
              
              {/* Screen reader only narrative */}
              <div className="sr-only">
                <p>Emissions Comparison Chart Summary:</p>
                <ul>
                  {results.options.map((opt, idx) => (
                    <li key={idx}>{opt.title} produces {opt.co2} kilograms of CO2. {opt.isRecommended ? 'This is the recommended option.' : ''}</li>
                  ))}
                </ul>
              </div>

              {/* Reading Mode visible narrative */}
              <div className="reading-mode-only hidden mb-6" aria-hidden="true">
                <div className="p-4 bg-brand-light dark:bg-slate-800 rounded-xl relative">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold">Plain Language Summary:</p>
                    <TTSButton 
                      text={`The recommended option, ${results.options.find(o => o.isRecommended)?.title}, produces ${results.options.find(o => o.isRecommended)?.co2} kilograms of CO2. ${results.options.filter(o => !o.isRecommended).map(o => ` ${o.title} produces ${o.co2} kilograms of CO2.`).join('')}`}
                      sectionId="decision-chart"
                    />
                  </div>
                  <p>
                    The recommended option, {results.options.find(o => o.isRecommended)?.title}, produces {results.options.find(o => o.isRecommended)?.co2} kg CO₂. 
                    {results.options.filter(o => !o.isRecommended).map(o => ` ${o.title} produces ${o.co2} kg CO₂.`).join('')}
                  </p>
                </div>
              </div>

              <div className="flex-1 min-h-[300px]" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.options} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="title" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={80} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="co2" radius={[0, 4, 4, 0]} barSize={30}>
                      {
                        results.options.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isRecommended ? '#059669' : '#94a3b8'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-brand-light dark:bg-slate-800 rounded-xl flex items-start text-sm">
                <AlertCircle className="h-5 w-5 text-brand-secondary mr-2 flex-shrink-0" />
                <p className="text-slate-600 dark:text-slate-300">
                  Choosing the recommended option saves approximately <span className="font-bold text-brand-primary">{results.options[1].co2 - results.options[0].co2} kg of CO₂</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock Data
const mockResults = {
  recommendation: {
    title: "Take the Train (Amtrak)",
    explanation: "Based on the distance from NY to DC, traveling by train is the most environmentally sound decision. Electrified rail networks produce a fraction of the emissions per passenger compared to driving a personal vehicle or flying. Additionally, the train takes you city-center to city-center, eliminating the need for airport transit."
  },
  options: [
    {
      title: "Train",
      impact: "Low Impact",
      score: 92,
      co2: 15.2,
      factor: "Shared Electric",
      isRecommended: true
    },
    {
      title: "Car (Gas)",
      impact: "High Impact",
      score: 35,
      co2: 85.5,
      factor: "Fossil Fuel",
      isRecommended: false
    },
    {
      title: "Flight",
      impact: "Very High Impact",
      score: 12,
      co2: 125.0,
      factor: "Aviation Fuel",
      isRecommended: false
    }
  ]
};