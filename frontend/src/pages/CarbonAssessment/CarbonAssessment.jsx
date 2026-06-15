import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Award, Leaf, TrendingDown, Target } from 'lucide-react';
import TTSButton from '../../components/common/TTSButton';
import { assessmentSteps, emissionReductionActions } from '../../constants/assessmentData';
import { saveAssessmentRecord } from '../../services/trackingService';

export default function CarbonAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const [answers, setAnswers] = useState({
    commuteMode: 'Car (Gasoline)',
    commuteDistance: 50,
    diet: 'Meat in most meals',
    electricity: 'Standard Grid',
    shopping: 'Frequently (Monthly)'
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateAndSaveScore();
      setShowResults(true);
    }
  };

  const calculateAndSaveScore = () => {
    // Deterministic emission factors
    const transportFactors = { 'Car (Gasoline)': 0.4, 'Car (Electric)': 0.15, 'Public Transit': 0.1, 'Bicycle / Walk': 0 };
    const foodFactors = { 'Meat in most meals': 60, 'Meat rarely (Flexitarian)': 40, 'Vegetarian': 25, 'Vegan': 15 };
    const energyFactors = { 'Standard Grid': 50, '100% Renewable Plan': 10, 'Solar Panels': 5, 'Not Sure': 50 };
    const shoppingFactors = { 'Frequently (Monthly)': 40, 'Occasionally': 25, 'Rarely (Only when needed)': 15, 'I prefer second-hand': 5 };

    const transportImpact = (answers.commuteDistance * (transportFactors[answers.commuteMode] || 0.4));
    const foodImpact = foodFactors[answers.diet] || 60;
    const energyImpact = energyFactors[answers.electricity] || 50;
    const shoppingImpact = shoppingFactors[answers.shopping] || 40;

    const carbonScore = Number((transportImpact + foodImpact + energyImpact + shoppingImpact).toFixed(1));
    const sustainabilityScore = Math.max(0, Math.min(100, Math.round(100 - (carbonScore / 3))));

    const record = {
      carbonScore,
      sustainabilityScore,
      categoryBreakdown: [
        { name: 'Transport', value: Number(transportImpact.toFixed(1)), color: '#059669' },
        { name: 'Home Energy', value: Number(energyImpact.toFixed(1)), color: '#0d9488' },
        { name: 'Food', value: Number(foodImpact.toFixed(1)), color: '#3b82f6' },
        { name: 'Shopping', value: Number(shoppingImpact.toFixed(1)), color: '#8b5cf6' }
      ]
    };

    saveAssessmentRecord(record);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Carbon Footprint Assessment</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Let's understand your lifestyle to personalize your recommendations.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-brand-primary -z-10 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / (assessmentSteps.length - 1)) * 100}%` }}
          ></div>
          
          {assessmentSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isActive ? 'bg-brand-primary text-white ring-4 ring-brand-primary/20' : 
                  isCompleted ? 'bg-brand-primary text-white' : 
                  'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700'
                }`}>
                  {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  isActive || isCompleted ? 'text-brand-primary dark:text-brand-accent' : 'text-slate-500'
                }`}>{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Area */}
      {!showResults ? (
        <div className="glass-card min-h-[400px] flex flex-col justify-between">
          <div className="animate-fade-in" key={currentStep}>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              {(() => {
                 const CurrentIcon = assessmentSteps[currentStep].icon;
                 return <CurrentIcon className="text-brand-primary" />;
              })()}
              {assessmentSteps[currentStep].title}
            </h2>
            
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">How do you primarily commute to work/school?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectOption name="commute" value="Car (Gasoline)" current={answers.commuteMode} onChange={(val) => setAnswers({...answers, commuteMode: val})} />
                    <SelectOption name="commute" value="Car (Electric)" current={answers.commuteMode} onChange={(val) => setAnswers({...answers, commuteMode: val})} />
                    <SelectOption name="commute" value="Public Transit" current={answers.commuteMode} onChange={(val) => setAnswers({...answers, commuteMode: val})} />
                    <SelectOption name="commute" value="Bicycle / Walk" current={answers.commuteMode} onChange={(val) => setAnswers({...answers, commuteMode: val})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Average weekly commute distance (miles)</label>
                  <input 
                    type="range" 
                    className="w-full accent-brand-primary" 
                    min="0" max="500" 
                    value={answers.commuteDistance}
                    onChange={(e) => setAnswers({...answers, commuteDistance: Number(e.target.value)})} 
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0</span>
                    <span>250</span>
                    <span>500+</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Which best describes your diet?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectOption name="diet" value="Meat in most meals" current={answers.diet} onChange={(val) => setAnswers({...answers, diet: val})} />
                    <SelectOption name="diet" value="Meat rarely (Flexitarian)" current={answers.diet} onChange={(val) => setAnswers({...answers, diet: val})} />
                    <SelectOption name="diet" value="Vegetarian" current={answers.diet} onChange={(val) => setAnswers({...answers, diet: val})} />
                    <SelectOption name="diet" value="Vegan" current={answers.diet} onChange={(val) => setAnswers({...answers, diet: val})} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">What kind of electricity powers your home?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectOption name="energy" value="Standard Grid" current={answers.electricity} onChange={(val) => setAnswers({...answers, electricity: val})} />
                    <SelectOption name="energy" value="100% Renewable Plan" current={answers.electricity} onChange={(val) => setAnswers({...answers, electricity: val})} />
                    <SelectOption name="energy" value="Solar Panels" current={answers.electricity} onChange={(val) => setAnswers({...answers, electricity: val})} />
                    <SelectOption name="energy" value="Not Sure" current={answers.electricity} onChange={(val) => setAnswers({...answers, electricity: val})} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">How often do you buy new clothes or electronics?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectOption name="shopping" value="Frequently (Monthly)" current={answers.shopping} onChange={(val) => setAnswers({...answers, shopping: val})} />
                    <SelectOption name="shopping" value="Occasionally" current={answers.shopping} onChange={(val) => setAnswers({...answers, shopping: val})} />
                    <SelectOption name="shopping" value="Rarely (Only when needed)" current={answers.shopping} onChange={(val) => setAnswers({...answers, shopping: val})} />
                    <SelectOption name="shopping" value="I prefer second-hand" current={answers.shopping} onChange={(val) => setAnswers({...answers, shopping: val})} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors ${
                currentStep === 0 
                  ? 'text-slate-400 cursor-not-allowed opacity-50' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ArrowLeft size={18} className="mr-2" /> Back
            </button>
            <button 
              onClick={handleNext}
              className="flex items-center px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm"
            >
              {currentStep === assessmentSteps.length - 1 ? 'Analyze Results' : 'Next Step'} 
              {currentStep !== assessmentSteps.length - 1 && <ArrowRight size={18} className="ml-2" />}
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card animate-slide-up">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-brand-primary/10 rounded-full mb-4">
              <Award className="h-10 w-10 text-brand-primary" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Your Top 3 Actions</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Based on your assessment, focusing on these specific actions will yield the highest reduction in your carbon footprint.
            </p>
          </div>
          
          <div className="space-y-6 mb-10">
            {emissionReductionActions.map((action, index) => (
              <div key={action.id} className="p-6 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary"></div>
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{action.title}</h3>
                      <TTSButton 
                        text={`Number ${index + 1}. ${action.title}. Why selected: ${action.reason}`} 
                        sectionId={`top-action-${action.id}`} 
                        className="ml-auto"
                      />
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm leading-relaxed">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Why selected: </span>
                      {action.reason}
                    </p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-4 md:min-w-[140px]">
                    <div className="bg-brand-primary/5 rounded-xl p-3 border border-brand-primary/10">
                      <div className="flex items-center text-brand-primary mb-1 text-xs font-bold uppercase tracking-wider">
                        <TrendingDown size={14} className="mr-1" /> Monthly
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-lg">{action.monthlySavings} <span className="text-sm font-normal text-slate-500">kg CO₂</span></div>
                    </div>
                    <div className="bg-brand-secondary/5 rounded-xl p-3 border border-brand-secondary/10">
                      <div className="flex items-center text-brand-secondary mb-1 text-xs font-bold uppercase tracking-wider">
                        <Target size={14} className="mr-1" /> Annual
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-lg">{action.annualSavings} <span className="text-sm font-normal text-slate-500">kg CO₂</span></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                    action.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    action.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                  }`}>
                    {action.difficulty} Difficulty
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center border-t border-slate-200 dark:border-slate-800 pt-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center px-8 py-3 rounded-xl font-bold bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Go to Dashboard <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SelectOption({ name, value, current, onChange }) {
  return (
    <label className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-colors">
      <input 
        type="radio" 
        name={name}
        value={value}
        checked={current === value}
        onChange={(e) => onChange(e.target.value)}
        className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-slate-300" 
      />
      <span className="ml-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {value}
      </span>
    </label>
  );
}