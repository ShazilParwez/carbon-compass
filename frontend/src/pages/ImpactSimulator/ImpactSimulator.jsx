import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sliders, TrendingDown, Calendar, ArrowRight } from 'lucide-react';

const habits = [
  { id: 'meat', label: 'Go Meatless 2 Days/Week', savingMonthly: 45, savingAnnual: 540 },
  { id: 'transit', label: 'Take Transit to Work', savingMonthly: 120, savingAnnual: 1440 },
  { id: 'thermostat', label: 'Lower Thermostat by 2°', savingMonthly: 30, savingAnnual: 360 },
  { id: 'compost', label: 'Start Composting', savingMonthly: 15, savingAnnual: 180 },
];

export default function ImpactSimulator() {
  const [selectedHabits, setSelectedHabits] = useState([]);

  const toggleHabit = (id) => {
    setSelectedHabits(prev => 
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    );
  };

  const totalMonthlySavings = selectedHabits.reduce((acc, id) => {
    const habit = habits.find(h => h.id === id);
    return acc + (habit ? habit.savingMonthly : 0);
  }, 0);

  const totalAnnualSavings = totalMonthlySavings * 12;

  // Generate chart data: baseline vs projected over 12 months
  const baselineMonthly = 1200; // arbitrary baseline kg CO2
  const chartData = Array.from({ length: 12 }).map((_, i) => {
    return {
      month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
      Baseline: baselineMonthly,
      Projected: baselineMonthly - totalMonthlySavings
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="text-brand-primary" /> Impact Simulator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">See how small lifestyle tweaks can drastically change your carbon trajectory over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Habit Toggles */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Select Changes to Simulate</h3>
          {habits.map(habit => {
            const isSelected = selectedHabits.includes(habit.id);
            return (
              <div 
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 shadow-sm' 
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-brand-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${isSelected ? 'text-brand-primary dark:text-brand-accent' : 'text-slate-700 dark:text-slate-300'}`}>
                    {habit.label}
                  </span>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    isSelected ? 'bg-brand-primary border-brand-primary' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Saves ~{habit.savingMonthly} kg CO₂ / mo
                </div>
              </div>
            );
          })}
        </div>

        {/* Results and Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card bg-brand-light dark:bg-slate-800 border-none">
              <div className="flex items-center gap-2 text-brand-primary mb-2">
                <TrendingDown size={20} />
                <span className="font-semibold uppercase tracking-wider text-sm">Monthly Savings</span>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {totalMonthlySavings} <span className="text-lg font-normal text-slate-500">kg CO₂</span>
              </h2>
            </div>
            <div className="glass-card bg-brand-light dark:bg-slate-800 border-none">
              <div className="flex items-center gap-2 text-brand-secondary mb-2">
                <Calendar size={20} />
                <span className="font-semibold uppercase tracking-wider text-sm">Annual Projection</span>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {totalAnnualSavings} <span className="text-lg font-normal text-slate-500">kg CO₂</span>
              </h2>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Emissions Trajectory</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="Baseline" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                  <Area type="monotone" dataKey="Projected" stroke="#059669" fillOpacity={1} fill="url(#colorProjected)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}